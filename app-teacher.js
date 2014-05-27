var smartClassApp = angular.module('smartClassTeacherApp', ['ui.router','pascalprecht.translate']);


smartClassApp.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider

		.state('school', {
		    url: "/:schoolId",
		    views: {
		        "main": {
		            templateUrl: "../../components/school/school.html",
		            controller: "school"
		        }
		    }
		})
		.state('session', {
		    url: '/:schoolId/session',
		    views: {
		        'main': {
		            templateUrl: '../components/session/sessionTeacher.html',
		            controller: "sessionTeacher"
		        }
		    }

		})
        
});
