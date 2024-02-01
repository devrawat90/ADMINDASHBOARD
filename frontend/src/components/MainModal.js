
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ViewModal = ({ onHide, mainmodelItem }) => {
    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {mainmodelItem}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewModal;

// {
//     showViewModal && (
//         <ViewModal
//             item={viewItem}
//             onHide={() => setShowViewModal(false)}
//         />
//     )
// }

// this is inerted in components with state