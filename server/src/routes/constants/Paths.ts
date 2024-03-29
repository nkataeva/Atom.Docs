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

  Docs: {
    Base: '/docs',

    Create: '/create',
    Send: '/send/:id_doc',
    Sign: '/sign/:id_doc',
    Decline: '/decline/:id_doc',
    GetCreated: '/created/:id_user',
    GetForSign: '/forsign/:id_user',
    GetByID: '/get/:id_doc'
  }
};


// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
