'use strict';

angular.module('csrLookupApp.searchResults', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/searchResults', {
    templateUrl: 'view/searchResults/searchResults.html',
    controller: 'SearchResultsCtrl'
  });
}])

.controller('SearchResultsCtrl', ['$scope','$http', '$location', function($scope, $http, $location) {
  $scope.initMap = function(){
    $scope.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4
    });
  }
  $scope.getCompanyCoordinates = function(address, callback)
  {
    $http({
      method: 'GET',
      url: "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyAK-O0lnQeifjCHUBjekgYwWhGMERCZays"
    }).then(function successCallback(response) {
      var lat = response.data.results[0].geometry.location.lat;
      var lng = response.data.results[0].geometry.location.lng;
      callback(new google.maps.LatLng(lat, lng));
    }, function errorCallback(response) {
      callback(null);
    });
  }
  $scope.getCompanyAddress = function(wikipedia_name, callback)
  {
    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&callback=?&page="+wikipedia_name,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            if(data.parse)
            {
                var html = data.parse.text['*'];
                var parsedHtml = $.parseHTML( html );
                var infobox = $(parsedHtml[0]).find('table.infobox.vcard');
                var address = infobox.find('th:contains("Headquarters")').next().text();
                callback(address);
            }
            else
            {
                console.log('No wikipedia info!')
                callback(null);
            }
        },
        error: function (errorMessage) {
          callback(null);
        }
    });
  }
  $scope.getCompanyCoordinatesByWikiname = function(company){
    return new Promise(function(resolve, reject){
      $scope.getCompanyAddress(company.wikipedia_name, function(address){
        if(address)
          $scope.getCompanyCoordinates(address, function(coordinates){
            if(coordinates)
            {
              company.coordinates = coordinates;
              resolve(company);
            }
            else resolve();
          });
        else resolve();
      });
    })
  }
  $scope.initMap();
  init();
  function init() {
    $scope.userId = 1;
    var searchWord = $location.search().search_word;
    if(searchWord) {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/companies/users/'+ $scope.userId +'/search/' + searchWord
      }).then(function successCallback(response) {
        $scope.searchResults = response.data;
        if($scope.searchResults && $scope.searchResults.length > 0)
        {
          var promises = [];
          for (var i = 0; i < $scope.searchResults.length; i++) {
            var company = $scope.searchResults[i];
            promises.push($scope.getCompanyCoordinatesByWikiname(company));
          }
          Promise.all(promises).then(function(res){
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < res.length; i++) {
              var company = res[i];
              if(company && company.coordinates){
                var lat = company.coordinates.lat();
                var lng = company.coordinates.lng();
                var position = {lat: lat, lng: lng};
                company.contentSring= `<div class="row" >
                  <div class="col-4">
                    <h3>`+company.name+`</h3>
                    <p id="industry_text">Industry: `+company.industry+`</p>
                  </div>`
                  if(company.user_rated)
                    company.contentSring+=
                    `<div class='ratings-container col-4'  >
                      <div class="star-ratings-sprite">
                        <span style="width:`+company.rating/5*100+`%" class="star-ratings-sprite-rating">
                        </span>
                      </div>
                      +`+Math.round(company.rating*2)/2+`
                    </div>
                    `;
                  else
                  company.contentSring+=
                  `<div class='ratings-container col-4' >
                    <div class="star-ratings-sprite">
                      <span style="width:0%" class="star-ratings-sprite-rating">
                      </span>
                    </div>
                    <span style="color:lightgray" title="Please rate the company first!">Rating hidden</span>
                  </div>
                  `;
                  var resp_score = company.responsibility_score == null? '':Math.round(company.responsibility_score);
                  company.contentSring+=
                  `<div class='ratings-container col-2'>
                    <strong>Responsibilty score:</strong>
                    `+resp_score+`
                  </div>
                </div>`;

                company.marker = new google.maps.Marker({
                  position: position,
                  title: company.name,
                  map: $scope.map
                });
                company.infowindow = new google.maps.InfoWindow({
                    content: company.contentString
                });
                google.maps.event.addListener(company.marker,'click', (function(marker,content,infowindow){
                  return function() {
                      infowindow.setContent(content);
                      infowindow.open($scope.map,marker);
                  };
                })(company.marker,company.contentSring,company.infowindow));
                // company.marker.addListener('click', function() {
                //   company.infowindow.open($scope.map, company.marker);
                // });
                bounds.extend(company.marker.position);
              }
              $scope.map.fitBounds(bounds);
              }

            }, function(err){

          })
        }

        // This callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // Called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }
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
      url: 'http://localhost:3000/companies/' + companyId + '/rate/',
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
