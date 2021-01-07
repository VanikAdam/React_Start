import React, { Component } from 'react';
import NewTask from './newTask/NewTask';
import Task from './tasks/Task'
import {Container, Row, Col, Button} from 'react-bootstrap';

class ToDo extends Component {
    
        state = {
            currentValue: '',
            tasks: [],
            list: ''
        };
    componentDidMount(){
        let api = {
            key: '8efae59934ba47a35fd0964006fe0438',
            baseUrl: 'https://api.openweathermap.org/data/2.5/forecast?'
        };
        const latitude = 40.17;
        const longitude = 44.49;
        const url = `${api.baseUrl}lat=${latitude}&lon=${longitude}&exclude=daily&appid=${api.key}`;

        fetch(url).then(data => data.json()).then(data => this.setState({ list: data.list }));
    }

    removeTask = (index) =>()=> {
        let newTasks = this.state.tasks.filter((task,ind)=>index!==ind);
        this.setState({
            tasks: newTasks
        });
    }
    addTask = (currentValue, date) => {
        let currentTasks = [...this.state.tasks];
        let addedTask = {
            text:currentValue,
            date: date
        }
        let list = [...this.state.list];
        let find = false;
        let icon;
        let weather = '';
        for (let i = 0; i < list.length; i++) {
            let dt = list[i].dt_txt.slice(0, 10)
            if (date === dt) {
                find = true;
                icon = list[i].weather[0].icon;
                find = true;
                if (icon.slice(-1) === 'd') {
                    icon = 'P' + list[i + 1].weather[0].icon;
                    weather = Math.floor(list[i + 1].main.temp - 273);
                    weather += '° C';
                    break;
                }
            }
        }
        if (!find) {
            icon = 'Punknown';
            weather = 'Unknown'
        }

      
        addedTask.icon=icon;
            
        addedTask.weather=weather;
        
        currentTasks.unshift(addedTask);
        this.setState({
            tasks: currentTasks,
            currentValue: ''
        });
    }
    render() {
        const tasks = this.state.tasks.map((elem, index) => {
            return <Col key={index}>
                <Task elem={elem} remove={this.removeTask} id={index}/>              
            </Col>
        })
        return (

            <Container>
                <Row>
                <Col md={{span:6, offset:3}}>
                     <NewTask onAdd={this.addTask} />
                </Col>
                </Row>
                <Button variant="danger">Remove All cheched cards</Button>
                <Row>
                
                  {tasks}
                </Row>
            </Container>
        );
    }
}
export default ToDo;