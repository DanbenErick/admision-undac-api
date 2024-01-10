import React from 'react';
import AsideComponent from '../../components/Aside/AsideComponent';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div className="containerGridDashboardPage">
      <div class="asideContainer">
        <AsideComponent />
      </div>
      <div class="mainContainer">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
