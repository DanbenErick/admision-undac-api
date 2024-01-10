import React from 'react';
import AsideDashboardEstudiantes from './components/AsideDashEstudiantes';
import '../../assets/styles/tailwind.css';
import { Outlet } from 'react-router-dom';
import '../../assets/styles/DashboardEstudiantes.css';
const DashboardEstudiantes = () => {
  return (
    <div className="containerGridDashboardEstudiantesPage">
      <div class="asideContainerEstudiantes">
        <AsideDashboardEstudiantes />
      </div>
      <div class="mainContainerEstudiantes">
        {/* <InscripcionDashboardEstudiante /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardEstudiantes;
