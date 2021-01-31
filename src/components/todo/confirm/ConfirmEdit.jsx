import React, { PureComponent } from 'react';
import { Modal, Button } from 'react-bootstrap';
class ConfirmEdit extends PureComponent {
  state = {
    newValue: ''
  }
  toggleInput = (event) => {
   let value = event.target.value;
   if(value===''){
    return
   }
   else{
    this.setState({
      newValue: value
    })
   }
 
  
  }
  saveChange=()=>{
   
    this.props.onSubmit(this.state.newValue);
    this.setState({
      newValue:''
    })
    
  }
  render() {
    return (

      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onHide={this.props.onCancel}
      >
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>

          <input type='text' onChange={this.toggleInput} value={this.state.newValue} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onCancel}>Close</Button>
          <Button onClick={this.saveChange}>Edit</Button>
        </Modal.Footer>
      </Modal>
    );


  }
}
export default ConfirmEdit;
