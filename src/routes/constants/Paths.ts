/**
 * Express router paths go here.
 */

import { Immutable } from '@src/other/types';


const Paths = {
  Base: '/api',
  Users: {
    Base: '/users',
    Register: '/register',
    Login: '/login',

    Get: '/all',    
    Update: '/update/:id',
    Delete: '/delete/:id',
  },
};


// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
