import React from "react";
import "remixicon/fonts/remixicon.css";
const HomeDashEstudinte = () => {
  return (
    <>
      <h1>Bienvenido { localStorage.getItem('nombre') }</h1>
      <div className="gridHomePageDashboardEstudiante">
        <div className="containerEnlaces">
          <h4>Contenido</h4>
          <ul>
            <li>
              <a href="#" target="_blank">
                Reglamento del proceso de admision
                <i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                Guia de Inscripcion - Pregrado
                <i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                Guia de Inscripcion - Segunda Especilidad
                <i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                Catalogo de Pregrado<i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                Temario<i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                Vacantes Segunda Especialidad
                <i className="ri-arrow-right-line"></i>
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                Temario segunda especialidad
                <i className="ri-arrow-right-line"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="containerMain">
          {/* <div className="containerMainImage"> */}
          <img
            src="https://undac.edu.pe/wp-content/uploads/2023/12/410930831_886290123497590_5080581941822328473_n-2048x759.jpg"
            alt=""
          />
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default HomeDashEstudinte;
