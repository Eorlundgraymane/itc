<div ng-app = "analyzeApp" ng-controller = "analyzeCtrl" id = "analyzediv" class = "hidden well col-xs-12 col-sm-12 col-lg-12 col-md-12">
  <div class = "row">
    <div class = "btn-group btn-group-lg well col-xs-12 col-sm-12 col-lg-12 col-md-12">
      <button title = "Encode the text file into binary using Huffman encoding scheme" id = "method1button" ng-click = "method1();" type = "button" class = "btn btn-primary">Huffman Encoding</button>
      <button title = "Encode the text file into binary using traditional method" id = "method2button" ng-click = "method2();" type = "button" class = "btn btn-primary">Traditional Binary</button>
      <button title = "More methods coming soon" ng-click = "method3();" type = "button" class = "btn btn-primary">Method 3</button>
      <button title = "More methods coming soon" ng-click = "method4();" type = "button" class = "btn btn-primary">Method 4</button>
    </div>
  </div>
  <div class = "row">
    <div id = "performance" class = "noshow alert alert-success col-xs-12 col-sm-12 col-lg-12 col-md-12">
      {{performance}}
    </div>
</div>
<div class = "row">
  <div class = "well col-xs-12 col-sm-12 col-lg-12 col-md-12">
    <textarea class = "form-control" rows = "10" id = "huffelement" >{{huffelement}}</textarea><br>
  </div>
</div>
  <div class = "row">
    <div class = "well col-xs-12 col-sm-12 col-lg-12 col-md-12">
      <textarea class = "form-control" rows = "15" id = "inputtext" >{{encoded}}</textarea><br>
    </div>
  </div>
