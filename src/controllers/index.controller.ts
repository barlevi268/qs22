import { NextFunction, Request, Response } from 'express';
import { RequestWithUserAndSlugs } from '@interfaces/auth.interface';
import { APP_URL } from '@config';
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

  public handleSlug = async (req: RequestWithUserAndSlugs, res: Response, next: NextFunction): Promise<void> => {
    try {
      const slugValue = req.params.slug;
      const findSlugByValue: Slug[] = req.user.slugs.filter(slug => slug.slug == slugValue);

      const redirectUrl = findSlugByValue.length > 0 ? findSlugByValue[0].url : APP_URL;

      return res.redirect(redirectUrl);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
