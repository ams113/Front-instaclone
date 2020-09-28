import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../../gql/user';
import './RegisterForm.scss';


export const RegisterForm = ( props ) => {

    const { setShowLogin } = props;

    const [register] = useMutation( REGISTER );

    const formik = useFormik({
        initialValues: initFormValues(),
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            userName: Yup.string()
                .matches(
                    /^[a-zA-Z0-9-]*$/, 
                    'El nombre del usuario no puede tener espacios'
                )
                .required('El nombre de usuario es obligatorio'),
            email: Yup.string()
                .email('Email no es valido')
                .required('El email es obligatorio'),
            password: Yup.string().required("La contraseña es obligatoria")
                .oneOf( [Yup.ref( 'repeatPassword' )], 'Las contraseñas no son iguales' ),
            repeatPassword: Yup.string().required("La contraseña es obligatoria")
                .oneOf( [Yup.ref( 'password' )], 'Las contraseñas no son iguales' ),
        }),
        onSubmit: async ( formData ) => {
          
            try {
                const newUser = formData;
                delete newUser.repeatPassword;

                await register({
                    variables: {
                        input: newUser
                    }
                });

                toast.success('Usuario registrado correctamente');
                setShowLogin( true );
                
            } catch ( error ) {
                toast.error( error.message );
                console.log(error.message);
            }
        }
    });

    
    return (
        <>
            <h2 className="register-form-title">
                Registrate para ver fotos y videos
            </h2>
            <Form className="register-form" onSubmit={ formik.handleSubmit }>
                <Form.Input 
                    type="text"
                    placeholder="Nombre y apellidos"
                    name="name"
                    value={ formik.values.name } 
                    onChange={ formik.handleChange }
                    error={ formik.errors.name && true}
                />
                <Form.Input 
                    type="text"
                    placeholder="Nombre de usuario"
                    name="userName"
                    value={ formik.values.userName }  
                    onChange={ formik.handleChange }
                    error={ formik.errors.userName && true}
                />
                <Form.Input 
                    type="text"
                    placeholder="Correo electrónico"
                    name="email"
                    value={ formik.values.email } 
                    onChange={ formik.handleChange }
                    error={ formik.errors.email && true}
                />
                <Form.Input 
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={ formik.values.password } 
                    onChange={ formik.handleChange }
                    error={ formik.errors.password && true}
                />
                <Form.Input 
                    type="password"
                    placeholder="Repetir contraseña"
                    name="repeatPassword"
                    value={ formik.values.repeatPassword } 
                    onChange={ formik.handleChange }
                    error={ formik.errors.repeatPassword && true}
                />

                <Button 
                    type="submit"
                    className="btn-submit"
                >
                    Registrarse
                </Button>

               {/*  <Button 
                    type="button"
                    className="btn-submit"
                    onClick={formik.handleReset}
                >
                    Limpiar campos
                </Button> */}

            </Form>
        </>
    )
}

const initFormValues = () => {
    return {
        name: '',
        userName: '',
        email: '',
        password: '',
        repeatPassword: ''
    };
};