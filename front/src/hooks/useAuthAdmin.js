// useAuth.js

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuarioAdminService, crearUsuarioAdminService, cerrarSesionUsuarioAdminService } from '../api/authService';

import { message } from 'antd';
import { AuthContext } from '../providers/AuthProvider';

const useAuthAdmin =() => {
    // const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const context = useContext(AuthContext)
    const login = async (params) => {
        const response = await loginUsuarioAdminService(params);
        console.log(response.data)
        if(!response.data.ok) {
            message.info('No se encontro usuario o contraseña errada')
            return null
        }
        message.success('Autenticado correctamente')
        localStorage.setItem('token', JSON.stringify(response.data));
        context.setUser(response.data)
        // setUser(response.data);
        navigate('/dashboard/procesos');
    };
    
    const register = async (params) => {
        await crearUsuarioAdminService(params);
        navigate('/dashboard/procesos');
    };

    const logout = async(params) => {
        await cerrarSesionUsuarioAdminService(params);
        localStorage.removeItem('token')
        navigate('/login')
    };

    return {
        // user,
        login,
        register,
        logout
    };

}

export default useAuthAdmin