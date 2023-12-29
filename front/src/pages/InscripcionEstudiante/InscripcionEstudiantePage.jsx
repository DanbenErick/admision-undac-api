import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import DatosPersonalIncripcion from "./InscripcionEstudiantePages/DatosPersonalesIns";
import DatosContactoIns from "./InscripcionEstudiantePages/DatosContactoIns";
import ResumenIns from "./InscripcionEstudiantePages/ResumenIns";
import ValidacionIns from "./InscripcionEstudiantePages/ValidacionIns";
import ConfirmacionIns from "./InscripcionEstudiantePages/ConfirmacionIns";
import "../../assets/styles/InscripcionEstudiantePage.css"
const steps = [
  {
    title: <b>Datos Personales</b>,
    content: <DatosPersonalIncripcion />,
  },
  {
    title: <b>Datos de contacto</b>,
    content: <DatosContactoIns />,
  },
  {
    title: <b>Resumen</b>,
    content: <ResumenIns />,
  },
  {
    title: <b>Validacion</b>,
    content: <ValidacionIns />,
  },
  {
    title: <b>Confirmacion</b>,
    content: <ConfirmacionIns />,
  },
];
const App = () => {
  
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    marginTop: 10,
    paddingTop: 10,
    
  };
  return (
    <div className="InscripcionEstudiantePage">
      <div class="background"></div>
      <div className="containerInscripcionEstudiantePageCenter">
        <div className="containerInscripcionEstudiantePage">
          <Steps current={current} items={items} progressDot  direction="horizontal" />
          <div style={contentStyle}>{steps[current].content}</div>
          <div
            style={{
              marginTop: 24,
              display: 'flex',
              justifyContent: 'end'
            }}
          >
            
            
            
            {current > 0 && (
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => prev()}
              >
                Regresar
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Siguiente
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Terminar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;