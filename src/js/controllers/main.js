//main.js
angular
.module('app')
.controller('loginCtrl',loginCtrl)
.controller('homeCtrl',homeCtrl);




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

  $scope.logout = function(){
    $window.sessionStorage.setItem('UserId',"");
    $state.go('appSimple.login');
    //alert('Logout Successfully');

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
      des:`Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
      Nullam lectus justo, vulputate eget mollis sed, tempor sed magna.
       Nulla pulvinar eleifend sem. Aenean id metus id velit ullamcorper pulvinar.
        Integer vulputate sem a nibh rutrum consequat. Vivamus porttitor turpis ac leo.
         Integer malesuada. Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante. 
      Phasellus et lorem id felis nonummy placerat.`,
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
      des:`Praesent in mauris eu tortor porttitor accumsan. Nunc tincidunt ante vitae massa.
       Quisque porta. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
       mollit anim id est laborum. Nullam faucibus mi quis velit. Duis bibendum, lectus ut viverra rhoncus, 
       dolor nunc faucibus libero, eget facilisis enim ipsum id lacus.
       Duis pulvinar.Fusce tellus odio, dapibus id fermentum quis, suscipit id erat.`,
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
  *@param: array of likes on comment
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

    // check if string is empty or not
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






