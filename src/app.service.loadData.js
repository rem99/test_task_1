import app from 'app';

app.service('LoadDataService',  ['$http', function ($http) {
    this.loadData = (url, obj, property) => {
        return $http.get(url)
            .then(response => {
                obj[property] = response.data;
            });
    }
}]);
