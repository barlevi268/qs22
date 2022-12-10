import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import SlugsRoute from './routes/slugs.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new SlugsRoute()]);

app.listen();
