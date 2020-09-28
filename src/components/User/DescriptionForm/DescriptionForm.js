import React from 'react';
import './DescriptionForm.scss';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { toast } from 'react-toastify';

export const DescriptionForm = ( { setShowModal, currentDescription, refetch} ) => {

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik( {
        initialValues: { description: currentDescription || '' },
        validationSchema: Yup.object( {
            description: Yup.string().required()
        }),
        onSubmit: async ( formValue ) => {
            
            try {

                await updateUser({
                    variables: {
                        input: formValue,
                    }
                });
                refetch();
                setShowModal( false );
                toast.success('Biografía actualizada')
            } catch (error) {
                toast.error( 'Error al actualizar biografía' );
            }
        }
    });


    return (
        <Form className="description-form" onSubmit={ formik.handleSubmit } >
            <TextArea 
                name="description"
                value={ formik.values.description } 
                onChange={ formik.handleChange }
                className= { formik.errors.description && 'error' }

            />
            <Button type="submit" className="btn-submit">
                Actualizar
            </Button>
        </Form>
    )
}

export default DescriptionForm;