import React, { Component } from 'react';
import style from './ToDo.module.css';
class ToDo extends Component {
    state={
        currentValue:'',
        tasks:[]
    }
    handleChange=(event)=>{
        this.setState({
            currentValue:event.target.value,
        })
    }
    addTask=()=>{
        if(this.state.currentValue!==''){
        let currentTasks=this.state.tasks;
        currentTasks.push(this.state.currentValue);
       
        this.setState({
            tasks:currentTasks,
            currentValue:''
        })
    }
        
    }
    removeTask=(index)=>{
        let tasks=this.state.tasks;
        tasks.splice(index,1);
        this.setState({
            tasks
        })
    }
    render() {
        let li=this.state.tasks.map((elem,index)=>{
            return <li key={index} className={style.list} >{elem} <span id={index} onClick={()=>this.removeTask(index)}>X</span></li>
        })
        return (
            <div className={style.inputSide}>
            <div><input type="text" value={this.state.currentValue} onChange={this.handleChange}/>
            <button onClick={this.addTask}>Add Task</button></div>
            <ul className={style.listBoard}>
                {li}
            </ul>
            </div>
        )
}
}
export default ToDo;