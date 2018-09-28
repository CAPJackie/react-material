import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoList } from "./TodoList";
import 'react-datepicker/dist/react-datepicker.css';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import {getTodoList, addTodo} from './RestController';
import axios from 'axios';

export class TodoApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = { items: [], text: '', priority: 0, dueDate: "", file:"" };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addItem = this.addItem.bind(this);
        this.assignTodoList = this.assignTodoList.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">TODO React App</h1>
                </header>

                <br />
                <br />
                <div className="form-div">
                    <Paper>
                        <br />
                        <h3>New TODO</h3>

                        <TextField
                            id="text"
                            label="Text"
                            onChange={this.handleTextChange}
                            value={this.state.text}
                        />

                        <br />
                        <br />
                        <TextField
                            id="priority"
                            label="Priority"
                            onChange={this.handlePriorityChange}
                            value={this.state.priority}
                            type="number"
                        />
                        <br />
                        <br />
                        <TextField
                            id="due-date"
                            label="Due date"
                            onChange={this.handleDateChange}
                            value={this.state.dueDate}
                            type="date"
                        />

                        <br/>
                        <br/>

                        <input type="file" id="file" onChange={this.handleInputChange}/>

                        <br />
                        <br />
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            <AddIcon />
                            Add #{this.state.items.length + 1}
                        </Button>
                        <br />
                        <br />
                        <br />

                    </Paper>
                </div>
                <br />
                <br />
                <div className="table-div">
                    <TodoList todoList={this.state.items} />
                </div>

            </div>
        );
    }

    handleTextChange(e) {

        this.setState({
            text: e.target.value
        });
    }

    handlePriorityChange(e) {

        this.setState({
            priority: e.target.value
        });
    }

    handleDateChange(e) {
        this.setState({
            dueDate: e.target.value
        });
    }

    handleSubmit(e) {

        e.preventDefault();
        //if (!this.state.text.length || !this.state.priority.length || !this.state.dueDate)
          //  return;

        let data = new FormData();
        data.append('file', this.state.file);


        var axiosInstance = axios.create({
            baseURL: 'http://localhost:8080/api/',
        });

        axiosInstance.post('files', data)
            .then(function (response) {
                console.log("file uploaded!", data);
        })
        .catch(function (error) {
            console.log("failed file upload", error);
        });
        /*const newItem = {
            text: this.state.text,
            priority: this.state.priority,
            dueDate: this.state.dueDate,

        };

        this.addItem(newItem);*/

        
    }

    addItem(todo){
        let self = this;
        var callback = {
            onSuccess: function(){
                self.assignTodoList();
            },
            onFailed: function(error){
                console.log(error);
            }
        };
        addTodo(todo, callback);
    }

    assignTodoList(){
        let self = this;
        var callback = {
            onSuccess: function(response){
                self.setState({
                    items: response.data,
                    text: '',
                    priority: '',
                    dueDate: ''
                });
            },
            onFailed: function(error){
                console.log(error);
            }
        };
        getTodoList(callback);
    }

    handleInputChange(e) {
        this.setState({
            file: e.target.files[0]
        });                
    }

}