import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Login } from "./component/Login";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { TodoApp } from './TodoApp';
import axios from 'axios';

localStorage.setItem("isLoggedIn", false);

localStorage.setItem("email", "xyz");

localStorage.setItem("password", "password");


class App extends Component {

    state = {
        isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
        email:"",
        password:""
    };

    LoginView = () => (
        <Login handleLogin={this.handleSubmit}
            handleEmailChange={this.handleEmailChange}
            handlePasswordChange={this.handlePasswordChange} />
    );

    TodoView = () => (
        <TodoApp />
    );

    render() {

        if (this.state.isLoggedIn) {
            return (
                <Router>
                    <div>
                        <div>
                            <Route exact path="/" component={this.TodoView} />
                        </div>
                    </div>
                </Router>
            );
        } else {
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
                            <Route exact path="/" component={this.LoginView} />
                        </div>
                    </div>
                </Router>
            );
        }


    }

    handleSubmit = event => {
        axios.post('http://localhost:8080/user/login', {
             email: this.state.email,
             password: this.state.password
         })
             .then(function (response) {
                localStorage.setItem("token", response.data);
             })
             .catch(function (error) {
                 console.log(error);
             });
        if (localStorage.getItem("token") && this.state.email === localStorage.getItem("email") &&
            this.state.password === localStorage.getItem("password")) {
            localStorage.setItem("isLoggedIn", true);
            this.setState({ isLoggedIn: true });
        }

        

    }

    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        });
    }

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        });
    }


}

export default App;
