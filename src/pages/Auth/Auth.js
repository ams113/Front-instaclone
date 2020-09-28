import React, { useState }  from 'react';
import { Container, Image } from 'semantic-ui-react';
import './Auth.scss';
import instaclone from '../../assets/png/instaclone.png';
import { RegisterForm } from '../../components/Auth/RegisterForm/RegisterForm';
import { LoginForm } from '../../components/Auth/LoginForm/LoginForm';


export const Auth = () => {

    const [showLogin, setShowLogin] = useState( true );
    
    return (
        <Container fluid className="auth">
          <Image src={ instaclone } />

          <div className="container-form">
              { showLogin ? (
              <LoginForm />
               ) : (
               <RegisterForm setShowLogin={ setShowLogin }/> 
               )}
          </div>

          <div className="change-form">
              <p>
                { showLogin ? (
                    <>
                        ¿No tienes cuenta?
                        <span onClick={ () => setShowLogin( !showLogin ) } >
                            Regístrate
                        </span>                    
                    </>
                ): (
                    <>
                        ¿Entra con tú cuenta?
                        <span  onClick={ ()=> { setShowLogin( !showLogin ) } }>
                            Iniciar sesión
                        </span>   
                    </>
                )}
              </p>
          </div>
        </Container>

    )
}

export default Auth;