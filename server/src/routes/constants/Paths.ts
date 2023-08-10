/**
 * Express router paths go here.
 */

import { Immutable } from '@src/other/types';


const Paths = {
  Base: '/api',

  Auth: {
    Base: '/auth',
    Login: '/login',
    Logout: '/logout',
  },

  Users: {
    Base: '/users',
    
    Register: '/register',
    Get: '/all',    
    Update: '/update/:id',
    Delete: '/delete/:id',
    GetLogonUser: '/logon'
  },
};


// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
