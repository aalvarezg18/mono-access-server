import { config } from 'dotenv';
import Server from './models/server.model';

config();
const server = new Server();
server.listen();
