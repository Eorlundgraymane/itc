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
        prob[probtop] = 1;
      }
      else{
        prob[$scope.search(chara,alpha,1)]++;
      }
    }
    console.log(alpha);
    $scope.encoded = ("\n"+alphatop+" characters found in text file");
    $scope.encoded +=("\nCharacters found are\n "+alpha);
    console.log(prob);
    $scope.encoded +=("\nOccurences of these characters are\n "+prob);
    var sum = 0;
    for(each of prob){
      sum+=each;
    }
    console.log(sum);
    $scope.encoded +=("\nTotal number of characters in text are \n"+sum);
    var temp = 0;
    for(each in prob){
      prob[temp]/=sum;
      temp++;
    }
    console.log(prob);
    $scope.encoded +=("\nCorresponding probabilities of each character in file are\n"+prob);
    sum = 0;
    for(each of prob){
      sum+=each;
    }
    console.log(sum);
    $scope.encoded +=("\nSum of all probabilities add up to (tolerance of rounding in computer calculations)\n"+sum);
  }
  $scope.method2 = function(){
    $scope.encoded =("\nMore methods coming soon");
  }
  $scope.method3 = function(){
    $scope.encoded =("\nMore methods coming soon");
  }
  $scope.method4 = function(){
    $scope.encoded =("\nMore methods coming soon");
  }
});
angular.bootstrap(document.getElementById("analyzediv"), ['analyzeApp']);
