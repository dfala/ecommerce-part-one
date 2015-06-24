angular.module('ecommerce')

.directive('apiRef', function (apiService, $http) {
	return {
		restrict: 'AE',
		scope: true,
		link: function (scope, elem, attrs) {
			scope.items = [];
			scope.get = function () {
				apiService.get()
				.then(function (response) {
					scope.items = response;
				})
				.catch(function (err) {
					throw new Error(err);
				})
			}
			scope.get();

			scope.put = function (itemId, newQty) {
				var changes = {
					_id: itemId,
					qty: newQty
				}

				apiService.put(changes)
				.then(function (response) {
					console.log('put response on directive:', response);
				})
				.catch(function (err) {
					throw new Error(err);
				})
			}

			scope.post = function (newItem) {
				apiService.post(newItem)
				.then(function (response) {
					console.log('post response on directive:', response);
				})
				.catch(function (err) {
					console.error(err);
					throw new Error(err);
				})
			}

			scope.delete = function (deleteId) {
				apiService.delete(deleteId)
				.then(function (response) {
					console.log('delete response on directive:', response);
				})
				.catch(function (err) {
					throw new Error(err);
				})
			}
		}
	}
});