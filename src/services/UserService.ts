import PwdUtil from '@src/util/PwdUtil';
import User from '@src/models/User';
import { IUserData } from '@src/dtos/user.dto';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'Пользователь не найден';
export const USER_ALREADY_EXISTS = 'Пользователь уже существует'


// **** Functions **** //

/**
 * Test user with such unique props
 */
async function userExists(usrData: IUserData, usrID: number) {
  let usr = await User.findOne({
    where: { login: usrData.login }
  });
  if ((usr !== null) && (usr.id != usrID)) return true;

  usr = await User.findOne({
    where: { email: usrData.email }
  })
  if ((usr !== null) && (usr.id != usrID)) return true;

  return false;
}

/**
 * Get all users.
 */
async function getAll(): Promise<User[]> {
  return await User.findAll();
}

/**
 * Register user.
 */
async function register(usrData: IUserData) {
  // test existance
  if (await userExists(usrData, -1)) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      USER_ALREADY_EXISTS
    )
  };

  // create user
  const hashPassword = await PwdUtil.getHash(usrData.password);
  const user = await User.create(
    {
      email: usrData.email,
      pwdHash: hashPassword,
      login: usrData.login,
      fio: usrData.fio
    }
  )

  return user;
}

/**
 * Update user.
 */
async function update(usrId: number, usrData: IUserData) {
  // find user by id
  const usr = await User.findByPk(usrId);
  if (usr === null) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }

  // test existance
  if (await userExists(usrData, usrId)) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      USER_ALREADY_EXISTS
    )
  };

  // update user data
  const hashPassword = await PwdUtil.getHash(usrData.password);
  usr.set({
    email: usrData.email,
    pwdHash: hashPassword,
    login: usrData.login,
    fio: usrData.fio
  });
  await usr.save();
}

/**
 * Delete a user by their id.
 */
async function _delete(usrId: number) {
  // find user by id
  const usr = await User.findByPk(usrId);
  if (usr === null) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }

  await usr.destroy();
}


// **** Export default **** //

export default {
  getAll,
  register,
  update,
  delete: _delete,
} as const;
