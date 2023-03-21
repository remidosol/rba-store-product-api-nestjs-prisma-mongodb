import {
  PrismaClient,
  Roles,
  Prisma as _Prisma
} from '@prisma/client'
import * as argon from 'argon2'
import { faker } from '@faker-js/faker'
import { User } from '../src/entities'
import { roles as roleSource } from '../src/auth/auth.constants'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url:
        process.env.NODE_ENV === 'development'
          ? process.env.DEV_DATABASE_URL
          : process.env.NODE_ENV === 'test'
          ? process.env.TEST_DATABASE_URL
          : process.env.PROD_DATABASE_URL
    }
  },
  log:
    process.env.DEBUG === 'true'
      ? ['error', 'info', 'query', 'warn']
      : []
})

//! HOOK FOR CREATING USERS
prisma.$use(async ({ action, args, model, ..._rest }, next) => {
  if (
    model === 'User' &&
    (action === 'create' || action === 'update') &&
    args.data.password
  ) {
    args.data.password = await argon.hash(args.data.password, {
      type: 2
    })
  }

  return next({ action, args, model, ..._rest })
})

//! MAIN SEEDER FUNCTION
async function main() {
  //! CREATE 3 DUMMY USERs BINDED WITH ROLE
  await prisma.user.create({
    data: {
      email: 'serverigaram@gmail.com',
      firstName: 'Ibrahim',
      lastName: 'AKSUET',
      password: 'test1234',
      UserRole: {
        create: {
          name: Roles.GLOBAL_ADMIN
        }
      }
    }
  })

  await prisma.user.create({
    data: {
      email: 'ibo862@hotmail.com',
      firstName: 'İbrahim',
      lastName: 'AKSÜT',
      password: 'test1234',
      UserRole: {
        create: {
          name: Roles.STORE_MANAGER
        }
      }
    }
  })

  await prisma.user.create({
    data: {
      email: 'aksut1997@hotmail.com',
      firstName: 'Abraham',
      lastName: 'AKSUET',
      password: 'test1234',
      UserRole: {
        create: {
          name: Roles.USER
        }
      }
    }
  })

  const fakeUsers: User[] = []

  //! CREATE 20 DUMMY USER BINDED WITH PROFILE/PRACTICE GOAL/LANGUAGE/COUNTRY/TOPIC/ROLE
  for (let i = 0; i < 15; i++) {
    //! USER PROFILE
    const gender: 'male' | 'female' =
      faker.name.sex() === 'male' ? 'male' : 'female'

    const firstName: string | undefined = faker.name.firstName(gender)

    const lastName = faker.name.lastName(gender)

    const email = faker.internet.email(firstName, lastName)

    const randomRole = roleSource[
      +(Math.random() * 2).toFixed()
    ] as Roles

    //! CREATE USER
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: 'test1234',
        UserRole: {
          create: {
            name: Roles[randomRole]
          }
        }
      },
      include: { UserRole: true }
    })

    fakeUsers.push(new User(user))
  }

  for (let user of fakeUsers.filter(
    (user) =>
      user.role!.name === Roles.STORE_MANAGER ||
      user.role!.name === Roles.GLOBAL_ADMIN
  )) {
    const store = await prisma.store.create({
      data: {
        name: faker.company.name(),
        userId: user.id
      }
    })

    for (let i = 0; i < Math.random() * 10; i++) {
      await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          price: +faker.commerce.price(),
          imageUrl: faker.image.business(undefined, undefined, true),
          storeId: store.id
        }
      })
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
