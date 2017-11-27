'use strict';

angular.module('csrLookupApp.showCompany', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/showCompany/:id', {
    templateUrl: 'view/showCompany/showCompany.html',
    controller: 'ShowCompanyCtrl'
  });
}])

// Lucas' note to self: read about require.js
.controller('ShowCompanyCtrl', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
  $scope.id = $routeParams.id;

  $http({
    method: 'GET',
    url: 'http://localhost:3000/companies/' + $routeParams.id
  }).then(function successCallback(response) {
    $scope.company = response.data;
    fillWikipediaBox(response.data.wikipedia_name);
  }, function errorCallback(response) {
    // TODO: figure out how to raise a 404 in this case
  });

  $http({
    method: 'GET',
    url: 'http://localhost:3000/companies/' + $routeParams.id + '/evidence_records'
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
            url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&callback=?&page="+companyWikipediaName,
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
                    //infobox[0].attributes['style'] = ''
                    //removing the width style from the result wikipedia infobox;
                    infobox[0].attributes[1].value= '' 
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
       // var wikiData;
        // $http({
            // method: "GET",
            // url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&callback=?&page="+companyWikipediaName
        // }).then(function (reponse) {
                // console.log(reponse.data);
                // wikiData = reponse.data;
                // $("#wikipediaBox").html('');
                // if(wikiData.parse)
                // {
                    // var html = wikiData.parse.text['*'];
                    // var parsedHtml = $.parseHTML( html );
                    // var infobox = $(parsedHtml[0]).find('table.infobox.vcard');
                    // $(infobox).appendTo("#result");
                // }
                // else 
                // {
                    // $("#wikipediaBox").html("This wikipedia page does not exist!");
        // }}
        // ,function (errorMessage) {
        // });
   }
    
}]);
