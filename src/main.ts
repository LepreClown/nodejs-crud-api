import dotenv from 'dotenv';
import { IncomingMessage, createServer, ServerResponse } from 'http';
import { userRoutes } from './users/routes/user.routes';
import { ResStatusEnum } from './users/constants/resStatus.constants';
import { sendResponse } from './users/helpres';
import { ResMessagesEnum } from './users/constants/resMessages.constants';

dotenv.config();

const DEFAULT_PORT = 4000;
const PORT = process.env.PORT || DEFAULT_PORT;

const server = createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    try {
      await userRoutes(req, res);
    } catch (error) {
      sendResponse(res, ResStatusEnum.SERVER_ERROR, {
        message: ResMessagesEnum.SERVER_ERROR,
      });
    }
  },
);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
