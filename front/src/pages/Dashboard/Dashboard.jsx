import React, { useEffect } from 'react';
import AsideComponent from '../../components/Aside/AsideComponent';
import { Outlet, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const rol = localStorage.getItem('rol')
    if(rol !== 'ADMIN_DARAS') navigate('/dashboard-estudiantes/home')
  },[])
  return (
    <div className="containerGridDashboardPage">
      <div className="asideContainer">
        <AsideComponent />
      </div>
      <div className="mainContainer">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
