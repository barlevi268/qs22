import { IsUrl, IsString, IsNumber, ValidateIf, NotEquals } from 'class-validator';

export class SlugDto {
  @ValidateIf(o => o.id)
  @IsNumber()
  public id?: number;

  @IsString()
  @NotEquals('lobby')
  public slug: string;

  @IsUrl()
  public url: string;

  @ValidateIf(o => o.org_id)
  @IsNumber()
  public org_id?: number;
}

export class GetSlugDto {
  @ValidateIf(o => o.id)
  @IsNumber()
  public id?: number;

  @ValidateIf(o => o.slug)
  @IsString()
  public slug?: string;

  @IsNumber()
  public org_id: number;
}

export class UpdateSlugDto {
  @ValidateIf(o => o.slug)
  @IsString()
  public slug?: string;

  @ValidateIf(o => o.url)
  @IsUrl()
  public url?: string;
}
