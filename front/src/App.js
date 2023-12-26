
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/Login/LoginPage'
import DashboardPage from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound'
import RegisterPage from './pages/Register/RegisterPage';

import ProcesosPage from './pages/Procesos/ProcesosPage';
import VacantesPage from './pages/Vacantes/VacantesPage';
import CarreraPage from './pages/Carreras/CarrerasPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/dashboard/*" Component={DashboardPage}>
            <Route path="procesos" element={<ProcesosPage className="content" />} />  
            <Route path="vacantes" element={<VacantesPage />} />  
            <Route path="carreras" element={<CarreraPage />} />  
          </Route>
          <Route path="*" Component={NotFound} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
