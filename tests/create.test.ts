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

describe('Create user', () => {
  beforeEach(() => {
    mockedUsersService.prototype.create.mockClear();
  });
  afterAll((done) => {
    server.close(done);
  });

  const userData = {
    username: 'Petr Ivanov',
    age: 30,
    hobbies: ['programming', 'programming'],
  };

  const createdUser = {
    ...userData,
    id: '123e4567-e89b-12d3-a456-426614174000',
  };

  it('should create user and return 201 code', async () => {
    mockedUsersService.prototype.create.mockResolvedValue(createdUser);

    const response = await request(server)
      .post(EndpointsEnum.CREATE)
      .send(userData);

    expect(response.status).toBe(ResStatusEnum.CREATE);
    expect(response.body.user).toEqual(createdUser);
  });

  it('should return 400 code error if required fields are missing', async () => {
    const response = await request(server)
      .post(EndpointsEnum.CREATE)
      .send({ username: 'Petr Ivanov' });

    expect(response.status).toBe(ResStatusEnum.BAD_REQUEST);
    expect(response.body.message).toBe(ResMessagesEnum.INVALID_INPUT);
  });

  it('should return 500 code error if internal server error', async () => {
    mockedUsersService.prototype.create.mockRejectedValue(
      new Error(ResMessagesEnum.SERVER_ERROR),
    );

    const response = await request(server)
      .post(EndpointsEnum.CREATE)
      .send(userData);

    expect(response.status).toBe(ResStatusEnum.SERVER_ERROR);
    expect(response.body.message).toBe(ResMessagesEnum.SERVER_ERROR);
  });
});
