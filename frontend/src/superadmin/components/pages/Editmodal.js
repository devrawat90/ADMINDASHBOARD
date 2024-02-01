
import { React, useState } from 'react';
import { Button, Modal, Form, } from 'react-bootstrap';

const EditModal = ({ item, onHide, onSave, modelbody }) => {
    const [editedItem, setEditedItem] = useState(item);

    const handleSave = () => {
        onSave(editedItem);
        onHide();
    };

    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modelbody}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;