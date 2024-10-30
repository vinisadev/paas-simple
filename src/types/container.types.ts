import { ContainerStatus } from "@prisma/client";

export interface CreateContainerDTO {
  name: string;
  image: string;
  port?: number;
  env?: Record<string, string>;
}

export interface ContainerInfo {
  id: string;
  name: string;
  status: ContainerStatus;
  port?: number;
  image: string;
  createdAt: Date;
  environmentVariables?: Record<string, string>;
}