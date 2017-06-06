import * as config from 'config';
import * as compose from 'koa-compose'; // Compose the given middleware and return middleware
import * as convert from 'koa-convert'; // convert koa legacy generator middleware to promise middleware ( v2.x )
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as cors from 'koa-cors';
import * as chalk from 'chalk'; // koa-logger rely on it to display colors
import handleErrors from './error';

const logColor: any = config.get('Customer.logColor');
// remove koa-logger's color if config.logColor is false
if (!logColor) {
	chalk.enabled = false;
}

const middleware = () => compose([logger(), handleErrors(), convert(cors()), bodyParser(), json()]);

export default middleware;
