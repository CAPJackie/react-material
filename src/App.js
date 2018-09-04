import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Login } from "./component/Login";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { TodoApp } from './TodoApp';

localStorage.setItem("isLoggedIn", false);

localStorage.setItem("username", "juan.ramirez-me@mail.escuelaing.edu.co");

localStorage.setItem("password", "abcd");

const LoginView = () => (
    <Login handleLogin = {this.handleSubmit}/>
);

const TodoView = () => (
    <TodoApp/>
);

class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn"))
        };

    }


    render() {
        console.log(this.state.isLoggedIn);
        if (this.state.isLoggedIn) {
            return (
                <Router>
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                            <h1 className="App-title">TODO React App</h1>
                        </header>

                        <br />
                        <br />

                        <div>
                            <Route exact path="/todo" component={TodoView} />
                        </div>
                    </div>
                </Router>
            );
        } else if(!this.state.isLoggedIn){
            
            return (
                <Router>
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                            <h1 className="App-title">TODO React App</h1>
                        </header>

                        <br />
                        <br />

                        <div>
                            <Route path="/" component={LoginView} />
                        </div>
                    </div>
                </Router>
            );
        }

        
    }

    handleSubmit(e){
        localStorage.setItem("isLoggedIn", true);
        this.setState({isLoggedIn: true});
    }



}

export default App;
