import { seedersFiles } from './_all.seeder';
import inquirer from 'inquirer';
import { db } from '../utils/prisma.util';

const options = seedersFiles.map((item, index) => {
  return {
    key: index,
    value: item.fileName
  };
});

inquirer
  .prompt([
    {
      type: 'checkbox',
      name: 'picked',
      message: 'Select seed file to run',
      choices: options
    }
  ])
  .then((result) => {
    result.picked.forEach((element: string) => {
      // eslint-disable-next-line array-callback-return
      seedersFiles.map((i) => {
        if (i.fileName === element) {
          console.log('Seeding file ... ' + i.fileName);
          i.main()
            .catch((e) => {
              console.error(e);
              process.exit(1);
            })
            .finally(async () => db.$disconnect());
        }
      });
    });
  });
