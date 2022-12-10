import { SlugDto, GetSlugDto } from '@dtos/slugs.dto';
import { HttpException } from '@exceptions/HttpException';
import { Slug } from '@/interfaces/db.interface';
import { Slugs } from '@models/slugs.model';
import { isEmpty } from '@utils/util';

async function getSlugById(slugData: GetSlugDto): Promise<Slug> {
  const findSlug: Slug = await Slugs.query().select().from('slugs').where('id', '=', slugData.id).andWhere('org_id', '=', slugData.org_id).first();

  if (!findSlug) throw new HttpException(409, "Slug doesn't exist");

  return findSlug;
}

async function getSlugByValue(slugData: SlugDto, retun = false): Promise<Slug> {
  const findSlug: Slug = await Slugs.query()
    .select()
    .from('slugs')
    .where('slug', '=', slugData.slug)
    .andWhere('org_id', '=', slugData.org_id)
    .first();

  if (findSlug && !retun) throw new HttpException(409, `This slug ${slugData.slug} already exists`);

  return findSlug;
}

class SlugService {
  public async getSlugsByOrg(orgId: number): Promise<Slug[]> {
    const slugs: Slug[] = await Slugs.query().select().from('slugs').where('org_id', '=', orgId);
    return slugs;
  }

  public async findSlugById(slugData: GetSlugDto): Promise<Slug> {
    return await getSlugById(slugData);
  }

  public async findSlugByValue(slugData: GetSlugDto): Promise<Slug> {
    return await getSlugByValue(slugData as SlugDto, true);
  }

  public async createSlug(slugData: SlugDto): Promise<Slug> {
    if (isEmpty(slugData)) throw new HttpException(400, 'slugData is empty');

    await getSlugByValue(slugData);

    const createSlugData: Slug = await Slugs.query().insert(slugData).into('slugs');

    return createSlugData;
  }

  public async updateSlug(slugData: SlugDto): Promise<Slug> {
    if (isEmpty(slugData)) throw new HttpException(400, 'slugData is empty');

    await getSlugById(slugData as GetSlugDto);

    slugData.slug && (await getSlugByValue(slugData));

    await Slugs.query().update(slugData).where('id', '=', slugData.id).into('slugs');

    const updateSlugData: Slug = await getSlugById(slugData as GetSlugDto);

    return updateSlugData;
  }

  public async deleteSlug(slugData: GetSlugDto): Promise<Slug> {
    const findSlug: Slug = await getSlugById(slugData);

    await Slugs.query().delete().where('id', '=', slugData.id).into('slugs');
    return findSlug;
  }
}

export default SlugService;
