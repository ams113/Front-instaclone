import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import ModalPublication from '../../Modal/ModalPublication/ModalPublication';
import './PreviewPublication.scss';


export const PreviewPublications = ( { publication } ) => {

    const [showModal, setShowModal] = useState( false );
    
    return (
        <>
            <div className="preview-publications" onClick={ () => setShowModal( true ) } >
                <Image className="preview-publications__image"
                    src={ publication.file } />
            </div>
            <ModalPublication 
                show={ showModal } 
                setShow={ setShowModal }
                publication={ publication }    
            />
        </>
    )
}

export default PreviewPublications;