import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { VagasList } from './components/VagasList';
import { Register } from './components/Register';
import { CreateVaga } from './components/CreateVaga';
import { EditVaga } from './components/EditVagas';
import { ShowVaga } from './components/ShowVaga';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<VagasList/>}/>        
        <Route path='/register' element={<Register/>}/>        
        <Route path='/create' element={<CreateVaga/>}/>        
        <Route path='/edit/:id' element={<EditVaga/>}/>        
        <Route path='/show/:id' element={<ShowVaga/>}/>        
      </Routes>      
    </Router>
  );
}

export default App;
