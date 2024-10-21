import { IncomingMessage, ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';
import { ResHeaders } from '../constants/headers.constants';

export const getResData = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });
};

export const validateUUID = (id: string): boolean => {
  return uuidValidate(id);
};

export const sendResponse = (
  res: ServerResponse,
  statusCode: number,
  data: object | null,
) => {
  res.writeHead(statusCode, { ...ResHeaders });
  res.end(data ? JSON.stringify(data) : null);
};
