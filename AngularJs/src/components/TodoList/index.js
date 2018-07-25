import templateUrl from './index.html';
import todoService from '../../store';
import todoLiRight from '../TodoLiRight/index';
import todoLiLeft from '../TodoLiLeft/index';

export default function (ngModule) {
    //定义指令，对应页面中的<hello-world></hello-world>
    ngModule.value('todoService', new todoService('Todo'));
    // ngModule.service('todoService', todoService);
    todoLiRight(ngModule);
    todoLiLeft(ngModule);
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
            // $scope.hideDone = todoService.hideDone;
            $scope.tempDetail = '';
            $scope.achieveTime = '';
            $scope.bShowEditor = false;
            $scope.add = function () {
                todoService.add($scope.tempDetail, new Date($scope.achieveTime).getTime());
                $scope.tempDetail = '';
                $scope.achieveTime = '';
                $scope.bShowEditor = false;
            }
            $scope.check = function (id) {
                todoService.check(id);
            }
            $scope.toggleShowed = function (id) {
                // 仅仅是todoService改变，ui并不会随着变化，要手动改变scope上的值
                todoService.toggleHideDone(id);
            }
            $scope.showEditor = function () {
                $scope.bShowEditor = true;
            }
            // $scope.beShowed = function (todoObj) {
            //     if ($scope.hideDone) {
            //         if (todoObj.done) {
            //             return false;
            //         }
            //     }
            //     return true;
            // }
            $scope.delete = function (id) {
                todoService.delete(id);
            }
        });

}