import { Test, TestingModule } from '@nestjs/testing'
import { User } from '../entities'
import { UserController } from '../user.controller'
import { UserService } from '../user.service'
import {
  paginationStub,
  getAllUsersStub,
  createUserStub,
  updateUserDtoStub,
  updatedUserStub,
  deletedUserStub
} from './stubs'

jest.mock('../user.service.ts')

describe('UserController', () => {
  let userController: UserController
  let userService: UserService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).compile()

    userController = moduleRef.get<UserController>(UserController)
    userService = moduleRef.get<UserService>(UserService)
    jest.clearAllMocks()
  })

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: Partial<User>[]

      beforeEach(async () => {
        users = await userController.getUsers(
          paginationStub().page,
          paginationStub().order
        )
      })

      test('then it should call userService', () => {
        expect(userService.getAll).toBeCalledWith(
          paginationStub().page,
          paginationStub().order
        )
      })

      test('then it should return users', () => {
        expect(users).toEqual(getAllUsersStub())
      })
    })
  })

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: Partial<User>

      beforeEach(async () => {
        user = await userController.getUser({
          email: getAllUsersStub()[0].email
        })
      })

      test('then it should call userService', () => {
        expect(userService.getUserByUnique).toBeCalledWith({
          email: getAllUsersStub()[0].email
        })
      })

      test('then it should return user', () => {
        expect(user).toEqual(getAllUsersStub()[0])
      })
    })
  })

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let createdUser: Partial<User>

      beforeEach(async () => {
        createdUser = await userController.createUser(
          createUserStub()
        )
      })

      test('then it should call userService', () => {
        expect(userService.createUser).toBeCalledWith(
          createUserStub()
        )
      })

      test('then it should return created user', () => {
        expect(createdUser).toEqual(createUserStub())
      })
    })
  })

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let updatedUser: Partial<User>

      beforeEach(async () => {
        updatedUser = await userController.updateUser({
          userId: updateUserDtoStub().userId,
          firstName: updateUserDtoStub().firstName,
          lastName: updateUserDtoStub().lastName
        })
      })

      test('then it should call userService', () => {
        expect(userService.updateUser).toBeCalledWith({
          userId: updateUserDtoStub().userId,
          firstName: updateUserDtoStub().firstName,
          lastName: updateUserDtoStub().lastName
        })
      })

      test('then it should return updated user', () => {
        expect(updatedUser).toEqual(updatedUserStub())
      })
    })
  })

  describe('deleteUser', () => {
    describe('when deleteUser is called', () => {
      let deletedUser: Partial<User>

      beforeEach(async () => {
        deletedUser = (
          await userController.deleteUser(deletedUserStub().id!)
        ).deletedUser
      })

      test('then it should call userService', () => {
        expect(userService.deleteUser).toBeCalledWith(
          deletedUserStub().id!
        )
      })

      test('then it should return deleted user', () => {
        expect(deletedUser).toEqual(deletedUserStub())
      })
    })
  })
})
