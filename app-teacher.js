var smartClassApp = angular.module('smartClassTeacherApp', ['ui.router','pascalprecht.translate']);


smartClassApp.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider

		.state('school', {
		    url: "/:schoolId",
		    views: {
		        "noMainNo": {
		            templateUrl: "../../components/school/school.html",
		            controller: "school"
		        }
		    }
		})
		.state('session', {
		    url: '/:school/session',
		    views: {
		        'noMainNo': {
		            templateUrl: '../components/session/session.html',
		            controller: "session"
		        }
		    }

		})
		.state('station', {
		    url: '/:stationId/station',
		    views: {
		        'noMainNo': {
		            templateUrl: '../components/session/sessionTeacher.html',
		            controller: "sessionTeacher"
		        }
		    }

		})
        
});


smartClassApp.controller('preview', ['$scope', 'lessonData','$stateParams',function ($scope, lessonData,$stateParams) {

	$scope.slidesList = lessonData.getLesson;
	$scope.slideIndex = $stateParams.slideIndex-1;

} ]);