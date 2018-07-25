import angular from 'angular';
import './main.scss';
// import helloWorld from './helloWorld';
import Todo from './components/TodoList/index';

const app = angular.module("myApp", []);

// helloWorld(app);
Todo(app);