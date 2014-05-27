
smartClassApp.controller('session', ['$scope', '$stateParams', '$translate', '$location', '$state', 'classAjax', 'cambiumSyncSocket', 'slideData', function ($scope, $stateParams, $translate, $location, $state, classAjax, cambiumSyncSocket, slideData) {
    $scope.data = {
        title: "Tfila"
    };



    //set school lang
    $scope.getSchool = classAjax.getdata({ "type": "getSchool", "req": { sid: $stateParams.schoolId} });
    $scope.getSchool.then(
    function (data) {

        //console.log(data);
        if (data.res.lang) {

            $translate.use(data.res.lang);
        }
        else {

            $translate.use('en');
        }
    });




    var sId = $stateParams.schoolId;
    //get user data
    $scope.user = classAjax.getdata({ type: 'getUser', req: {} });
    $scope.user.then(
    	function (data) {
    	    if (data.res) {
    	        console.log('user');
    	        console.log(data);
    	        $scope.data.user = data.res.userName;
    	        userId = data.res.uid;
    	        if (userId != 0) {
    	            //set cambium cync    	    
    	            $scope.setSocket = cambiumSyncSocket.setSincSocket();
    	            $scope.mySocket = cambiumSyncSocket.getSocket();

    	            //switchSlide event -> change slide
    	            $scope.mySocket.on('switchSlide', function (data) {    	                
    	                $scope.showBlack = false;
    	                $state.go("session.lesson.slide", { lessonId: data.lesson.lid, slideIndex: data.slide.index });
    	                slideData.setActiveSlideAtLesson(data.lesson.lid, data.slide.index);
    	            });


    	            //showData event -> teacher display answer -> show in student display
    	            $scope.mySocket.on('showData', function (data) {
						
						console.log(data.data);
						slideData.setAnswersFromTeacher(data.data);
    	                
    	            });

    	            //showData event -> teacher display answer -> show in student display
    	            $scope.mySocket.on('unActiveLesson', function (data) {
    	               
    	                console.log(data);
    	                $scope.showBlack = true;
    	                $scope.$apply();
    	                //To do: updata answer from teacher.
    	            });

    	        }
    	        else { //user is not login
    	            location.replace("/student/#/" + sId);
    	        }
    	    }
    	},
    	function (error) {
    	    location.replace("/student/#/" + sId);
    	}
    );

    $scope.activeClass = classAjax.getdata({ type: 'getActivelesson', req: {} });
    $scope.activeClass.then(
        function (data) {
            if (data.res != null) {
                console.log('active');
                console.log(data);
                //$scope.showBlack=true;
               
                if(data.res.activeData){
                    slideData.setDipslayAnsOnLoad(data.res.activeData);
                }
                slideData.setActiveSlideAtLesson(data.res.lid, data.res.slide.index);
                $state.go("session.lesson.slide", { lessonId: data.res.lid, slideIndex: data.res.slide.index });
            } else {
                $scope.showBlack = true;
            }
        },
        function (error) {
            console.log(error);
        }
    );

    $scope.logout = function () {
        $scope.logoutFunc = classAjax.getdata({ type: 'logout', req: {} });
        $scope.logoutFunc.then(function (data) {
            location.replace("/student/#/" + $stateParams.schoolId);
        },
        function (error) {
            alert(error);
        });
    }
} ]);

