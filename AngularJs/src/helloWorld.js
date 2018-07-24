import templateUrl from './helloWorld.html';
// const templateUrl = require('./helloWorld.html');

export default function (ngModule) {
  //定义指令，对应页面中的<hello-world></hello-world>
  ngModule.directive('helloWorld', helloWorldFn);
  function helloWorldFn() {
    return {
      //元素(element)
      restrict: 'E',
      scope: {},
      templateUrl: templateUrl,
      controllerAs: 'vm',
      controller: function () {
        var vm = this;
        console.log('this',this);
        vm.greeting = '你好，我是Alan，很高兴见到你!';
      }
    }
  }
}