angular.module('egglyApp', [])
  .controller('MainCtrl', function($scope) {
    $scope.categories = [
      {"id":0, "name": "Frontend"},
      {"id":1, "name": "Middleware"},
      {"id":2, "name": "Backend"}
    ];

    $scope.bookmarks = [
      {"id":0, "title":"HTML", "url":"http://www.htmldog.com", "category":"Frontend"},
      {"id":1, "title":"CSS", "url":"http://www.csstutorial.net", "category":"Frontend"},
      {"id":2, "title":"jQuery", "url":"http://jquery.com", "category":"Frontend"},
      {"id":3, "title":"Angular", "url":"http://angularjs.org", "category":"Frontend"},
      {"id":4, "title":"Bootstrap", "url":"http://getbootstrap.com", "category":"Frontend"},
      {"id":5, "title":"Java", "url":"http://www.learnjavaonline.org", "category":"Middleware"},
      {"id":6, "title":"C#", "url":"http://www.codementor.io/learn-c-sharp", "category":"Middleware"},
      {"id":7, "title":"Python", "url":"http://www.python.org", "category":"Middleware"},
      {"id":8, "title":"MY-SQL", "url":"http://www.mysql.com", "category":"Backend"},
      {"id":9, "title":"SAP", "url":"http://www.udemy.com/learn-sap", "category":"Backend"}
    ];

    $scope.currentCategory = null;

    function setCurrentCategory(category) {
      $scope.currentCategory = category;

      $scope.cancelCreating();
      $scope.cancelEditing();
    }
    $scope.setCurrentCategory = setCurrentCategory; // Make the private method public

    function isCurrentCategory(category) {
      return $scope.currentCategory !==null && category.name === $scope.currentCategory.name;
    }
    $scope.isCurrentCategory = isCurrentCategory;


    // Creating and Editing States

    $scope.isCreating = false;
    $scope.isEditing = false;

    function startCreating() {
      $scope.isCreating = true;
      $scope.isEditing = false;

      resetCreateForm();
    }
    $scope.startCreating = startCreating;

    function cancelCreating() {
      $scope.isCreating = false;
    }
    $scope.cancelCreating = cancelCreating;

    function startEditing() {
      $scope.isCreating = false;
      $scope.isEditing = true;
    }
    $scope.startEditing = startEditing;

    function cancelEditing() {
      $scope.isEditing = false;
    }
    $scope.cancelEditing = cancelEditing;

    function shouldShowCreating() {
      return $scope.currentCategory && !$scope.isEditing;
    }
    $scope.shouldShowCreating = shouldShowCreating;

    function shouldShowEditing() {
      return $scope.isEditing && !$scope.isCreating;
    }
    $scope.shouldShowEditing = shouldShowEditing;


    // CRUD

    function resetCreateForm() {
      $scope.newBookmark = {
        title: '',
        url: '',
        category: $scope.currentCategory.name
      }
    }
    $scope.resetCreateForm = resetCreateForm;

    function createBookmark(bookmark) {
      bookmark.id = $scope.bookmarks.length;
      $scope.bookmarks.push(bookmark);

      resetCreateForm();
    }
    $scope.createBookmark = createBookmark;

    $scope.editedBookmark = null;

    function setEditedBookmark(bookmark) {
      $scope.editedBookmark = angular.copy(bookmark);
    }
    $scope.setEditedBookmark = setEditedBookmark;

    function updateBookmark(bookmark) {
      var index = _.findIndex($scope.bookmarks, function(b) {
        return b.id == bookmark.id;
      });
      $scope.bookmarks[index] = bookmark;

      $scope.editedBookmark = null;
      $scope.isEditing = false;
    }
    $scope.updateBookmark = updateBookmark;

    function isSelectedBookmark(bookmarkId) {
      return $scope.editedBookmark!=null && $scope.editedBookmarkId === bookmarkId;
    }
    $scope.isSelectedBookmark = isSelectedBookmark;

    function deleteBookmark(bookmark) {
      _.remove($scope.bookmarks, function(b){
        return b.id == bookmark.id;
      });
    }
    $scope.deleteBookmark = deleteBookmark;
  });
