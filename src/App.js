import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import { Greeting } from './auth/greeting';
import { Main } from './main';
import { Login } from './auth/login';
import { Registration } from './auth/registration';
import { SignApplication } from './sign';
import { Signing } from './sign/signing';
import { ShowApplication } from './application/show';
import { Creature } from './application/creature';
import { Request } from './request';

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