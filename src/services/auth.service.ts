import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User, Org } from '@/interfaces/db.interface';
import { UserAPIResponse, UserAPILogin } from '@/interfaces/api.interface';
import { Users } from '@models/users.model';
import { Orgs } from '@models/orgs.model';
import { isEmpty } from '@utils/util';

class AuthService {
  public async signup(userData: CreateUserDto): Promise<UserAPIResponse> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: Users = await Users.query().select().from('users').where('email', '=', userData.email).first();
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createOrgData: Org = await Orgs.query().insert({ name: userData.name }).into('orgs');

    const userDataInsert = { ...userData, org_id: createOrgData.id, password: hashedPassword };

    const createUserData: User = await Users.query().insert(userDataInsert).into('users');

    return new UserAPIResponse(createUserData, createOrgData);
  }

  public async login(userData: LoginUserDto): Promise<{ cookie: string; findUserResponse: UserAPILogin }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await Users.query().select().from('users').where('email', '=', userData.email).first();
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData: TokenData = this.createToken(findUser);
    const cookie: string = this.createCookie(tokenData);

    const findOrg: Org = await Orgs.query().select().from('orgs').where('id', '=', findUser.org_id).first();

    const findUserResponse = new UserAPILogin(findUser, findOrg, tokenData);

    return { cookie, findUserResponse };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await Users.query()
      .select()
      .from('users')
      .where('email', '=', userData.email)
      .andWhere('password', '=', userData.password)
      .first();

    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
