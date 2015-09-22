var app = angular.module('app', []);

app.controller('ServiceController',['StatusService','$scope', 'socket', function(StatusService, $scope, socket){
    $scope.services = {};
    $scope.categories = [];
    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };

    $scope.populateCategories = function(data) {
        var categories = [];
        var service;
        for (var i = 0; i < data.length; i++) {
            service = data[i];
            if(categories.indexOf(service.category) == -1) {
                categories.push(service.category);
            }
        };
        $scope.categories = categories;
    }

    $scope.populateServices = function(data) {
        var category;
        for (var i = 0; i < $scope.categories.length; i++) {
            category = $scope.categories[i];
            $scope.services[category] = data.filter(function(service) {return service.category == category;});
        };
    }

    socket.on('statuses', function(statuses){
        console.log(statuses);
        $scope.populateCategories(statuses);
        $scope.populateServices(statuses);
    });

    StatusService.getStatuses().success(function(statuses){
        $scope.populateCategories(statuses);
        $scope.populateServices(statuses);
    });

}]);

app.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
