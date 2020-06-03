import { closeConnection, openConnection } from '../utils/connection';
import User from '../../src/models/User';

describe('it shuld create a use', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should create a user', async () => {
    const user = await User.create({
      email: 'cleitonbaloneker@gmail.com',
      firstName: 'Cleiton',
      lastName: 'Baloneker',
    });

    const users = await User.findOne({ firstName: user.firstName });

    console.log(users);

    expect(users).toEqual(
      expect.objectContaining({
        firstName: 'Cleiton',
      })
    );
  });
});
