import { IncomingMessage, ServerResponse } from 'http';
import { sendResponse } from '../helpres';
import { EndpointsEnum } from '../constants/endpoints.constants';
import { ResStatusEnum } from '../constants/resStatus.constants';

export const userRoutes = async (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  if (!url) {
    sendResponse(res, ResStatusEnum.BAD_REQUEST, { message: 'Not found' });
    return;
  }

  const id = url.split('/')[3];

  switch (method) {
    case 'GET':
      if (url === EndpointsEnum.GET_ALL) {
        // return controller func
      } else if (url.includes(EndpointsEnum.GET_BY_ID) && id) {
        // return controller func
      } else {
        sendResponse(res, ResStatusEnum.BAD_REQUEST, {
          message: 'Method not found',
        });
      }
      break;
    case 'POST':
      if (url === EndpointsEnum.CREATE) {
        try {
          // const body = await getResData(req);
          // return controller func
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
          // const body = await getResData(req);
          // return controller func
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
        // return controller func
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
