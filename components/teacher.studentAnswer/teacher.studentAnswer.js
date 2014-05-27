smartClassApp.controller('studentAnswer', ['$scope', 'lessonData', function ($scope, lessonData) {
    $scope.studentId = lessonData.getStudentId;

    $scope.$on("togleStatusTable", function (e, arg) {

        $scope.open = arg;
        $scope.$apply();

    });
} ]);
