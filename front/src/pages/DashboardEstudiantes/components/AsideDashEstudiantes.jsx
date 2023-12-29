import React from 'react'
import 'remixicon/fonts/remixicon.css'
import "../../../assets/styles/DashboardEstudiantes.css"
import { NavLink } from 'react-router-dom'
const AsideDashboardEstudiantes = () => {
    return (
        <aside className='asideEstudiantesDash'>
            <div className="avatarEstudiante">
                <img src="https://undac.edu.pe/wp-content/uploads/elementor/thumbs/cropped-undac-otxjxjp3hh6yj3evud6f4g667rmvghjh2tp91gonu8.png" alt="" />
                <p className='nombreEstudianteAside'>DANBEN ERICK</p>
            </div>
            <ul>

                <li>
                    <NavLink to="/dashboard-estudiantes/home" activeClassName="active">
                        <i className="icon ri-home-fill"></i>
                        Inicio
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard-estudiantes/inscripcion" activeClassName="active">
                        <i className="icon ri-file-paper-fill"></i>
                        Inscripcion</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard-estudiantes/salir" activeClassName="active">
                        <i className="icon ri-logout-box-fill"></i>
                        Salir</NavLink>
                </li>
            </ul>
        </aside>
    )
}

export default AsideDashboardEstudiantes