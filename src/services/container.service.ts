import { ContainerStatus } from "@prisma/client";
import { docker } from '../lib/docker';
import { prisma } from '../lib/prisma';
import { CreateContainerDTO, ContainerInfo } from "../types/container.types";
import Stream from 'stream';

export class ContainerService {
  async createContainer(userId: string, data: CreateContainerDTO): Promise<ContainerInfo> {
    try {
      // Create container in database first
      const dbContainer = await prisma.container.create({
        data: {
          name: data.name,
          image: data.image,
          port: data.port,
          environmentVariables: data.env || {},
          userId
        }
      });

      // Pull the image
      // await docker.pull(data.image);

      // Create container in Docker
      const container = await docker.createContainer({
        Image: data.image,
        name: `paas_${dbContainer.id}`,
        Env: Object.entries(data.env || {}).map(([key, value]) => `${key}=${value}`),
        ExposedPorts: data.port ? { [`${data.port}/tcp`]: {} }: undefined,
        HostConfig: {
          PortBindings: data.port ? {
            [`${data.port}/tcp`]: [{ HostPort: data.port.toString() }]
          } : undefined
        }
      });

      // Start the container
      await container.start();

      // Update database with Docker container ID
      const updatedContainer = await prisma.container.update({
        where: { id: dbContainer.id },
        data: {
          dockerId: container.id,
          status: ContainerStatus.RUNNING
        }
      });

      return this.mapContainerToInfo(updatedContainer);
    } catch (error) {
      // If anything failes, ensure we cleanup
      if (error instanceof Error) {
        await this.handleContainerError(userId, data.name, error);
      }
      throw error;
    }
  }

  async stopContainer(userId: string, containerId: string): Promise<ContainerInfo> {
    const dbContainer = await prisma.container.findFirst({
      where: { id: containerId, userId }
    });

    if (!dbContainer || !dbContainer.dockerId) {
      throw new Error('Container not found');
    }

    const container = docker.getContainer(dbContainer.dockerId);
    await container.stop();

    const updatedContainer = await prisma.container.update({
      where: { id: containerId },
      data: { status: ContainerStatus.STOPPED }
    });

    return this.mapContainerToInfo(updatedContainer);
  }

  async startContainer(userId: string, containerId: string): Promise<ContainerInfo> {
    const dbContainer = await prisma.container.findFirst({
      where: { id: containerId, userId }
    });

    if (!dbContainer || !dbContainer.dockerId) {
      throw new Error('Container not found');
    }

    const container = docker.getContainer(dbContainer.dockerId);
    await container.start();

    const updatedContainer = await prisma.container.update({
      where: { id: containerId },
      data: { status: ContainerStatus.RUNNING }
    });

    return this.mapContainerToInfo(updatedContainer);
  }

  async deleteContainer(userId: string, containerId: string): Promise<void> {
    const dbContainer = await prisma.container.findFirst({
      where: { id: containerId, userId }
    });

    if (!dbContainer) {
      throw new Error('Container not found');
    }

    if (dbContainer.dockerId) {
      const container = docker.getContainer(dbContainer.dockerId);
      try {
        await container.stop();
        await container.remove();
      } catch (error) {
        console.error('Error cleaning up Docker container:', error);
      }
    }

    await prisma.container.delete({
      where: { id: containerId }
    });
  }

  async listContainers(userId: string): Promise<ContainerInfo[]> {
    const containers = await prisma.container.findMany({
      where: { userId }
    });

    return containers.map(this.mapContainerToInfo);
  }

  async getContainerLogs(userId: string, containerId: string): Promise<string> {
    const dbContainer = await prisma.container.findFirst({
      where: { id: containerId, userId }
    });

    if (!dbContainer || !dbContainer.dockerId) {
      throw new Error('Container not found');
    }

    const container = docker.getContainer(dbContainer.dockerId);
    const logs = await container.logs({
      stdout: true,
      stderr: true,
      tail: 100
    });

    return logs.toString();
  }

  private mapContainerToInfo(container: any): ContainerInfo {
    return {
      id: container.id,
      name: container.name,
      status: container.status,
      port: container.port,
      image: container.image,
      createdAt: container.createdAt,
      environmentVariables: container.environmentVariables as Record<string, string>
    };
  }

  private async handleContainerError(userId: string, name: string, error: Error): Promise<void> {
    await prisma.container.updateMany({
      where: { userId, name },
      data: {
        status: ContainerStatus.FAILED,
        logs: error.message
      }
    });
  }
}