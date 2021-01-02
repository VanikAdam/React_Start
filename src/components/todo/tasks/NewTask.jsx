import React, { Component } from 'react';

class NewTask extends Component {
   
    state={
        currentValue:'',
        date: ''
    }
    handleChange=(event)=>{
        this.setState({
            currentValue:event.target.value,
        })
    }
    handleDateChange=(event)=>{
        this.setState({
            date:event.target.value,
        })
    }
    sendValue=()=>{
        const {currentValue , date}=this.state;
        if(currentValue!==''){
        this.props.onAdd(currentValue, date);
        this.setState({
            currentValue:'',
           date:''
        })
    }
    }
    handleKeyDown=(event)=>{
        if (event.key==='Enter'){
            this.sendValue();
        }
    }
  
    render() {
        return (
            <div><input type="text" value={this.state.currentValue} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
            <input type='date' onChange={this.handleDateChange} value={this.state.data} />
                <button onClick={this.sendValue}>Add Task</button>
            </div>

        );
    }
}
export default NewTask;