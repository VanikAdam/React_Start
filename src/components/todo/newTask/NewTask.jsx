import React, { Component } from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap';

class NewTask extends Component {
   
    state={
        currentValue:'',
        date: ''
    }
    handleChange=(event)=>{
        this.setState({
            currentValue:event.target.value,
        });
    }
    handleDateChange=(event)=>{
        this.setState({
            date:event.target.value,
        });
    }
    sendValue=()=>{
        const {currentValue , date}=this.state;
        if(currentValue!==''){
        this.props.onAdd(currentValue, date);
        this.setState({
            currentValue:''           
        });
    }
    }
    handleKeyDown=(event)=>{
        if (event.key==='Enter'){
            this.sendValue();
        }
    }
  
    render() {
        return (           
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Input new task"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={this.handleChange}
                     onKeyDown={this.handleKeyDown}
                     value={this.state.currentValue}
                   
                />
                <input type='date' onChange={this.handleDateChange} value={this.state.data} />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={this.sendValue}>Add Task</Button>
                </InputGroup.Append>
            </InputGroup>    
        );
    }
}
export default NewTask;