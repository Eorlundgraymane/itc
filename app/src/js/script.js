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
    document.getElementById('fileToUpload').value = "";
    document.getElementById('method1button').click();
  }
  $scope.analyze = function(){
    document.getElementById("analyzediv").classList.remove("hidden");
  }
});
var analyzeApp = angular.module("analyzeApp",['fileApp']);
analyzeApp.controller("analyzeCtrl",function($scope){
  $scope.method1 = function(){
    var toEncode = "";
    var count = 0;
    for(var i = 0 ;i < sharedContent.length;i++){
      if(sharedContent.charAt(i)!="" && sharedContent.charAt(i)!="\n"){
        count++;
      }
    }
    if(sharedContent){
      toEncode = "Encoded using Method 1\n\nText file has "+sharedContent.length+" characters\n\n and "+count+" non white space characters \n\n" + sharedContent;
      $scope.encoded = toEncode;
    }
    else {
      $scope.encoded = "";
      document.getElementById("analyzediv").classList.add("hidden");
    }
  }
  $scope.method2 = function(){
    var count = 0;
    var toEncode = "";
    for(var i = 0 ;i < sharedContent.length;i++){
      if(sharedContent.charAt(i)>'A' && sharedContent.charAt(i)<'z'){
        count++;
      }

    if(sharedContent){
      toEncode = "Encoded using Method 2\n\nText file has "+sharedContent.length+" characters\n\n and "+count+" non white space characters \n\n" + sharedContent;
      $scope.encoded = toEncode;
    }
    else {
      $scope.encoded = "";
      document.getElementById("analyzediv").classList.add("hidden");
    }
  }
}
  $scope.method3 = function(){
    var count = 0;
    var toEncode = "";
    for(var i = 0 ;i < sharedContent.length;i++){
      if(sharedContent.charAt(i)!="" && sharedContent.charAt(i)!="\n"){
        count++;
      }

    if(sharedContent){
      toEncode = "Encoded using Method 3\n\nText file has "+sharedContent.length+" characters\n\n and "+count+" non white space characters \n\n" + sharedContent;
      $scope.encoded = toEncode;
    }
    else {
      $scope.encoded = "";
      document.getElementById("analyzediv").classList.add("hidden");
    }
  }
}
  $scope.method4 = function(){
    var count = 0;
    var toEncode = "";
    for(var i = 0 ;i < sharedContent.length;i++){
      if(sharedContent.charAt(i)!="" && sharedContent.charAt(i)!="\n"){
        count++;
      }
      if(sharedContent){
        toEncode = "Encoded using Method 4\n\nText file has "+sharedContent.length+" characters\n\n and "+count+" non white space characters \n\n" + sharedContent;
        $scope.encoded = toEncode;
    }
      else {
        $scope.encoded = "";
        document.getElementById("analyzediv").classList.add("hidden");
      }
    }
  }
});
angular.bootstrap(document.getElementById("analyzediv"), ['analyzeApp']);
