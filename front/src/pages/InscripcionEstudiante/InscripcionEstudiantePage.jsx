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
    title: "Datos Personales",
    content: <DatosPersonalIncripcion />,
  },
  {
    title: "Datos de contacto",
    content: <DatosContactoIns />,
  },
  {
    title: "Resumen",
    content: <ResumenIns />,
  },
  {
    title: "Validacion",
    content: <ValidacionIns />,
  },
  {
    title: "Confirmacion",
    content: <ConfirmacionIns />,
  },
];
const App = () => {
  const { token } = theme.useToken();
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
    // lineHeight: "260px",
    // textAlign: "center",
    // color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    // borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <div className="InscripcionEstudiantePage">
    <div class="background"></div>
    <div className="containerInscripcionEstudiantePageCenter">
      <div className="containerInscripcionEstudiantePage">
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
          }}
        >
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
        </div>
      </div>
    </div>
    </div>
  );
};
export default App;
