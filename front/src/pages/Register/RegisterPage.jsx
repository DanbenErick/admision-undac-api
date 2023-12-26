import React from 'react'
import '../../assets/styles/Login.css'
import { Link } from 'react-router-dom'
const RegisterPage = () => {
    return (
        <div class="pageLogin">
            <div class="body">
                <div class="background"></div>
                <div class="login">
                    <form class="form">
                        <div className="containerImg">
                            <img class="img" src="https://undac.edu.pe/wp-content/uploads/elementor/thumbs/cropped-undac-otxjxjp3hh6yj3evud6f4g667rmvghjh2tp91gonu8.png" alt="" />
                        </div>
                        <h1>Registrarse</h1>
                        <input type="text" placeholder="Usuario" class="control" />
                        <input type="text" placeholder="DNI" class="control" />
                        <input type="password" placeholder="Contraseña" class="control" />
                        <button value="Entrar" class="button">Continuar</button>
                        
                        <p>¿Ya tienes cuenta? <Link to="/login">Ir</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage