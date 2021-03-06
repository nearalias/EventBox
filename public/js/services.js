angular.module('services', []).
	service('ndb', function($http, $location) {

		var sendRequest = function(url, type, data, cached) {	
			if (cached == null) {
				cached = false;
			}

			if ($location.absUrl().indexOf("localhost") != -1)
		    	console.log("Send " , type , " response: ", JSON.stringify(data), ' to: ', url, "- cached: ", cached);

			return $http({method: type, url: url, data: data, cache:cached}).
				error(function(data, status, headers, config) {
		            // console.log("error!");
		            // console.log("data", data);
		            throw(data);
				}).then(function(result) {
					if ($location.absUrl().indexOf("localhost") != -1)
		            	console.log("Received response: ", result.data);
		            var returnObj = result.data;
		           	if (returnObj == "no result") {
		           		returnObj = "";
		           	}
		        	return returnObj;
		       	})
		};

		this.addEvent = function(data) {
			return sendRequest('/api/event', 'POST', data);
		}

		this.getEvent = function(event_key) {
			return sendRequest('/api/event?e=' + event_key, 'GET');
		}

		this.updateEvent = function(event, event_key) {
			return sendRequest('/api/event?e=' + event_key, 'PUT', event);
		}

		this.addUser = function(user, event_key) {
			return sendRequest('/api/user?e=' + event_key, 'POST', user);
		}

		//data["selection"], data["poll"], self.request.get('e')
		this.addSelection = function(data, event_key) {
			return sendRequest('/api/selection?e=' + event_key, 'POST', data);
		}

		//date["user"], data["selection"], data["poll"], self.request.get('e')
		this.addVote = function(data, event_key) {
			return sendRequest('/api/vote?e=' + event_key, 'POST', data);
		}

		//date["user"], data["selection"], data["poll"], self.request.get('e')
		this.removeVote = function(data, event_key) {
			return sendRequest('/api/voteDelete?e=' + event_key, 'POST', data);
		}

	});