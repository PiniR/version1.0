
smartClassApp.controller('sessionTeacher', ['$scope', '$stateParams', '$location', '$translate', 'classAjax', 'cambiumSyncSocket','lessonData', function ($scope, $stateParams, $location, $translate, classAjax, cambiumSyncSocket,lessonData) {
	
	//set school lang
	$scope.getSchool = classAjax.getdata({ "type": "getSchool", "req": { sid: $stateParams.schoolId} });
    $scope.getSchool.then(
    function (data) {
		
        //console.log(data);
        if (data.res.lang) {
	
            $translate.use(data.res.lang);
        } 
		else {
            
			//$translate.use('en');
        }
    });
	
	
	//cambium Sync init
	$scope.setSocket = cambiumSyncSocket.setSincSocket();//one time only for the whole teacher app
	$scope.mySocket = cambiumSyncSocket.getSocket();
	 
	
   
	$scope.mySocket.on('pupilanswerAllTask', function (data) {
       
        console.log(' pupilanswerAllTask');
       
		cambiumSyncSocket.setAnswersStatus(data.pupil.uid, 'ok_status');
		
		var std = data.pupil.uid;
		if(std ==lessonData.getStudentId()){//is the teacher standing now on this student?
		
			lessonData.requestAnswer(std);
		}
		
     });
	 
	 $scope.mySocket.on('pupilStartAnswerFirstTask', function (data) {
       
        console.log('pupilStartAnswerFirstTask');
		cambiumSyncSocket.setAnswersStatus(data.pupil.uid, 'part_ok_status');		 
     });
	 
    //get user data
    $scope.user = classAjax.getdata({ type: 'getUser', req: {} });
    $scope.user.then(
    	function (data) {
    	 if (data.res.uid == 0) {
    	     location.replace("/teacher/#/" + $stateParams.schoolId);
    	 }
    	    
    	},
    	function (error) {
            location.replace("/teacher/#/" + $stateParams.schoolId);
    	}
    );

} ]);

