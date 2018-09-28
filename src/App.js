import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Login } from "./component/Login";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { TodoApp } from './TodoApp';
import axios from 'axios';

localStorage.setItem("isLoggedIn", false);

localStorage.setItem("username", "juan.ramirez-me@mail.escuelaing.edu.co");

localStorage.setItem("password", "qwerty");


class App extends Component {

    state = {
        isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
        username: "",
        password: ""
    };

    LoginView = () => (
        <Login handleLogin={this.handleSubmit}
            handleUsernameChange={this.handleUsernameChange}
            handlePasswordChange={this.handlePasswordChange} />
    );

    TodoView = () => (
        <TodoApp />
    );

    render() {

        return (
            <Router>
                <div>
                    <div>
                        <Route exact path="/" component={this.TodoView} />
                    </div>
                </div>
            </Router>
        )
    }




    handleSubmit = event => {
        event.preventDefault();
        let self = this;
        axios.post('http://localhost:8080/user/login', {
            username: this.state.username,
            password: this.state.password
        })
            .then(function (response) {
                localStorage.setItem("token", response.data.accessToken);
                if (localStorage.getItem("token")) {
                    localStorage.setItem("isLoggedIn", true);
                    self.setState({ isLoggedIn: true });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        /*if (localStorage.getItem("token") && this.state.email === localStorage.getItem("email") &&
            this.state.password === localStorage.getItem("password")) {
            localStorage.setItem("isLoggedIn", true);
            this.setState({ isLoggedIn: true });
        }*/



    }

    handleUsernameChange = event => {
        this.setState({
            username: event.target.value
        });
    }

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        });
    }


}

export default App;
