import React from 'react';
import {Modal, Button} from 'react-bootstrap';
function  Confirm(props) {

 
        return (

            <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={true}
              onHide={props.onCancel}
            >
              <Modal.Header closeButton>
               
              </Modal.Header>
              <Modal.Body>
               
                <p>
               Are you want to delete {props.count} tasks?
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={props.onCancel}>Close</Button>
                <Button onClick={props.onSubmit}>Delete All</Button>
              </Modal.Footer>
            </Modal>
          );
    
   
  }
  export default Confirm;
  