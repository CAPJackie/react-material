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
        this.state = { items: [], description: '', priority: 0, dueDate: "", file:"" };
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addItem = this.addItem.bind(this);
        this.assignTodoList = this.assignTodoList.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        
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
                            id="description"
                            label="description"
                            onChange={this.handleDescriptionChange}
                            value={this.state.description}
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

                        <input type="file" id="file" onChange={this.handleFileChange}/>

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

    handleDescriptionChange(e) {

        this.setState({
            description: e.target.value
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

    handleFileChange(e) {
        this.setState({
            file: e.target.files[0]
        });                
    }

    handleSubmit(e) {

        e.preventDefault();

        let data = new FormData();
        data.append('file', this.state.file);


        var axiosInstance = axios.create({
            baseURL: 'http://localhost:8080/api/',
        });

        var self = this;
        axiosInstance.post('files', data)
            .then(function (response) {
                console.log(self.state.file);
                self.addItem( {
                    description: self.state.description,
                    priority: self.state.priority,
                    dueDate: self.state.dueDate,
                    file: self.state.file.name
                } );
                console.log("file uploaded!", data);
        })
        .catch(function (error) {
            console.log("failed file upload", error);
        });

        
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
                    description: '',
                    priority: '',
                    dueDate: '',
                    file : ''
                });
            },
            onFailed: function(error){
                console.log(error);
            }
        };
        getTodoList(callback);
    }

    

}