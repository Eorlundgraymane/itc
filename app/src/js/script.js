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
  $scope.mySort = function(atop,pro,alph){
    //My Sort
    var bubbleo = 0;
    var bubblei = 0;
    for(bubbleo = 0; bubbleo <= atop; bubbleo++){
      for(bubblei = 0; bubblei <= atop; bubblei++){
        if(pro[bubblei][0] < pro[bubbleo][0]){
          var temp;
          temp =  pro[bubbleo];
          pro[bubbleo] = pro[bubblei]
          pro[bubblei] = temp;
          temp = alph[bubbleo];
          alph[bubbleo] = alph[bubblei];
          alph[bubblei] = temp;
        }
      }
    }
    console.log("sorted");
    //My Sort End
  }
  $scope.myHuffSort = function(hc,pto,pro){
    //My Sort
    var hs = 0;
    var bubbleo = 0;
    var bubblei = 0;
    var tracked = 0;
    for(bubbleo = 0; bubbleo <= pto; bubbleo++){
      for(bubblei = 0; bubblei <= pto; bubblei++){
        if(pro[bubblei] < pro[bubbleo]){
          if(bubblei == pto && tracked == 0){
              hs = bubbleo;
              tracked = 1;
          }
          else if(bubbleo == pto && tracked == 0){
            hs = bubblei;
            tracked = 1;
          }
          pro[bubblei]+= pro[bubbleo];
          pro[bubbleo]= pro[bubblei] - pro[bubbleo];
          pro[bubblei]-= pro[bubbleo];
          hc[bubblei]+= hc[bubbleo];
          hc[bubbleo]= hc[bubblei] - hc[bubbleo];
          hc[bubblei]-= hc[bubbleo];
        }
      }
    }
    console.log("sorted");
    return hs;
    //My Sort End
  }
  $scope.huffencode = function(msg,tree){
    if(tree!= void 0){
      if(msg == tree){
        return true;
      }
      else if($scope.huffencode(msg,tree[0])){
        return true;
      }
      else if($scope.huffencode(msg,tree[1])){
        return true;
      }
    }
    else{
      return false;
    }
  }
  $scope.huffman = function(alph,pro,atop,ptop){
    var temp = 0;
    var huffcodes = [];
    var hufftree = [];
    var copyalpha = alph;
    var copyptop = ptop;
    var copyprob = [];
    for(temp = 0;temp<=copyptop;temp++){
      copyprob[temp] = [];
      copyprob[temp][0] = pro[temp];
      copyprob[temp][1] = copyalpha[temp];
    }
    var copyatop = atop;
    temp = copyptop;
    console.log(copyprob[0]);
    console.log(copyprob[copyptop]);
    while(temp>1){
      var treetemp;
      copyprob[temp-1][0]+=copyprob[temp][0];
      treetemp = copyprob[temp-1][1];
      copyprob[temp-1][1] = [];
      copyprob[temp-1][1][0] = treetemp;
      copyprob[temp-1][1][1] = copyprob[temp][1]
      temp--;
      $scope.mySort(temp,copyprob,copyalpha);
    }
    hufftree[0] = copyprob[0];
    hufftree[1] = copyprob[1];
    console.log(hufftree);
    var hufflength;
    for(hufflength = 0;hufflength <= atop;hufflength++){
      huffcodes[hufflength] = [];
      huffcodes[hufflength][0] = copyalpha[hufflength];
      huffcodes[hufflength][1] = $scope.huffencode(huffcodes[hufflength][0],hufftree);
    }
    console.log(huffcodes);
  }
  $scope.method1 = function(){
      if(sharedContent!= ""){
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
      var t0 = performance.now();
      $scope.mySort(alphatop,prob,alpha);
      var t1 = performance.now();

      console.log(t1 - t0 +' milliseconds');
      $scope.encoded = ("\n"+alphatop+" characters found in text file");
      $scope.encoded +=("\nCharacters found are\n "+alpha);
      $scope.encoded +=("\nOccurences of these characters are\n "+prob);
      var sum = 0;
      for(each of prob){
        sum+=each;
      }
      $scope.encoded +=("\nTotal number of characters in text are \n"+sum);
      var temp = 0;
      for(each in prob){
        prob[temp]/=sum;
        temp++;
      }
      $scope.encoded +=("\nCorresponding probabilities of each character in file are\n"+prob);
      sum = 0;
      for(each of prob){
        sum+=each;
      }
      $scope.encoded +=("\nSum of all probabilities add up to (tolerance of rounding in computer calculations)\n"+sum);
      $scope.huffman(alpha,prob,alphatop,probtop);
    }
    else{
      $scope.encoded = "";
    }
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
