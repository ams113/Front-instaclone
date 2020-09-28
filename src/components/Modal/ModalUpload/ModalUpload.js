import { useMutation } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { Button, Dimmer, Icon, Loader, Modal } from 'semantic-ui-react';
import { PUBLISH } from '../../../gql/publication';
import './ModalUpload.scss';

export const ModalUpload = ( { show, setShow } ) => {

    const [fileUpload, setFileUpload] = useState(null);
    const [isLoading, setIsLoading] = useState( false );

    const [publish] = useMutation( PUBLISH );

    const onDrop = useCallback( ( acceptedFile ) => {

        const file = acceptedFile[0];
        
        setFileUpload({
            type: 'image',
            file,
            preview: URL.createObjectURL( file ),
        });
    });

   const { getRootProps, getInputProps } = useDropzone( {
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop,
    })

    const onClose = () => {
        setFileUpload( null );
        setIsLoading( false );
        setShow( false );
    };

    const onPublish = async () => {

        setIsLoading( true );
        
        try {
            const result = await publish( {
                variables: {
                    file: fileUpload.file,
                }
            });

            const { data } = result;

            if ( !data.publish.status ) {

                toast.warning('Error al publicar');
                setIsLoading( false );
                
            } else {
                toast.success('Publicación subida');
                onClose();
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal className="modal-upload" size="small" open={ show } onClose={ onClose } >
            <div { ...getRootProps() } 
                className="dropzone"
                style={ fileUpload && { border: 0 } } >
                    { !fileUpload && (
                        <>
                            <Icon name="cloud upload" />
                            <p>Arrastra aquí la imagen para publicar</p>
                        </>
                    ) }
                    <input { ...getInputProps() } />
            </div>
            { fileUpload?.type === "image" && (
                <div className="image"
                    style={{ background: `url("${ fileUpload.preview }")` }} />
            )}

            { fileUpload && (
                <Button className="btn-upload btn-action" onClick={ onPublish }>
                    Publicar
                </Button>
            )}


            { isLoading && (
                <Dimmer active className="publishing">
                    <Loader />
                    <p>Publicando...</p>
                </Dimmer>
            )}
        </Modal>
    );
}

export default ModalUpload;