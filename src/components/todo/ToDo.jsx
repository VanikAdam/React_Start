import React, { Component } from 'react';
import NewTask from './newTask/NewTask';
import Task from './tasks/Task'
import idGenerate from './../../helper/idGenerate'
import { Container, Row, Col, Button } from 'react-bootstrap';
import Confirm from './confirm/Confirm';
import ConfirmEdit from './confirm/ConfirmEdit';



class ToDo extends Component {

    state = {
        tasks: [],
        list: '',
        confirm: false,
        count: 0,
        taskForEdit: [],
        confirmEdit: false,
        editTaskIdInTasks: '',
        confirmAddNewTask: false
    };
    componentDidMount() {
        let api = {
            key: '8efae59934ba47a35fd0964006fe0438',
            baseUrl: 'https://api.openweathermap.org/data/2.5/forecast?'
        };
        const latitude = 40.17;
        const longitude = 44.49;
        const url = `${api.baseUrl}lat=${latitude}&lon=${longitude}&exclude=daily&appid=${api.key}`;

        fetch(url).then(data => data.json()).then(data => this.setState({ list: data.list }));
    }

    removeTask = (index) => () => {
        let newTasks = this.state.tasks.filter((task) => index !== task.id);

        this.setState({
            tasks: newTasks
        });
    }
    checkTask = (id, checked) => {
        console.log(id, checked)
        let count = this.state.count;


        let tasks = [...this.state.tasks];
        tasks.forEach(element => {
            if (id === element.id)
                element.isChecked = !element.isChecked
        })
        checked ? count++ : count--;


        this.setState({
            tasks,
            count

        })
    }
    removeCheckedTasks = () => {

        let newTasks = this.state.tasks.filter((task) => task.isChecked !== true);

        this.setState({
            tasks: newTasks,
            confirm: !this.state.confirm,
            count: 0
        });

    }
    toggleModal = () => {
        this.setState({

            confirm: !this.state.confirm
        });
    }
    addTask = (currentValue, date, description) => {
        let currentTasks = [...this.state.tasks];
        let addedTask = {
            title: currentValue,
            date: date,
            description: description

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


        addedTask.icon = icon;

        addedTask.weather = weather;
        addedTask.id = idGenerate();
        addedTask.isChecked = false;
        currentTasks.unshift(addedTask);
        this.setState({
            tasks: currentTasks,
         
        });
    }

    editTask = (addedTaskId) => {
        let task = [...this.state.tasks];
        let addedTaskIdInTasks;
        let taskForEdit;
        task.forEach((elem, id) => {
            if (elem.id === addedTaskId) {
                addedTaskIdInTasks = id;
                taskForEdit = elem;

            }
        })


        let newTaskEdit = [taskForEdit, addedTaskIdInTasks]
        this.setState({
            confirmEdit: true,
            taskForEdit: newTaskEdit,
            editTaskIdInTasks: addedTaskIdInTasks

        })
    }
    toggleEditModal = () => {
        this.setState({
            confirmEdit: !this.state.confirmEdit
        })
    }
    toggleAddNewTask=()=>{
        this.setState({
            confirmAddNewTask: !this.state.confirmAddNewTask
        })
    }

    toggleEditTask = (value) => {
        let task = [...this.state.taskForEdit];
        let tasks = [...this.state.tasks];
        task[0].description = value;
        tasks[task[1]] = task[0];

        this.setState({
            tasks: tasks,
            taskForEdit: [],
            confirmEdit: false,
            editTaskIdInTasks: ''
        })
    }
    toggleSelectAll = () => {
        let task = [...this.state.tasks];
        task.forEach((elem) => elem.isChecked = true);
        this.setState({
            tasks: task,
            count: task.length
        })

    }
    toggleDeSelectAll = () => {
        let task = [...this.state.tasks];
        task.forEach((elem) => elem.isChecked = false);
        this.setState({
            tasks: task,
            count: 0
        })
    }
    render() {
        const tasks = this.state.tasks.map((elem) => {

            return <Col key={idGenerate()} >
                <Task elem={elem} remove={this.removeTask} checkTask={this.checkTask} edittask={this.editTask} />
            </Col>
        })
        return (

            <Container>
             
                   
                        
                    

               
                <Row>
                <Col>
                        <Button variant="success"  onClick={this.toggleAddNewTask}>Add Task</Button>

                    </Col>
                    <Col>
                        <Button variant="danger" disabled={this.state.count === 0 ? true : false} onClick={this.toggleModal}>Remove All cheched cards</Button>

                    </Col>
                    <Col>
                        <Button variant="warning" disabled={this.state.count === this.state.tasks.length} onClick={this.toggleSelectAll}>Check All Tasks</Button>

                    </Col>
                    <Col>
                        <Button variant="warning" disabled={this.state.count === 0} onClick={this.toggleDeSelectAll}>Uncheck All Tasks</Button>

                    </Col>
                </Row>

                <Row>

                    {tasks}
                </Row>
                {
                    this.state.confirm && <Confirm count={this.state.count} onCancel={this.toggleModal} onSubmit={this.removeCheckedTasks} />
                }

                {
                    this.state.confirmEdit && <ConfirmEdit onCancel={this.toggleEditModal} onSubmit={this.toggleEditTask} />
                }
                {
                  this.state.confirmAddNewTask &&  <NewTask  onCancel={this.toggleAddNewTask} onSubmit={this.addTask} />
                }
            </Container>

        );
    }
}
export default ToDo;