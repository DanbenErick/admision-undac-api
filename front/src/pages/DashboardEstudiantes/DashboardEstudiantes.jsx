import React from 'react';
import AsideDashboardEstudiantes from './components/AsideDashEstudiantes';

import { Outlet, useNavigate } from 'react-router-dom';
import '../../assets/styles/DashboardEstudiantes.css';
const DashboardEstudiantes = () => {
  const navigate = useNavigate()
  React.useEffect(() => {
    const rol = localStorage.getItem('rol')
    if(rol !== 'ESTUDIANTE') navigate('/dashboard')
  },[])
  return (
    <div className="containerGridDashboardEstudiantesPage">
      <div className="asideContainerEstudiantes">
        <AsideDashboardEstudiantes />
      </div>
      <div className="mainContainerEstudiantes" style={{background: '#f3f3f3'}}>
        {/* <InscripcionDashboardEstudiante /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardEstudiantes;
