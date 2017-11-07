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
  //search and find function
  $scope.search = function(c,ar,b){
    var l = ar.length;
    var i = 0;
    for(i;i<l;i++){
      if(ar[i] == c){
        if(b==0){
          return true;
        }
        else if(b==1){
          return i;
        }
      }
    }
    return false;
  };
  $scope.method1 = function(){
    var toEncode = "";
    var count = 0;
    //scan characters
    var prob = [];
    var probtop = -1;
    var alpha = [];
    var alphatop = -1;
    for(chara of sharedContent){
      if(!$scope.search(chara,alpha,0)){
        alphatop++;
        probtop++;
        alpha[alphatop] = chara;
        prob[probtop] = 0;
      }
      else{
        prob[$scope.search(chara,alpha,1)]++;
      }
    }
    console.log(alpha);
    console.log(prob);
    var sum = 0;
    for(each of prob){
      sum+=each;
    }
    console.log(sum);
    var temp = 0;
    for(each in prob){
      prob[temp]/=sum;
      temp++;
    }
    console.log(prob);
    sum = 0;
    for(each of prob){
      sum+=each;
    }
    console.log(sum);
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
