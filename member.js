function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'app/views/skills-member.html',
        controller: function($scope, $http) {
        $http.get('app/data/skills.json').success(function(data) {
            $scope.skills = data;
        });
        }
    };
}
