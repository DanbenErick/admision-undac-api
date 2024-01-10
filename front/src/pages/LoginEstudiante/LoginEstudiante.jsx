import React from 'react';
import useAuthAdmin from '../../hooks/useAuthAdmin';
import { Input, Button, Form } from 'antd';
import { Link } from 'react-router-dom';
import '../../assets/styles/Login.css';
import { loginUsuarioEstudianteService } from '../../api/authService';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const LoginEstudiantePage = () => {
  const [formLogin] = Form.useForm();
  const { login } = useAuthAdmin();
  const navigate = useNavigate()
  const initialValues = {};
  const loginUsuario = async (params) => {
    const resp = await loginUsuarioEstudianteService(params);
    if(resp.data.ok) {
      localStorage.setItem('token', resp.data.token)
      localStorage.setItem('nombre', resp.data.name)
      localStorage.setItem('rol', resp.data.rol)
      message.success(resp.data.message)
      navigate('/dashboard-estudiantes')
      return
    }
    message.error(resp.data.message)

    console.log(resp);
  };
  return (
    <div class="pageLogin">
      <div class="body">
        <div class="background"></div>
        <div class="login">
          <Form
            layout="vertical"
            className="form"
            form={formLogin}
            initialValues={initialValues}
            onFinish={loginUsuario}
          >
            <div className="containerImg">
              <img
                class="img"
                src="https://undac.edu.pe/wp-content/uploads/elementor/thumbs/cropped-undac-otxjxjp3hh6yj3evud6f4g667rmvghjh2tp91gonu8.png"
                alt=""
              />
            </div>
            <h1>Estudiante</h1>
            <Form.Item
              label="Usuario o DNI"
              name="USUARIO"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="Ingresa tu DNI"
                className="control"
                maxLength="20"
              />
            </Form.Item>
            <Form.Item
              label="Contraseña"
              name="PASSWORD"
              rules={[{ required: true }]}
            >
              <Input.Password
                placeholder="Contraseña"
                className="control"
                maxLength="20"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Continuar
              </Button>

              <p>
                ¿No tienes cuenta? <Link to="/register">Registrarse</Link>
              </p>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginEstudiantePage;