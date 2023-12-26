import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/styles/Login.css'
const LoginPage = () => {
    return (
        <div class="pageLogin">
            <div class="body">
                <div class="background"></div>
                <div class="login">
                    <form class="form">
                        <div className="containerImg">
                            <img class="img" src="https://undac.edu.pe/wp-content/uploads/elementor/thumbs/cropped-undac-otxjxjp3hh6yj3evud6f4g667rmvghjh2tp91gonu8.png" alt="" />
                        </div>
                        <h1>Ingresar</h1>
                        <input type="text" placeholder="Usuario" class="control" />
                        <input type="password" placeholder="Contraseña" class="control" />
                        <button value="Entrar" class="button">Continuar</button>
                        <p>¿No tienes cuenta? <Link to="/register">Registrarse</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage