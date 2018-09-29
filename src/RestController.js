import axios from 'axios';



export function getTodoList(callback) {
    var axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api/',
    });
    axiosInstance.get('todo')
        .then(function (response) {
            callback.onSuccess(response);
        })
        .catch(function (error) {
            callback.onFailed(error);
        })
};

export function addTodo(todo, callback) {
    var axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api/'
    });
    axiosInstance.post('todo', todo)
        .then(function () {
            callback.onSuccess();
        })
        .catch(function (error) {
            callback.onFailed(error);
        })
};


