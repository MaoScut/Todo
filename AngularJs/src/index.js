import angular from 'angular';
import helloWorld from './helloWorld';

const app = angular.module("myApp", []);

helloWorld(app);