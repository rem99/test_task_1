import app from 'app';
import 'app.directive.diff';
import diffTpl from 'text!tpl.diff.html';

app.directive('diff', ['DiffService', function (DiffService) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            compare: '='
        },
        link:function($scope) {
            $scope.$watchGroup(['compare.baseText', 'compare.newText'], function() {
                $scope.diff = DiffService.compare($scope.compare.baseText, $scope.compare.newText);
            });
        },
        template: diffTpl
    };
}]);
