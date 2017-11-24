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
          huffContent = sharedContent;
          binContent = sharedContent;
        });
      };
      reader.readAsText(textfile);
  }
  $scope.clear = function(){
    sharedContent = "";
    $scope.content = "";
    $scope.encoded = "";
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
  $scope.huffencode = function(msg,tree,cs){
    var orics = cs;
    console.log(tree);
    if(msg === tree[0]){
      console.log("Found in left first");
      return cs+"0";
    }
    else if(msg === tree[1]){
      console.log("Found in right first");
      return cs+"1";
    }
    else if(cs === orics){
      console.log("Searching for "+msg+" in left child tree \n"+tree[0]);
      if(tree[0].length > 1){
        cs += $scope.huffencode(msg,tree[0],"0");
        console.log(cs);
        if(cs === orics){
          console.log("Searching for "+msg+" in right child tree \n"+tree[1]);
          if(tree[1].length> 1){
            cs += $scope.huffencode(msg,tree[1],"1");
            if(cs !== orics){
              console.log("Found in right recurse");
              return cs;
            }
            else{
              console.log("not found");
              return "";
            }
          }
        }
        else if(cs !== orics){
          console.log("Found in left recurse");
          return cs;
        }
          else{
            console.log("not found");
            return "";
          }
        }
        //Right Side
        else if(tree[1].length > 1){
          cs += $scope.huffencode(msg,tree[1],"1");
          console.log(cs);
          if(cs === orics){
            console.log("Searching for "+msg+" in left child tree \n"+tree[0]);
            if(tree[0].length> 1){
              cs += $scope.huffencode(msg,tree[0],"0");
              if(cs !== orics){
                console.log("Found in right-left recurse");
                return cs;
              }
              else{
                console.log("not found");
                return "";
              }
            }
          }
          else if(cs !== orics){
            console.log("Found in left-right recurse");
            return cs;
          }
            else{
              console.log("not found");
              return "";
            }
        }
        return "";
      }
    }
  $scope.huffman = function(alph,pro,atop,ptop){
    var t0 = performance.now();
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
    hufftree[0] = copyprob[0][1];
    hufftree[1] = copyprob[1][1];
    var hufflength;
    var codestring = "";
    for(hufflength = 0;hufflength <= atop;hufflength++){
      huffcodes[hufflength] = [];
      huffcodes[hufflength][0] = copyalpha[hufflength];
      huffcodes[hufflength][1] = $scope.huffencode(huffcodes[hufflength][0],hufftree,codestring);
    }
    $scope.huffelement = huffcodes;
    var t1 = performance.now();
    $scope.performance = "Time taken by huffman code is "+(t1-t0)+" milliseconds";
    return huffcodes;
  }
  $scope.method1 = function(){
    $scope.encoded = "";
    document.getElementById("performance").classList.remove("yesshow");
      if(huffContent!= ""){
        huffContent = sharedContent;
        var toEncode = "";
        var count = 0;
        //scan characters
        var prob = [];
        var probtop = -1;
        var alpha = [];
        var alphatop = -1;
        for(chara of huffContent){
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
        $scope.mySort(alphatop,prob,alpha);
        var sum = 0;
        for(each of prob){
          sum+=each;
        }
        var temp = 0;
        for(each in prob){
          prob[temp]/=sum;
          temp++;
        }
        sum = 0;
        for(each of prob){
          sum+=each;
        }
        var parsecode;
        parsedContent = "";
        parsecode = $scope.huffman(alpha,prob,alphatop,probtop);
        console.log(parsecode);
        var sharedindex = 0;
        for(each in parsecode){
          huffContent = huffContent.split(parsecode[sharedindex][0]).join(parsecode[sharedindex][1]);
          sharedindex++;
        }
        $scope.encoded = huffContent;
        $scope.performance += " and the data length is now "+huffContent.length+" bits";
        document.getElementById("performance").classList.add("yesshow");
    }
    else{
      $scope.encoded = "";
    }
  }
  $scope.method2 = function(){
    $scope.encoded = "";
    document.getElementById("performance").classList.remove("yesshow");
    $scope.encoded = "";
    $scope.convert = function(str) {
      var t0 = performance.now()
      var output = "";
      var input = str;
      output.value = "";
      for (var i = 0; i < input.length; i++) {
        output += input[i].charCodeAt(0).toString(2);
      }
      var t1 = performance.now()
      $scope.performance = "Time taken to run traditional binary conversion code is "+(t1-t0)+" milliseconds and the data is now a length of "+output.length+" bits";
      document.getElementById("performance").classList.add("yesshow");
      return output;
    }
    $scope.encoded =($scope.convert(binContent));
  }
  $scope.method3 = function(){
    $scope.encoded =("\nMore methods coming soon");
  }
  $scope.method4 = function(){
    $scope.encoded =("\nMore methods coming soon");
  }

});
angular.bootstrap(document.getElementById("analyzediv"), ['analyzeApp']);
