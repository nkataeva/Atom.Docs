import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

import { Request } from './request';

import { Greeting } from './components/auth/greeting';
import { Main } from './components/main';
import { Login } from './components/auth/login';
import { Registration } from './components/auth/registration';
import { SignApplication } from './components/sign';
import { Signing } from './components/sign/signing';
import { ShowApplication } from './components/application/show';
import { Creature } from './components/application/creature';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Greeting />} />
        <Route path='/main' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registation' element={<Registration />} />
        <Route path='/sign' element={<SignApplication />} />
        <Route path='/signing' element={<Signing />} />
        <Route path='/show' element={<ShowApplication />} />
        <Route path='/creature' element={<Creature />} />
        <Route path='/request' element={<Request />} />
      </Routes>
    </Router>
  );
}

export default App;