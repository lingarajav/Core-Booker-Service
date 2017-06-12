var Client = require('node-rest-client').Client;
var client = new Client(); 
var baseUrl = "http://localhost:4000";

module.exports = (function() {
	'use strict';
	var booker = {
		bookAppointment : function (request, response) {
			client.get(baseUrl + '/core/api/customer/get?email='+request.body.email, function (customer, res) {
				if (customer._id) {
				    var args = {
				              data: {
				            	  custId : customer._id,
				            	  bookingNo : request.body.bookingNo,
				            	  date : request.body.date,
				            	  serviceStartTime : request.body.serviceStartTime
				              },
				              headers : {    
				                  "Content-Type" : "application/json"    
				              }
					    };
						client.post(baseUrl + '/core/api/appointment/get', args, function (data, res) {
							if (data.length != 1) {
								request.body.custId = customer._id;
								request.body.cardHolderName = customer.cardHolderName;
								addAppointment(request,response);
							}
						}).on('error',function(err){
							console.log('something went wrong on the request', err.request.options);
						});					
				
				} else {
				    var args = {
			              data: request.body,
			              headers : {    
			                  "Content-Type" : "application/json"    
			              }
				    };
					client.post(baseUrl + '/core/api/customer/insert', args, function (customer, res) {
						request.body.custId = customer._id;
						request.body.cardHolderName = null;
						addAppointment(request,response);						
					}).on('error',function(err){
						console.log('something went wrong on the request', err.request.options);
					});			
				}
			}).on('error',function(err){
				console.log('something went wrong on the request', err.request.options);
			});		
		}
	}

	return booker;

})();

function addAppointment(request, response) {
    var args = {
          data: request.body,
          headers : {    
              "Content-Type" : "application/json"    
          }
	};			
	client.post(baseUrl + '/core/api/appointment/insert', args, function (appointment, res) {
		response.send(appointment);
	}).on('error',function(err){
		console.log('something went wrong on the request', err.request.options);
	});
}
