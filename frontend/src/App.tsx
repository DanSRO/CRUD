import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { VagasList } from './components/Vagas/VagasList';
import { Register } from './components/Register/Register';
import { CreateVaga } from './components/VagasCreate/CreateVaga';
import { EditVaga } from './components/VagaEdit/EditVagas';
import { ShowVaga } from './components/VagaShow/ShowVaga';

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
