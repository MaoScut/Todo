import template from './index.html';
export default function (ngModule) {
    ngModule.directive('todoLiLeft', function () {
        return {
            templateUrl: template,
            restrict: 'E',
        }
    })
}