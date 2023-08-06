import PwdUtil from '@src/util/PwdUtil';
import { tick } from '@src/util/misc';

import User from '@src/models/User';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ILoginData } from '@src/dtos/user.dto';
import { RouteError } from '@src/other/classes';


// **** Variables **** //

// Errors
export const Errors = {
    Unauth: 'Unauthorized',
    LoginNotFound(login: string) {
        return `User with login "${login}" not found`;
    },
} as const;


// **** Functions **** //

/**
 * Login a user.
 */
async function login(loginData: ILoginData) {
    // Fetch user
    const usr = await User.findOne({
        where: { login: loginData.login }
    });

    if (usr === null) {
        throw new RouteError(
            HttpStatusCodes.UNAUTHORIZED,
            Errors.LoginNotFound(loginData.login),
        );
    }

    // Check password
    const hash = (usr.pwdHash ?? ''),
        pwdPassed = await PwdUtil.compare(loginData.password, hash);
    if (!pwdPassed) {
        // If password failed, wait 500ms this will increase security
        await tick(500);
        throw new RouteError(
            HttpStatusCodes.UNAUTHORIZED,
            Errors.Unauth,
        );
    }

    // Return
    return usr;
}


// **** Export default **** //

export default {
    login,
} as const;
