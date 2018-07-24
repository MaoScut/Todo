import templateUrl from './index.html';
import Store from '../../store';
import todoLi from '../TodoLi/index';

export default function (ngModule) {
    //定义指令，对应页面中的<hello-world></hello-world>
    ngModule.value('store', new Store('Todo'));
    todoLi(ngModule);
    ngModule
        .directive('todoList', function () {
            return {
                //元素(element)
                restrict: 'E',
                templateUrl: templateUrl,
            }
        })
        .controller('myList', function ($scope, store) {
            $scope.list = store.list;
            $scope.hideDone = store.hideDone;
            $scope.tempDetail = '';
            $scope.add = function () {
                store.add($scope.tempDetail);
            }
            $scope.toggleCheck = function (id) {
                store.toggleCheck(id);
            }
            $scope.toggleHideDone = function () {
                // 仅仅是store改变，ui并不会随着变化，要手动改变scope上的值
                $scope.hideDone = !$scope.hideDone;
                store.toggleHideDone();
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
                store.delete(id);
            }
        });

}