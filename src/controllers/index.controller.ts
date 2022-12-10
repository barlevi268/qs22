import { NextFunction, Request, Response } from 'express';
import { UserRequest } from '@/interfaces/api.interface';
import { APP_URL } from '@config';
import { GetSlugDto } from '@dtos/slugs.dto';
import { Slug } from '@/interfaces/db.interface';
import slugService from '@services/slugs.service';

class IndexController {
  slugService = new slugService();

  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      return res.redirect(APP_URL);
    } catch (error) {
      next(error);
    }
  };

  public handleSlug = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const slugValue = req.params.slug;
      const slugData: GetSlugDto = { slug: slugValue, org_id: req.user.org_id };

      const findSlugByValue: Slug = await this.slugService.findSlugByValue(slugData);

      const redirectUrl = findSlugByValue ? findSlugByValue.url : APP_URL;

      return res.redirect(redirectUrl);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
