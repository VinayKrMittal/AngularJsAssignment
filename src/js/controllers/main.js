//main.js
angular
.module('app')
.controller('loginCtrl',loginCtrl)
.controller('homeCtrl',homeCtrl)
.controller('usersTableCtrl', usersTableCtrl);




loginCtrl.inject = ['$scope','$state','$window','$rootScope'];
function loginCtrl($scope,$state,$window,$rootScope){
  $scope.cred  ={};
  let allUsers = [
    {
      id : 1,
      username: "vinay",
      password : "vinay"

    },
    {
      id:2,
      username : "admin",
      password : "admin"
    }
  ];
  $window.sessionStorage.setItem('allUsers',JSON.stringify(allUsers));

  $scope.onLogin = function(){
      var user  = allUsers.filter(function(obj){
        console.log(JSON.stringify(obj));
        return (obj.username == $scope.cred.username)&&(obj.password == $scope.cred.password) ;

      });
      if(user.length){
        alert("login Successfully");
       $window.sessionStorage.setItem('UserId',user[0].id);

        $state.go('app.main');

      }else{
        alert("Please Enter Valid Username and password");

      }
  }
}


homeCtrl.$inject = ['$scope','$window'];

function homeCtrl($scope,$window){

  $scope.loggedIn = $window.sessionStorage.getItem('UserId');
  $scope.allUsers  =  JSON.parse($window.sessionStorage.getItem('allUsers'));
  //console.log('allUsers'+$scope.allUsers));
  $scope.posts = [
    {
      id:1,
      userId : 1,
      des:`Facebook on Friday revealed that nearly 3 crore accounts on its platform were hit by a data breach and it will personally warn the affected users. However, users can also find out if their account was impacted on Facebook's
                   Help Center page. Is my Facebook account impacted by this security issue? 
                    question appears on it with Yes or No answer.`,
      comments:[
          {
            id :1,
            userId :2,
            des :"Good",
            likes :[
              {
                userId : 1
              }
            ],
            reply:[
              {
                userId :1,
                des :"thanks!!"
              }
            ]
          }


      ]

    },
    {
      id:2,
      userId : 2,
      des:`Congress' Chhattisgarh working President Ramdayal Uike on Saturday joined the BJP in the presence of BJP chief Amit Shah and Chief Minister Raman Singh. Slamming the Congress for neglecting tribals in the state, Uike said, 
        "There is a difference in what they say and what they do."`,
      comments:[
          {
            id:1,
            userId :1,
            des :"Good",
            likes :[
            ],
            reply:[
              {
                userId :2,
                des :"thanks!!"
              }
            ]
          }
      ]

    }
  ];

  $scope.onNewComment= function(postindex){
    let tempObj = {};
     tempObj.userId =  $window.sessionStorage.getItem("UserId");
     tempObj.des = $scope.posts[postindex].newcomment;
     tempObj.id = $scope.posts[postindex].comments.length+1;
     tempObj.likes = [];
     tempObj.reply = []; 
     $scope.posts[postindex].comments.push(tempObj);
     $scope.posts[postindex].newcomment = "";
    }

  $scope.onCommentDelete = function(commentIndex,postindex){
    $scope.posts[postindex].comments.splice(commentIndex,1);
  }

  $scope.onNewReply = function(commentIndex,postindex){
    console.log(`commentIndexis ${commentIndex} postindex is : ${postindex}`);
    let tempObj = {};
    tempObj["userId"] = $scope.loggedIn;
    tempObj["des"] = $scope.posts[postindex].comments[commentIndex].newreply;
    $scope.posts[postindex].comments[commentIndex].reply.push(tempObj);
    $scope.posts[postindex].comments[commentIndex].newreply = "";
  }

/*
  *
  * @return : true when comment liked by user 
  *loggedIn
**/
  $scope.isLikedbyLoggedUser = function(likes){
    //console.log('likes'+JSON.stringify(likes));
    if(likes.length){
      return likes.some(function(obj){
            return obj.userId == $scope.loggedIn;
     })
    }
    else{
        return 0;
      }
    }

  function isAlreadyLiked(allLikes){
      let likedIndex =  -1;
       allLikes.forEach(function(obj,index,self) {
        if(obj.userId == $scope.loggedIn){
              likedIndex = index;
              return;
          }
      });
     return likedIndex;
  }


    /**On Cliked on Like**/
    $scope.onLikedClick = function(commentIndex,postindex,likes){
      let likedBy = isAlreadyLiked(likes);
      console.log('likedIndex'+likedBy);
      if(likedBy != -1){
        $scope.posts[postindex].comments[commentIndex].likes.splice(likedBy,1);
      }else{
        let tempObj = {};
        tempObj["userId"] = $scope.loggedIn;
        $scope.posts[postindex].comments[commentIndex].likes.push(tempObj);
      }
    }

    $scope.validation = function(value){
        if(value&&value.length){
          return 1;
        }
        else{
          alert("Message can't be Empty !!");
          return 0;
        }
    }

  }

usersTableCtrl.$inject = ['$scope', '$timeout'];
function usersTableCtrl($scope, $timeout) {
  $scope.name = 'vinay';
  $scope.users = [
    {
      avatar: '1.jpg',
      status: 'active',
      name: 'Yiorgos Avraamu',
      new: true,
      registered: 'Jan 1, 2015',
      country: 'USA',
      flag: 'us',
      usage: '50',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'mastercard',
      activity: '10 sec ago',
      satisfaction: '48'
    },
    {
      avatar: '2.jpg',
      status: 'busy',
      name: 'Avram Tarasios',
      new: false,
      registered: 'Jan 1, 2015',
      country: 'Brazil',
      flag: 'br',
      usage: '10',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'visa',
      activity: '5 minutes ago',
      satisfaction: '61'
    },
    {
      avatar: '3.jpg',
      status: 'away',
      name: 'Quintin Ed',
      new: true,
      registered: 'Jan 1, 2015',
      country: 'India',
      flag: 'in',
      usage: '74',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'stripe',
      activity: '1 hour ago',
      satisfaction: '33'
    },
    {
      avatar: '4.jpg',
      status: 'offline',
      name: 'Enéas Kwadwo',
      new: true,
      registered: 'Jan 1, 2015',
      country: 'France',
      flag: 'fr',
      usage: '98',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'paypal',
      activity: 'Last month',
      satisfaction: '23'
    },
    {
      avatar: '5.jpg',
      status: 'active',
      name: 'Agapetus Tadeáš',
      new: true,
      registered: 'Jan 1, 2015',
      country: 'Spain',
      flag: 'es',
      usage: '22',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'google',
      activity: 'Last week',
      satisfaction: '78'
    },
    {
      avatar: '6.jpg',
      status: 'busy',
      name: 'Friderik Dávid',
      new: true,
      registered: 'Jan 1, 2015',
      country: 'Poland',
      flag: 'pl',
      usage: '43',
      period: 'Jun 11, 2015 - Jul 10, 2015',
      payment: 'amex',
      activity: 'Yesterday',
      satisfaction: '11'
    }
  ]
}




