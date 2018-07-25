import template from './index.html';
export default function (ngModule) {
    ngModule.directive('todoLiRight', function () {
        return {
            templateUrl: template,
            restrict: 'E',
        }
    })
}