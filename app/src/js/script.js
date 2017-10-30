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
    var prob = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    console.log(prob.length);
    var alpha = ['!','Š','+','/','#','{','}','[',']','?','\'','@','*','.','%','\\','=',';',':','(',')','-','_','"',"'",'&',',','\n','\t',' ','0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    console.log(alpha.length);
    for(each of sharedContent){
      var temp = 0;
      for(bet of alpha){
        if(each == bet){
          prob[temp]++;
        }
        temp++;
      }
    }
    var count = 0;
    for(each of prob){
      each/=sharedContent.length;
      prob[count] =  each;
      count++;
    }
    console.log(prob);
    var sum = 0;
    for(each of prob){
      sum+=each;
    }
    console.log("\n"+sum);
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
