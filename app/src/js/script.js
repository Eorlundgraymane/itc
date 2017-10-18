var sharedContent = "";
var fileApp = angular.module("fileApp",[]);
fileApp.controller("fileCtrl",function($scope,$http){
  $scope.showContent = function(element){
      var textfile = element.files[0];
      var reader = new FileReader();
      reader.onload = function(e){        
        $scope.$apply(function(){
          $scope.content = String(reader.result);
          sharedContent = $scope.content;
        });
      };
      reader.readAsText(textfile);
  }
  $scope.clear = function(){
    sharedContent = "";
    $scope.content = "";
    document.getElementById("analyzediv").classList.add("hidden");
    document.getElementById('method1button').click();
  }
  $scope.analyze = function(){
    document.getElementById("analyzediv").classList.remove("hidden");
  }
});
var analyzeApp = angular.module("analyzeApp",['fileApp']);
analyzeApp.controller("analyzeCtrl",function($scope){
  $scope.method1 = function(){
    if(sharedContent){
      $scope.encoded = "Encoded using Method 1\n" + sharedContent;
    }
    else {
      $scope.encoded = "";
      document.getElementById("analyzediv").classList.add("hidden");
    }
  }
  $scope.method2 = function(){
    if(sharedContent){
      $scope.encoded = "Encoded using Method 2\n" + sharedContent;
    }
    else {
      $scope.encoded = "";
      document.getElementById("analyzediv").classList.add("hidden");
    }
  }
  $scope.method3 = function(){
    if(sharedContent){
      $scope.encoded = "Encoded using Method 3\n" + sharedContent;
    }
    else {
      $scope.encoded = "";
      document.getElementById("analyzediv").classList.add("hidden");
    }
  }
  $scope.method4 = function(){
      if(sharedContent){
      $scope.encoded = "Encoded using Method 4\n" + sharedContent;
    }
    else {
      $scope.encoded = "";
      document.getElementById("analyzediv").classList.add("hidden");
    }
  }
});
angular.bootstrap(document.getElementById("analyzediv"), ['analyzeApp']);
