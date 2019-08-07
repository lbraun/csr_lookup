'use strict';

angular.module('csrLookupApp.showCompany', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/showCompany/:id', {
    templateUrl: 'view/showCompany/showCompany.html',
    controller: 'ShowCompanyCtrl'
  });
}])

.controller('ShowCompanyCtrl', ['$http', '$scope', '$routeParams', '__env', function($http, $scope, $routeParams, __env) {
  $scope.id = $routeParams.id;

  $scope.userId = 1;

  $http({
    method: 'GET',
    url: __env.apiUrl + '/api/companies/' + $routeParams.id
  }).then(function successCallback(response) {
    $scope.company = response.data;
    fillWikipediaBox(response.data.wikipedia_name);
  }, function errorCallback(response) {
    // TODO: figure out how to raise a 404 in this case
  });

  $http({
    method: 'GET',
    url: __env.apiUrl + '/api/rating_records/' + $scope.userId + '/' + $routeParams.id
  }).then(function successCallback(response) {
    $scope.company.user_rated = response.data != '';
  }, function errorCallback(response) {
    // TODO: figure out how to raise a 404 in this case
  });

  $http({
    method: 'GET',
    url: __env.apiUrl + '/api/companies/' + $routeParams.id + '/evidence_records'
  }).then(function successCallback(response) {
    $scope.evidence_records = response.data;
  }, function errorCallback(response) {
    $scope.evidence_records = null
  });

   function fillWikipediaBox(companyWikipediaName)
   {
       var wikiData;
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&callback=?&page="+companyWikipediaName,
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                wikiData = data;
                $("#wikipediaBox").html('');
                if(wikiData.parse)
                {
                    var html = wikiData.parse.text['*'];
                    var parsedHtml = $.parseHTML( html );
                    var infobox = $(parsedHtml[0]).find('table.infobox.vcard');
                    //removing the width style from the result wikipedia infobox;
                    //moved this styleing in app.css width: 100%!important;
                    // infobox[0].attributes[1].value= ''
                    $(infobox).appendTo("#wikipediaBox");
                }
                else
                {
                    $("#wikipediaBox").html("This wikipedia page does not exist!");
                }
            },
            error: function (errorMessage) {
            }
        });
   }

   $scope.rating_mousemove = function(event){
     event.currentTarget.children[0].style.width = event.offsetX/event.currentTarget.offsetWidth * 100  + "%";
   }
   $scope.rating_mouseleave = function(event){
     var company = angular.element(event.currentTarget).scope().company;
     var rated = company.user_rated;
     var rating = company.rating;
     if(rated)
       event.currentTarget.children[0].style.width = rating/5 * 100  + "%";
     else event.currentTarget.children[0].style.width = "0%";
   }
   $scope.rating_click = function(event) {
     var rating = event.offsetX/event.currentTarget.offsetWidth * 5;
     //round to .5
     rating = Math.round(rating*2)/2;
     var company =  angular.element(event.currentTarget).scope().company;
     var rated = company.user_rated;
     var companyId = company.id;
     $http({
       method: 'POST',
       url: __env.apiUrl + '/api/companies/' + companyId + '/rate/',
       headers: {
         'Content-Type': 'application/json'
       },
       data: {
         userId: $scope.userId,
         rated: rated,
         rating: rating
       }
     }).then(function successCallback(response) {
       company.rating = response.data;
       company.user_rated = true;
     }, function errorCallback(response) {
       // TODO: figure out how to raise a 404 in this case
     });
   }
}]);
