import { IncomingMessage, ServerResponse } from 'http';
import { getResData, sendResponse } from '../helpres';
import { EndpointsEnum } from '../constants/endpoints.constants';
import { ResStatusEnum } from '../constants/resStatus.constants';
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from '../users.controller';

export const userRoutes = async (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  if (!url) {
    sendResponse(res, ResStatusEnum.BAD_REQUEST, { message: 'Not found' });
    return;
  }

  const pathParts = url.split('/');
  const id = pathParts.length > 3 ? pathParts[3] : null;

  switch (method) {
    case 'GET':
      if (url === EndpointsEnum.GET_ALL) {
        return getAllUsers(req, res);
      } else if (url.includes(EndpointsEnum.GET_BY_ID) && id) {
        return getUserById(req, res, id);
      } else {
        sendResponse(res, ResStatusEnum.BAD_REQUEST, {
          message: 'Method not found',
        });
      }
      break;
    case 'POST':
      if (url === EndpointsEnum.CREATE) {
        try {
          const body = await getResData(req);

          return createUser(req, res, body);
        } catch (error) {
          sendResponse(res, ResStatusEnum.BAD_REQUEST, {
            message: 'Invalid JSON',
          });
        }
      }
      break;
    case 'PUT':
      if (url.includes(EndpointsEnum.UPDATE) && id) {
        try {
          const body = await getResData(req);

          return updateUserById(req, res, id, body);
        } catch (error) {
          sendResponse(res, ResStatusEnum.BAD_REQUEST, {
            message: 'Invalid JSON',
          });
        }
      } else {
        sendResponse(res, ResStatusEnum.BAD_REQUEST, {
          message: 'Method not found',
        });
      }
      break;
    case 'DELETE':
      if (url.includes(EndpointsEnum.DELETE) && id) {
        return deleteUserById(req, res, id);
      } else {
        sendResponse(res, ResStatusEnum.BAD_REQUEST, {
          message: 'Method not found',
        });
      }
      break;
    default:
      sendResponse(res, ResStatusEnum.NOT_FOUND, {
        message: 'Method not found',
      });
      break;
  }
};
