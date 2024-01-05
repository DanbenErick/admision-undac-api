
import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import LoginPage from './pages/Login/LoginPage'
import DashboardPage from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound'
import RegisterPage from './pages/Register/RegisterPage';
import ProcesosPage from './pages/Procesos/ProcesosPage';
import VacantesPage from './pages/Vacantes/VacantesPage';
import CarreraPage from './pages/Carreras/CarrerasPage';
import InscripcionEstudiantePage from './pages/InscripcionEstudiante/InscripcionEstudiantePage';
import DashboardEstudiantes from './pages/DashboardEstudiantes/DashboardEstudiantes';
import HomeDashEstudinte from './pages/DashboardEstudiantes/PagesDashboardEstudiantes/HomeDashEstudiantes';
import InscripcionDashboardEstudiante from './pages/DashboardEstudiantes/PagesDashboardEstudiantes/InscripcionDashEstudiantes';

import esES from 'antd/locale/es_ES'
import { ConfigProvider } from 'antd';
import './App.css';
import { AuthProvider } from './providers/AuthProvider';
import { Navigate } from 'react-router-dom';
import { EstudianteProvider } from './providers/EstudianteProvider';
import VoucherPage from './pages/Voucher/VoucherPage';


const App = () => {
  return (
    <AuthProvider>
      <ConfigProvider locale={esES}>
        <div className="App">
          <Router>
            <Routes>

              <Route path="/login" element={
                <ProtectedLoginRegister>
                  <LoginPage />
                </ProtectedLoginRegister>
              } />
              <Route path="/register" element={
                <ProtectedLoginRegister>
                  <RegisterPage />
                </ProtectedLoginRegister>
              } />
              <Route path="/inscripcion" element={
                <EstudianteProvider>
                  <InscripcionEstudiantePage />
                </EstudianteProvider>
              } />
              <Route path="/dashboard-estudiantes/*" element={<PrivateRoute><DashboardEstudiantes /></PrivateRoute>}>
                <Route path="home" element={<HomeDashEstudinte />} />
                <Route path="inscripcion" element={<InscripcionDashboardEstudiante />} />
              </Route>
              <Route path="/dashboard/*" element={<PrivateRoute><DashboardPage /> </PrivateRoute>}>
                <Route path="procesos" element={<ProcesosPage className="content" />} />
                <Route path="vacantes" element={<VacantesPage />} />
                <Route path="carreras" element={<CarreraPage />} />
                <Route path="vouchers" element={<VoucherPage />} />
              </Route>
              <Route path="*" element={NotFound} />
            </Routes>
          </Router>
        </div>
      </ConfigProvider>
    </AuthProvider>
  );
}
const ProtectedLoginRegister = ({ children }) => {
  const user = localStorage.getItem('token')
  console.log(user)
  return (
    user !== null ? <Navigate to="/dashboard/procesos" /> : children
    // children
  )
}
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('token')

  return (
    user != null ? <>{children}</> : <Navigate to="/login" />
  )
}




export default App;
