import { UsersService } from './users.service';
import { IncomingMessage, ServerResponse } from 'http';
import { sendResponse, validateUUID } from './helpres';
import { ResStatusEnum } from './constants/resStatus.constants';
import { ResMessagesEnum } from './constants/resMessages.constants';
import { User } from './types/user.types';

const usersService = new UsersService();

export const createUser = async (
  _req: IncomingMessage,
  res: ServerResponse,
  body: User,
) => {
  const { username, age, hobbies } = body;

  if (!username || !age || !Array.isArray(hobbies)) {
    return sendResponse(res, ResStatusEnum.BAD_REQUEST, {
      message: ResMessagesEnum.INVALID_INPUT,
    });
  }

  const newUser = await usersService.create(username, age, hobbies);

  sendResponse(res, ResStatusEnum.CREATE, {
    message: ResMessagesEnum.CREATE_USER,
    user: newUser,
  });
};

export const getAllUsers = async (
  _req: IncomingMessage,
  res: ServerResponse,
) => {
  const users = await usersService.getAll();

  sendResponse(res, ResStatusEnum.SUCCESS, users);
};

export const getUserById = async (
  _req: IncomingMessage,
  res: ServerResponse,
  userId: string,
) => {
  if (!validateUUID(userId)) {
    return sendResponse(res, ResStatusEnum.BAD_REQUEST, {
      message: ResMessagesEnum.INVALID_ID,
    });
  }

  const user = await usersService.getById(userId);

  if (user) {
    sendResponse(res, ResStatusEnum.SUCCESS, user);
  } else {
    sendResponse(res, ResStatusEnum.NOT_FOUND, {
      message: ResMessagesEnum.USER_NOT_FOUND,
    });
  }
};

export const updateUserById = async (
  _req: IncomingMessage,
  res: ServerResponse,
  userId: string,
  body: any,
) => {
  if (!validateUUID(userId)) {
    return sendResponse(res, ResStatusEnum.BAD_REQUEST, {
      message: ResMessagesEnum.INVALID_ID,
    });
  }

  const { username, age, hobbies } = body;

  const updatedUser = await usersService.update(userId, username, age, hobbies);
  if (updatedUser) {
    sendResponse(res, ResStatusEnum.SUCCESS, updatedUser);
  } else {
    sendResponse(res, ResStatusEnum.NOT_FOUND, {
      message: ResMessagesEnum.USER_NOT_FOUND,
    });
  }
};

export const deleteUserById = async (
  _req: IncomingMessage,
  res: ServerResponse,
  userId: string,
) => {
  if (!validateUUID(userId)) {
    return sendResponse(res, ResStatusEnum.BAD_REQUEST, {
      message: ResMessagesEnum.INVALID_ID,
    });
  }

  const deleted = await usersService.delete(userId);
  if (deleted) {
    sendResponse(res, ResStatusEnum.DELETE, {
      message: ResMessagesEnum.DELETE_USER,
    });
  } else {
    sendResponse(res, ResStatusEnum.NOT_FOUND, {
      message: ResMessagesEnum.USER_NOT_FOUND,
    });
  }
};
