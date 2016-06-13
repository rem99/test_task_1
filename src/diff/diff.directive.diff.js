import diff from './diff';
import './diff.service.diff.js';
import './diff.provider.diffConfig.js';

diff.directive('diff', ['DiffService', 'DiffConfig', function (DiffService, DiffConfig) {
    var directive = {
        restrict: 'E',
        replace: true,
        scope: {
            /**
             * 'compare' is an object with two properties: baseText and newText
             */
            compare: '='
        },
        link ($scope) {
            $scope.$watchGroup(['compare.baseText', 'compare.newText'], function() {
                $scope.diff = DiffService.compare($scope.compare.baseText, $scope.compare.newText);
            });
        }
    };

    if (DiffConfig.template !== undefined) {
        directive.template = DiffConfig.template;
    } else {
        directive.templateUrl = DiffConfig.templateUrl;
    }

    return directive;
}]);
