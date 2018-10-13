(function() {
    'use strict';
     angular
     .module('app')
     .factory('userService', userData);

  function userData(){

    function getData(){

        let userData = [
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
        return userData;
    }
    

    return {
          getUserData : getData
      }
  }

 })();
