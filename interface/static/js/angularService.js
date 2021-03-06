app.directive('question', function($window) {
    return {
        restrict: 'E',
        scope: {
            item: '='
        },
        templateUrl: '/templates/result-template.html',
        link: function(scope, elm, attr) {
            window.ds = scope;
            scope.hasAnswered = function(ans) {
                return ans ? "Answered" : "Not Answered";
            }

            scope.parseDate = function(timestamp) {
                date = new Date(timestamp * 1000);
                date = date.toDateString();
                return date.substring(date.indexOf(" "), date.length).trim()
            }

            scope.redirectToUrl = function(item) {
                $window.open(item.link, '_blank');
            }

        }
    }
})

app.service('restApi', function($http, $q) {

    function apiCall(data) {
        let deferred = $q.defer();
        console.log(data);
        $http.post('stack-api/', {'filters': data})
            .then(function(result) {
                deferred.resolve(result);
            }, function(result) {
                deferred.reject(result)
            })

        return deferred.promise;
    }

    return {
        stackApi: apiCall
    }
})