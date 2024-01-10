import React from 'react';
import 'remixicon/fonts/remixicon.css';
import '../../../assets/styles/DashboardEstudiantes.css';
import { NavLink } from 'react-router-dom';
import '../../../assets/styles/tailwind.css';
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
      <div className="avatarEstudiante">
        <img
          src="https://undac.edu.pe/wp-content/uploads/elementor/thumbs/cropped-undac-otxjxjp3hh6yj3evud6f4g667rmvghjh2tp91gonu8.png"
          alt=""
        />
        <p className="nombreEstudianteAside">DANBEN ERICK</p>
      </div>
      <ul className="bg-blue-500 text-white p-10">
        <li>
          <NavLink to="/dashboard-estudiantes/home" activeClassName="active">
            <i className="icon ri-home-fill"></i>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard-estudiantes/inscripcion"
            activeClassName="active"
          >
            <i className="icon ri-file-paper-fill"></i>
            Inscripcion
          </NavLink>
        </li>
        <li>
          <a href="#" activeClassName="active" onClick={cerrarSesion}>
            <i className="icon ri-logout-box-fill"></i>
            Salir
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default AsideDashboardEstudiantes;
