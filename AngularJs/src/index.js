import angular from 'angular';
import './main.scss';
import './icon.scss';

// import helloWorld from './helloWorld';
import Todo from './components/TodoList/index';

const app = angular.module("myApp", [require('angular-animate')]);

// helloWorld(app);
Todo(app);