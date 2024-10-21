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

describe('Get user', () => {
  beforeEach(() => {
    mockedUsersService.prototype.getAll.mockClear();
    mockedUsersService.prototype.getById.mockClear();
  });
  afterAll((done) => {
    server.close(done);
  });

  const user = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    username: 'Petr Ivanov',
    age: 30,
    hobbies: ['programming', 'programming'],
  };

  it('should return all users and status 200 code', async () => {
    mockedUsersService.prototype.getAll.mockResolvedValue([user]);

    const response = await request(server).get(EndpointsEnum.GET_ALL);

    expect(response.status).toBe(ResStatusEnum.SUCCESS);
    expect(response.body).toEqual([user]);
  });

  it('should return user by ID and status 200 code', async () => {
    mockedUsersService.prototype.getById.mockResolvedValue(user);

    const response = await request(server).get(
      `${EndpointsEnum.GET_BY_ID}${user.id}`,
    );

    expect(response.status).toBe(ResStatusEnum.SUCCESS);
    expect(response.body).toEqual(user);
  });

  it('should return 404 code error if user not found', async () => {
    mockedUsersService.prototype.getById.mockResolvedValue(undefined);

    const response = await request(server).get('/api/users/randomUserid');

    expect(response.status).toBe(ResStatusEnum.BAD_REQUEST);
    expect(response.body.message).toBe(ResMessagesEnum.INVALID_ID);
  });
});
