import React, { Component } from 'react';
import style from './ToDo.module.css';
import NewTask from './tasks/NewTask';
import images from './pic/Pic';

class ToDo extends Component {
    constructor() {
        super();
        this.state = {
            currentValue: '',
            tasks: [],
            list: ''
        };
        let api = {
            key: '8efae59934ba47a35fd0964006fe0438',
            baseUrl: 'https://api.openweathermap.org/data/2.5/forecast?'
        };
        const latitude = 40.17;
        const longitude = 44.49;
        const url = `${api.baseUrl}lat=${latitude}&lon=${longitude}&exclude=daily&appid=${api.key}`;

        fetch(url).then(data => data.json()).then(data => this.setState({ list: data.list }));
    }

    removeTask = (index) => {
        let tasks = this.state.tasks;
        tasks.splice(index, 1);
        this.setState({
            tasks
        })
    }
    addTask = (currentValue, date) => {

        let currentTasks = [...this.state.tasks];
        let addedTask = [currentValue, date];
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
                    weather += '°C';


                    break;
                }

            }


        }
        if (!find) {
            icon = 'Punknown';
            weather = 'Unknown'
        }

        addedTask.push(icon, weather);
        currentTasks.push(addedTask);
        this.setState({
            tasks: currentTasks,
            currentValue: ''
        })
    }
    render() {


        let li = this.state.tasks.map((elem, index) => {

            return <li key={index} className={style.list} >
                <div className={style.listContent}>
                    <p className={style.taskText}>{elem[0]}</p>
                    <p>{elem[1]} </p>
                    <span id={index} onClick={() => this.removeTask(index)}>Skip</span>
                </div>
                <div className={style.weatherSide}>
                    <img src={images[elem[2]]} alt="" className={style.weatherIcon} />
                    <p className={style.temp}>{elem[3]}</p>
                </div>

            </li>
        })

        return (

            <div className={style.inputSide}>
                <NewTask onAdd={this.addTask} />
                <ul className={style.listBoard}>
                    {li}
                </ul>
            </div>
        )
    }
}
export default ToDo;