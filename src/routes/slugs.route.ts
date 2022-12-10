import { Router } from 'express';
import SlugsController from '@controllers/slugs.controller';
import { Routes } from '@interfaces/routes.interface';
import { authMiddleware } from '@middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { SlugDto, UpdateSlugDto } from '@/dtos/slugs.dto';

class SlugsRoute implements Routes {
  public path = '/lobby/slugs';
  public router = Router();
  public SlugsController = new SlugsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.SlugsController.getSlugs);
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.SlugsController.getSlugById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(SlugDto, 'body'), this.SlugsController.createSlug);
    this.router.put(`${this.path}/:id(\\d+)`, authMiddleware, validationMiddleware(UpdateSlugDto, 'body'), this.SlugsController.updateSlug);
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.SlugsController.deleteSlug);
  }
}

export default SlugsRoute;
