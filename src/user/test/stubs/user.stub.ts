import { Roles } from '@prisma/client'
import { User } from '../../entities'
import { FindUserDto, CreateUserDto, UpdateUserDto } from '../../dto'

export const getAllUsersStub = (): Partial<User>[] => {
  return [
    {
      id: '64197b42095e5eb087141012',
      email: 'serverigaram@gmail.com',
      firstName: 'Ibrahim',
      lastName: 'AKSUET'
    },
    {
      id: '64197b42095e5eb087141014',
      email: 'Emanuel.Ernser14@gmail.com',
      firstName: 'Emanuel',
      lastName: 'Ernser'
    },
    {
      id: '64197b42095e5eb087141016',
      email: 'Richard14@yahoo.com',
      firstName: 'Richard',
      lastName: 'Hermann'
    },
    {
      id: '64197b42095e5eb087141018',
      email: 'Olivia.Ankunding54@hotmail.com',
      firstName: 'Olivia',
      lastName: 'Ankunding'
    },
    {
      id: '64197b42095e5eb08714101a',
      email: 'Fannie86@hotmail.com',
      firstName: 'Fannie',
      lastName: 'Bergnaum'
    },
    {
      id: '64197b43095e5eb08714101c',
      email: 'Gina_Crist18@yahoo.com',
      firstName: 'Gina',
      lastName: 'Crist'
    },
    {
      id: '64197b43095e5eb08714101e',
      email: 'Pearl_VonRueden@hotmail.com',
      firstName: 'Pearl',
      lastName: 'VonRueden'
    },
    {
      id: '64197b43095e5eb087141020',
      email: 'Roberto_Flatley22@yahoo.com',
      firstName: 'Roberto',
      lastName: 'Flatley'
    },
    {
      id: '64197b43095e5eb087141022',
      email: 'Sean95@hotmail.com',
      firstName: 'Sean',
      lastName: 'Torp'
    },
    {
      id: '64197b43095e5eb087141024',
      email: 'Ed_Goodwin42@yahoo.com',
      firstName: 'Ed',
      lastName: 'Goodwin'
    },
    {
      id: '64197b43095e5eb087141026',
      email: 'Clayton.Gibson@yahoo.com',
      firstName: 'Clayton',
      lastName: 'Gibson'
    },
    {
      id: '64197b43095e5eb087141028',
      email: 'Laverne86@gmail.com',
      firstName: 'Laverne',
      lastName: 'Farrell'
    },
    {
      id: '64197b43095e5eb08714102a',
      email: 'Loretta_Olson@hotmail.com',
      firstName: 'Loretta',
      lastName: 'Olson'
    },
    {
      id: '64197b43095e5eb08714102c',
      email: 'Maryann65@yahoo.com',
      firstName: 'Maryann',
      lastName: 'Mann'
    },
    {
      id: '64197b43095e5eb08714102e',
      email: 'Ramon.Hickle@gmail.com',
      firstName: 'Ramon',
      lastName: 'Hickle'
    },
    {
      id: '64197b43095e5eb087141030',
      email: 'Harold20@yahoo.com',
      firstName: 'Harold',
      lastName: 'Heathcote'
    }
  ]
}

export const createUserStub = (): CreateUserDto => {
  return {
    // id: '6418e41a0c7bb0e54e25efc3',
    email: 'ibo862@hotmail.com',
    password: 'test1234',
    // password:
    //   '$argon2id$v=19$m=65536,t=3,p=4$DzZcKspggmEm+30u2Aan5Q$ucQAbsne/McwMr3qZGpov2fI6ihRrWszmzVG54deUrs',
    firstName: 'Ibrahim',
    lastName: 'AKSUET'
    // UserRole: {
    //   name: Roles.GLOBAL_ADMIN
    // }
    //   token: '',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
  }
}

export const findUserDtoStub = (): FindUserDto => {
  return {
    id: '64197b42095e5eb087141012'
  }
}

export const updateUserDtoStub = (): UpdateUserDto & {
  userId: string
} => {
  return {
    userId: '64197b42095e5eb087141012',
    firstName: 'İbrahim',
    lastName: 'AKSÜT'
  }
}

export const updatedUserStub = (): Partial<User> => {
  return {
    id: '64197b42095e5eb087141012',
    email: 'serverigaram@gmail.com',
    firstName: 'İbrahim',
    lastName: 'AKSÜT'
  }
}

export const deletedUserStub = (): Partial<User> => {
  return {
    id: '64197b42095e5eb087141012',
    email: 'serverigaram@gmail.com',
    firstName: 'İbrahim',
    lastName: 'AKSÜT'
  }
}
