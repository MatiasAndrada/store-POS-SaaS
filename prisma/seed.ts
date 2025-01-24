import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { user, store, products } from './data-seed';

const prisma = new PrismaClient();

async function main() {
  try {
    let userId = "";
    // Check if user already exists, if not create a new user
    const existingUser = await prisma.user.findUnique({ where: { email: user.email } });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const expireEmailVerified = new Date(new Date().setFullYear(new Date().getFullYear() + 10)); // 10 years
      const newUser = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          password: hashedPassword,
          emailVerified: expireEmailVerified,
        }
      });
      userId = newUser.id;
      console.log(`User created with credentials: email: ${user.email}, password: ${user.password}`);
      /*       const token = uuidv4(); */
      /*       const existingToken = await prisma.verificationToken.findFirst({
              where: { email: user.email },
            });
            if (existingToken) {
              await prisma.verificationToken.delete({
                where: {
                  id: existingToken.id,
                },
              });
            }
            await prisma.verificationToken.create({
              data: {
                email: user.email,
                token,
                expires,
              },
            }); */
      console.log(`Verification token created`);
    } else {
      userId = existingUser.id;
      console.log(`User already exists with credentials: email: ${user.email}, password: ${user.password}`);
    }

    const existingStore = await prisma.store.findUnique({ where: { id: store.id } });
    if (!existingStore) {
      await prisma.store.create({
        data: {
          ...store,
          staff: {
            create: {
              userId,
              role: "owner",
            },
          },
          products: {
            create: products
          }
        },
      });
      console.log(`Store created`);
    } else {
      console.log(`The store already exists`);
    }
    console.log("Seed data inserted successfully");
  } catch (e: any) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();