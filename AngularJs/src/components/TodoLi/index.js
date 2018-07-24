import template from './index.html';
export default function (ngModule) {
    ngModule.directive('todoLi', function () {
        return {
            templateUrl: template,
            restrict: 'E',
        }
    })
}