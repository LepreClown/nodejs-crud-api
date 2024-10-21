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

describe('Update user', () => {
  beforeEach(() => {
    mockedUsersService.prototype.update.mockClear();
  });
  afterAll((done) => {
    server.close(done);
  });

  const id = '123e4567-e89b-12d3-a456-426614174000';

  const updatedUser = {
    id: id,
    username: 'Petr Ivanov2',
    age: 35,
    hobbies: ['programming', 'programming'],
  };

  it('should update user by id and return 200 code', async () => {
    mockedUsersService.prototype.update.mockResolvedValue(updatedUser);

    const response = await request(server)
      .put(`${EndpointsEnum.UPDATE}${id}`)
      .send(updatedUser);

    expect(response.status).toBe(ResStatusEnum.SUCCESS);
    expect(response.body).toEqual(updatedUser);
  });

  it('should return 404 code error if the user is not found', async () => {
    mockedUsersService.prototype.update.mockResolvedValue(undefined);

    const response = await request(server)
      .put(`${EndpointsEnum.UPDATE}${id}`)
      .send(updatedUser);

    expect(response.status).toBe(ResStatusEnum.NOT_FOUND);
    expect(response.body.message).toBe(ResMessagesEnum.USER_NOT_FOUND);
  });

  it('should return 500 code error if internal server error', async () => {
    mockedUsersService.prototype.update.mockRejectedValue(
      new Error(ResMessagesEnum.SERVER_ERROR),
    );

    const response = await request(server)
      .put(`${EndpointsEnum.UPDATE}${id}`)
      .send(updatedUser);

    expect(response.status).toBe(ResStatusEnum.SERVER_ERROR);
    expect(response.body.message).toBe(ResMessagesEnum.SERVER_ERROR);
  });
});
