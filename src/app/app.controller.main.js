import app from './app';
import './app.service.loadData.js';
import 'diff/diff.directive.diff';

app.controller('MainController', ['$scope', 'LoadDataService',
    function ($scope, LoadDataService) {
        $scope.compare = {
            baseText: '',
            newText: ''
        };
        $scope.baseTextFile = '';
        $scope.newTextFile = '';
        $scope.baseTextFileErr = '';
        $scope.newTextFileErr = '';

        $scope.loadFiles = () => {
            $scope.baseTextFileErr = $scope.newTextFileErr = '';
            LoadDataService.loadData($scope.baseTextFile, $scope.compare, 'baseText').catch(res => {
                $scope.baseTextFileErr = res.statusText || 'Error';
            });
            var t = LoadDataService.loadData($scope.newTextFile, $scope.compare, 'newText').catch(res => {
                $scope.newTextFileErr = res.statusText || 'Error';
            });
        };
    }]
);
