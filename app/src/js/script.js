var sharedContent = "";
var fileApp = angular.module("fileApp",[]);
fileApp.controller("fileCtrl",function($scope,$http){
  $scope.showContent = function(element){
      var textfile = element.files[0];
      var reader = new FileReader();
      reader.onload = function(e){
        console.log(String(reader.result));
        $scope.$apply(function(){
          $scope.content = String(reader.result);
          sharedContent = $scope.content;
        });
      };
      reader.readAsText(textfile);
  }
  $scope.analyze = function(){
    document.getElementById("analyzediv").classList.remove("hidden");
  }
});
var analyzeApp = angular.module("analyzeApp",['fileApp']);
analyzeApp.controller("analyzeCtrl",function($scope){
  $scope.method1 = function(){
    $scope.encoded = "Encoded using Method 1\n" + sharedContent;
  }
  $scope.method2 = function(){
    $scope.encoded = "Encoded using Method 2\n" + sharedContent;
  }
  $scope.method3 = function(){
    $scope.encoded = "Encoded using Method 3\n" + sharedContent;
  }
  $scope.method4 = function(){
    $scope.encoded = "Encoded using Method 4\n" + sharedContent;
  }
});
angular.bootstrap(document.getElementById("analyzediv"), ['analyzeApp']);
