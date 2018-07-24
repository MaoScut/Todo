import templateUrl from './index.html';
import todoService from '../../store';
import todoLi from '../TodoLi/index';

export default function (ngModule) {
    //定义指令，对应页面中的<hello-world></hello-world>
    ngModule.value('todoService', new todoService('Todo'));
    // ngModule.service('todoService', todoService);
    todoLi(ngModule);
    ngModule
        .directive('todoList', function () {
            return {
                //元素(element)
                restrict: 'E',
                templateUrl: templateUrl,
            }
        })
        .controller('myList', function ($scope, todoService) {
            $scope.list = todoService.list;
            $scope.hideDone = todoService.hideDone;
            $scope.tempDetail = '';
            $scope.add = function () {
                todoService.add($scope.tempDetail);
                $scope.tempDetail = '';
            }
            $scope.toggleCheck = function (id) {
                todoService.toggleCheck(id);
            }
            $scope.toggleHideDone = function () {
                // 仅仅是todoService改变，ui并不会随着变化，要手动改变scope上的值
                $scope.hideDone = !$scope.hideDone;
                todoService.toggleHideDone();
            }
            $scope.beShowed = function (todoObj) {
                if ($scope.hideDone) {
                    if (todoObj.done) {
                        return false;
                    }
                }
                return true;
            }
            $scope.delete = function (id) {
                todoService.delete(id);
            }
        });

}