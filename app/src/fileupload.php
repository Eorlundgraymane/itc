<div id = "fileDiv" ng-app = "fileApp" ng-controller = "fileCtrl">
  <input class = "btn btn-default" ng-model = "text" onchange="angular.element(this).scope().showContent(this)" type = "file" accept = "text/*">
  <div ng-if = "content" class = "form-group col-xs-12 col-lg-12 col-md-12 col-sm-12">
    <label for = "inputtext">File content is :</label>
      <textarea class = "form-control" rows = "15" id = "inputtext" >{{content}}</textarea>
      <button type = "button" class = "btn btn-default" ng-click = "analyze();">Analyze</button>
  </div>
</div>
