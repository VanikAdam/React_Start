import React, { Component } from 'react';
import style from './ToDo.module.css';
import NewTask from './tasks/NewTask';
import images from './pic/Pic'

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

    // getDate = () => {
    //     let api = {
    //         key: '8efae59934ba47a35fd0964006fe0438',
    //         baseUrl: 'https://api.openweathermap.org/data/2.5/forecast?'
    //     };
    //     const latitude = 40.17;
    //     const longitude = 44.49;
    //     const url = `${api.baseUrl}lat=${latitude}&lon=${longitude}&exclude=daily&appid=${api.key}`;

    //     fetch(url).then(data => data.json()).then(data =>this.setState({ list: data.list }) );


    // }
    addTask = (currentValue, date) => {

        let currentTasks = [...this.state.tasks];
        let addedTask = [currentValue, date];
        // currentTasks.push(addedTask);
        // this.getDate();

        // this.setState({
        //     tasks: currentTasks,
        //     currentValue: ''
        // })

        let list = [...this.state.list];


        console.log(this.state.list)

        for (let i = 0; i < list.length; i++) {
            let dt = list[i].dt_txt.slice(0, 10)
            // console.log(list[i].dt_txt.slice(0,10));
            if (date === dt) {
                let icon = list[i].weather[0].icon;
                if (icon.slice(-1) === 'd') {
                    icon = 'P'+list[i+1].weather[0].icon;
                    let weather=Math.floor(list[i+1].main.temp-273);
                    weather+='°C';
                    addedTask.push(icon,weather);
                  
                    break;
                }
              
            }
        }

        currentTasks.push(addedTask);
        this.setState({
            tasks: currentTasks,
            currentValue: ''
        })





    }
    render() {

      
        let li = this.state.tasks.map((elem, index) => {

            return <li key={index} className={style.list} >{elem[0]}<br/>{elem[1]} <span id={index} onClick={() => this.removeTask(index)}>X</span>
         

     
     
            <p className={style.temp}>{elem[3]}</p>
            <img src={images[elem[2]]} alt=""/>
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