import React, { PureComponent } from 'react';
import {FormControl, Button, Modal} from 'react-bootstrap';

class NewTask extends PureComponent {

    state = {
        title: '',
        date: '',
        description:''
    }
    handleChange = (event) => {
        let {name, value}=event.target
        this.setState({
            [name]: value
        });
    }
   
    sendValue = () => {
        const { title, date, description } = this.state;
        if (title !== '') {
            this.props.onSubmit(title, date, description);
           this.props.onCancel();
        }
    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.sendValue();
        }
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
                Add New Task
                </Modal.Header>
                <Modal.Body>
                    
                        <FormControl
                            placeholder="Input new task"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyDown}
                            value={this.state.title}
                            name='title'

                        />
                        <input type='date' onChange={this.handleChange} value={this.state.data} name='date'/>
                        <FormControl as="textarea" rows={5} name='description'  onChange={this.handleChange}/>
                   
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={this.sendValue} variant="outline-success">Add Task</Button>
                    <Button onClick={this.props.onCancel} variant='outline-warning'>Close</Button>
                    
                </Modal.Footer>
            </Modal>
        );




    }
}
export default NewTask;