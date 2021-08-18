import { db } from '../utils/prisma.util';
import usersStatus from '../seeds/users-status.seed';

const usersStatusSeeder = {
  async main () {
    for (const element of usersStatus) {
      await db.usersStatus.create(element);
    }
  },
  fileName: 'users-status.seeder.ts'
};

export default usersStatusSeeder;
