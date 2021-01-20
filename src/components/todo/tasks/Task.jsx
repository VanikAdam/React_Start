import React, { PureComponent } from 'react';
import images from './../pic/Pic';
import style from './Task.module.css'
import { Card, Form, Button} from 'react-bootstrap';


class Task extends PureComponent {
    
        state={
            isChecked: this.props.elem.isChecked
        }
    
 
  toggleCheckbox=(event)=>{
 
      let check=!this.state.isChecked;
   
  
      this.props.checkTask(event.target.id, check);

      
   
      
  }
 editTask=()=>{
    this.props.edittask(this.props.elem.id)
 }
   render(){
    return (
        <Card style={{ width: '15rem' }} className={`${style.task+' '+(this.state.isChecked ? style.checked: '')}`}>
         <Card.Title>{this.props.elem.title}</Card.Title>
            <Form>
                <Form.Check
                    type="switch"
                    id={this.props.elem.id}
                    label="Check this switch"   
                    onChange={this.toggleCheckbox}  
                    defaultChecked={this.state.isChecked}          
              />
           </Form>
            <Card.Img style={{ width: '5rem' }} variant="top-left" src={images[this.props.elem.icon]} />
            <Card.Text style={{ position: 'absolute', top: '30px', right: '20%' }}>
                {this.props.elem.weather}
            </Card.Text>
            <Card.Body>
                <Card.Title>{this.props.elem.date}</Card.Title>
               
                <Card.Text>
                    {this.props.elem.description}
                </Card.Text>

                <Button variant="info"
                 disabled={this.state.isChecked} onClick={this.editTask}>Edit Task</Button>

                <Button variant="danger"  
                onClick={this.props.remove(this.props.elem.id)} 
                disabled={this.state.isChecked}>Remove Task</Button>
               
            </Card.Body>
        </Card>
    );
}
}
export default Task;