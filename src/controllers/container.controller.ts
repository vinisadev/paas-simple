import { Request, Response } from 'express';
import { ContainerService } from '../services/container.service';
import { createContainerSchema } from '../validators/container.validator';

export class ContainerController {
  private containerService: ContainerService;

  constructor() {
    this.containerService = new ContainerService();
  }

  createContainer = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = createContainerSchema.parse(req.body);
      const userId = req.user!.id;

      const container = await this.containerService.createContainer(userId, validatedData);
      
      res.status(201).json({
        message: 'Container created successfully',
        container
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

  listContainers = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user!.id;
      const containers = await this.containerService.listContainers(userId);
      
      res.json({
        containers
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

  getContainer = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user!.id;
      const containerId = req.params.id;
      
      const containers = await this.containerService.listContainers(userId);
      const container = containers.find(c => c.id === containerId);
      
      if (!container) {
        res.status(404).json({ error: 'Container not found' });
        return;
      }
      
      res.json({ container });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

  startContainer = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user!.id;
      const containerId = req.params.id;
      
      const container = await this.containerService.startContainer(userId, containerId);
      
      res.json({
        message: 'Container started successfully',
        container
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

  stopContainer = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user!.id;
      const containerId = req.params.id;
      
      const container = await this.containerService.stopContainer(userId, containerId);
      
      res.json({
        message: 'Container stopped successfully',
        container
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

  deleteContainer = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user!.id;
      const containerId = req.params.id;
      
      await this.containerService.deleteContainer(userId, containerId);
      
      res.json({
        message: 'Container deleted successfully'
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

  getContainerLogs = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user!.id;
      const containerId = req.params.id;
      
      const logs = await this.containerService.getContainerLogs(userId, containerId);
      
      res.json({
        logs
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
}