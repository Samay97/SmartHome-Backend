process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import DeviceRoute from "@routes/device.route";
import IndexRoute from '@routes/index.route';
import RoomRoute from "@routes/room.route";
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new DeviceRoute(),
  new RoomRoute(),
]);

app.listen();
