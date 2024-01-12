import React from 'react';
import 'remixicon/fonts/remixicon.css';
import '../../../assets/styles/DashboardEstudiantes.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AsideDashboardEstudiantes = () => {
  const navigate = useNavigate()
  const cerrarSesion = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('rol')
    localStorage.removeItem('nombre')
    navigate('/login-estudiante')
  }
  return (
    <aside className="asideEstudiantesDash">
      <div className="avatarEstudiante" style={{ marginBottom: '40px' }}>
        <div className="containerImgAvatar">
        <img className='imgAvatarEstudiante' src={process.env.PUBLIC_URL + '/logo.jpg'} alt="Logo avatar" />
        </div>
        <b>{localStorage.getItem('nombre')}</b>
        
      </div>
      <ul className="">
        <li>
          <NavLink to="/dashboard-estudiantes/home" activeclassname="active" >
            <i className="icon ri-home-fill"></i>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard-estudiantes/inscripcion"
            activeclassname="active">
            <i className="icon ri-file-paper-fill"></i>
            Inscripcion CEPRE
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard-estudiantes/inscripcion-ordinario"
            activeclassname="active">
            <i className="icon ri-file-paper-fill"></i>
            Inscripcion Ordinario
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard-estudiantes/inscripcion-extraordinario"
            activeclassname="active">
            <i className="icon ri-file-paper-fill"></i>
            Inscripcion Extraordinario
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard-estudiantes/inscripcion-modalidad"
            activeclassname="active">
            <i className="icon ri-file-paper-fill"></i>
            Inscripcion Modalidades
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard-estudiantes/test-psicologico"
            activeclassname="active">
            <i className="icon ri-file-paper-fill"></i>
            Test psicologico
          </NavLink>
          <NavLink
            to="/dashboard-estudiantes/pagos"
            activeclassname="active">
            <i className="icon ri-file-paper-fill"></i>
            Pagos
          </NavLink>
        </li>
        <li>
          <a  onClick={cerrarSesion}>
            <i className="icon ri-logout-box-fill"></i>
            Salir
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default AsideDashboardEstudiantes;
