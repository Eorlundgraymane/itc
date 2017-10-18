<div ng-app = "analyzeApp" ng-controller = "analyzeCtrl" id = "analyzediv" class = "hidden well col-xs-12 col-sm-12 col-lg-12 col-md-12">
  <div class = "row">
    <div class = "btn-group btn-group-lg well col-xs-12 col-sm-12 col-lg-12 col-md-12">
      <button id = "method1button" ng-click = "method1();" type = "button" class = "btn btn-primary">Method 1</button>
      <button ng-click = "method2();" type = "button" class = "btn btn-primary">Method 2</button>
      <button ng-click = "method3();" type = "button" class = "btn btn-primary">Method 3</button>
      <button ng-click = "method4();" type = "button" class = "btn btn-primary">Method 4</button>
    </div>
  </div>
  <div class = "row">
    <div class = "well col-xs-12 col-sm-12 col-lg-12 col-md-12">
      <textarea class = "form-control" rows = "15" id = "inputtext" >{{encoded}}</textarea><br>
    </div>
  </div>
</div>
