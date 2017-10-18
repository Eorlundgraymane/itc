var fileApp = angular.module("fileApp",[]);
fileApp.controller("fileCtrl",function($scope,$http){
  $scope.showContent = function(element){
    $content = "Test";
      var textfile = element.files[0];
      var reader = new FileReader();
      reader.onload = function(e){
        console.log(String(reader.result));
        $scope.$apply(function(){
          $scope.content = String(reader.result);
        });
      };
      reader.readAsText(textfile);
  }
  $scope.analyze = function(){
    alert("Called");
  }
});
