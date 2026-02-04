import { AppDataSource } from '../infrastructure/database/data-source';
import { UserSchema } from '../infrastructure/database/schemas/user.schema';
import { UserRole } from '../domain/enums/user-role.enum';

async function run() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(UserSchema);
  const email = 'mcmoriam@gmail.com';
  const user = await repo.findOne({ where: { email } });

  if (!user) {
    console.error(`User with email ${email} not found.`);
    process.exit(1);
  }

  user.role = UserRole.ADMIN;
  await repo.save(user);
  console.log(`User ${email} updated to role ADMIN.`);
  await AppDataSource.destroy();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
