import './App.css';
import {Routes,Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import NewRequest from './components/NewRequest'
import EditRequest from './components/EditRequest'
import ViewRequest from './components/ViewRequest'
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/createRequest" element={<NewRequest/>} />
        <Route path="/editRequest/:id" element={<EditRequest/>} />
        <Route path="/viewRequest/:id" element={<ViewRequest/>} />
      </Routes>
    </div>
  );
}

export default App;
