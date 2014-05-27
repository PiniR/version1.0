
smartClassApp.controller('school', ['$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {
    //replace("login",{schooleId:$stateParams.schooleId})
    location.replace("login/#/" + $stateParams.schoolId + "/login");

} ]);

