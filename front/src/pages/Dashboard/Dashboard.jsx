import React from 'react';
import AsideComponent from '../../components/Aside/AsideComponent';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
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
