<div class = "row">
  <div class = "col-xs-12 col-md-12 col-sm-12 col-lg-12" id = "fileDiv" ng-app = "fileApp" ng-controller = "fileCtrl">
    <input id = "fileToUpload" class = " well btn btn-default" ng-model = "text" onchange="angular.element(this).scope().showContent(this)" type = "file" accept = "text/*">
    <div ng-if = "content" class = "well form-group col-xs-12 col-lg-12 col-md-12 col-sm-12">
      <label for = "inputtext">File content is :</label>
        <textarea class = "form-control" rows = "15" id = "inputtext" >{{content}}</textarea><br>
        <button title = "Prepare the file for analysis"  type = "button" class = "btn btn-primary" ng-click = "analyze();">Analyze</button>
        <button title = "Clear the contents" type = "button" class = "btn btn-primary" ng-click = "clear();">Clear</button>
    </div>
  </div>
</div>
