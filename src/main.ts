import dotenv from 'dotenv';
import { IncomingMessage, createServer, ServerResponse } from 'http';
import { userRoutes } from './users/routes/user.routes';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  userRoutes(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
