import axios from 'axios';



export function getTodoList(callback) {
    var axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api/',
        timeout: 1000,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
    });
    axiosInstance.get('todos')
        .then(function (response) {
            callback.onSuccess(response);
        })
        .catch(function (error) {
            callback.onFailed(error);
        })
};

export function addTodo(todo, callback) {
    var axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api/',
        timeout: 1000,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
    });
    axiosInstance.post('todos', todo)
        .then(function () {
            callback.onSuccess();
        })
        .catch(function (error) {
            callback.onFailed(error);
        })
};


