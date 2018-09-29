import React, { Component } from 'react';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { TodoApp } from './TodoApp';


class App extends Component {

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


}

export default App;
