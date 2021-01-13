import { json } from 'express';
import React, { Component } from 'react';

class App extends Component {

    constructor(){
        super();

        this.state = {
            title: '',
            description: ''
        };

        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTask(event){
        //console.log(this.state);
        fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        
        .then(res => res.json())
        .then(data => {
            console.log(data)
            M.toast({html: 'Tarea Guardada'});
            this.setState({title: '', description: ''});
        })
        .catch(err => console.log(err));

        event.preventDefault();
    }

    componentDidMount(){
        this.getTasks();
    }
    

    getTasks(){
        fetch('/api/tasks')

        .then(res => res.json())
        .then(data => console.log(data));
    }

    handleChange(event){
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task title" value={this.state.title}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Task description" className="materialize-textarea" value={this.state.description}></textarea>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn light-blue darken-4">
                                            Enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;