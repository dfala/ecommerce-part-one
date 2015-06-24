angular.module('ecommerce')

.factory('apiService', function ($http, $q) {
	var service = {};

	service.get = function () {
		var deferred = $q.defer();

		$http.get('/api/get')
		.then(function (response) {
			deferred.resolve(response.data);
		})
		.catch(function (err) {
			deferred.reject(err);
		})

		return deferred.promise;
	}

	service.put = function (changes) {
		var deferred = $q.defer();

		$http.put('/api/put', changes)
		.then(function (response) {
			console.log('put response on service:', response);
			deferred.resolve(response);
		})
		.catch(function (err) {
			deferred.reject(err);
		})

		return deferred.promise;
	}

	service.post = function (newItem) {
		var deferred = $q.defer();
		var id = Math.round(Math.random() * (99999999999999 - 00000000000001) + 00000000000001);
		var qty = Math.round(Math.random() * (99 - 01) + 01);

		var data = {
			item: newItem
			, qty: qty
		}

		$http.post('/api/post', data)
		.then(function (response) {
			console.log('post response on service:', response);
			deferred.resolve(response);
		})
		.catch(function (err) {
			deferred.reject(err);
		})

		return deferred.promise;
	}

	service.delete = function (deleteId) {
		var deferred = $q.defer();
		
		var url = '/api/delete/' + deleteId;

		$http.delete(url)
		.then(function (response) {
			deferred.resolve(response);
		})
		.catch(function (err) {
			deferred.reject(err);
		})

		return deferred.promise;
	}

	return service;
})