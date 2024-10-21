import request from 'supertest';
import { server } from '../src/main';
import { UsersService } from '../src/users/users.service';
import { ResStatusEnum } from '../src/users/constants/resStatus.constants';
import { EndpointsEnum } from '../src/users/constants/endpoints.constants';
import { ResMessagesEnum } from '../src/users/constants/resMessages.constants';

jest.mock('../src/users/users.service');
const mockedUsersService = UsersService as jest.MockedClass<
  typeof UsersService
>;

describe('Delete user', () => {
  beforeEach(() => {
    mockedUsersService.prototype.delete.mockClear();
  });
  afterAll((done) => {
    server.close(done);
  });

  const id = '123e4567-e89b-12d3-a456-426614174000';

  it('should delete user by id and return 204 code', async () => {
    mockedUsersService.prototype.delete.mockResolvedValue(true);

    const response = await request(server).delete(
      `${EndpointsEnum.DELETE}${id}`,
    );

    expect(response.status).toBe(ResStatusEnum.DELETE);
  });

  it('should return 400 code error if the user not found', async () => {
    mockedUsersService.prototype.delete.mockResolvedValue(false);

    const response = await request(server).delete(
      `${EndpointsEnum.DELETE}${id}`,
    );

    expect(response.status).toBe(ResStatusEnum.NOT_FOUND);
    expect(response.body.message).toBe(ResMessagesEnum.USER_NOT_FOUND);
  });

  it('should return 500 code error if internal server error', async () => {
    mockedUsersService.prototype.delete.mockRejectedValue(
      new Error(ResMessagesEnum.SERVER_ERROR),
    );

    const response = await request(server).delete(
      `${EndpointsEnum.DELETE}${id}`,
    );

    expect(response.status).toBe(ResStatusEnum.SERVER_ERROR);
    expect(response.body.message).toBe(ResMessagesEnum.SERVER_ERROR);
  });
});
