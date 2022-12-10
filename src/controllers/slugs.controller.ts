import { NextFunction, Request, Response } from 'express';
import { UserRequest } from '@/interfaces/api.interface';
import { SlugDto, GetSlugDto } from '@dtos/slugs.dto';
import { Slug } from '@/interfaces/db.interface';
import slugService from '@services/slugs.service';

class SlugsController {
  public slugService = new slugService();

  public getSlugs = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orgId = req.user.org_id
      const findAllSlugsData: Slug[] = await this.slugService.getSlugsByOrg(orgId);

      res.status(200).json({ data: findAllSlugsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSlugById = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const slugId = Number(req.params.id);
      const slugData: GetSlugDto = { id: slugId, org_id: req.user.org_id }
      const findOneSlugData: Slug = await this.slugService.findSlugById(slugData);

      res.status(200).json({ data: findOneSlugData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createSlug = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const slugData: SlugDto = { ...req.body, org_id: req.user.org_id };
      const createSlugData: Slug = await this.slugService.createSlug(slugData);

      res.status(201).json({ data: createSlugData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSlug = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const slugId = Number(req.params.id);
      const slugData: SlugDto = { ...req.body, id:slugId, org_id: req.user.org_id };
      const updateSlugData: Slug = await this.slugService.updateSlug(slugData);

      res.status(200).json({ data: updateSlugData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSlug = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const slugId = Number(req.params.id);
      const slugData: GetSlugDto = { id: slugId, org_id: req.user.org_id }
      const deleteSlugData: Slug = await this.slugService.deleteSlug(slugData);

      res.status(200).json({ data: deleteSlugData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SlugsController;
