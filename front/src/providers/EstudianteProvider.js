import React, { createContext, useState } from 'react';

const EstudianteContext = createContext();

const EstudianteProvider = ({ children }) => {
  const [estudiante, setEstudiante] = useState({});
  console.log('Estudiante', estudiante);
  return (
    <EstudianteContext.Provider value={{ estudiante, setEstudiante }}>
      {children}
    </EstudianteContext.Provider>
  );
};
export { EstudianteProvider, EstudianteContext };
