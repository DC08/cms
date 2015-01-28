var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

server.route({
   method: 'GET',
   path:'/{param*}',
   handler: {
       directory: {
           path: "public",
           listing: true,
           index: false
       }
   }
   
});

server.route({
   method: 'GET',
   path:'/shared/{param*}',
   handler: {
       directory: {
           path: "shared",
           listing: true,
           index: false
       }
   }
   
});

// Add the route
server.route({
    method: 'GET',
    path:'/flickr', 
    handler: function (request, reply) {
		var credentials = require('./shared/credentials.js'),
		flickrLib = require('./shared/flickr.js'),
			httpRequest = require('request'),
			flickr = {
				"url": 'https://api.flickr.com/services/rest/',
				"qs": {
					"method": 'flickr.photos.search',
					"api_key": credentials.flickr.api_key,
					"tags": 'seabus',
					"format": 'json',
					"nojsoncallback": 1
				},
				"json": true
			};
		httpRequest(flickr, function (error, incomingMessage, response) {
			if (!error && incomingMessage.statusCode === 200) {
				var photoSrc = flickrLib.createJpgPath(response.photos.photo);
                                // To-do in class: output html images
				reply(); // Browser Output
			}
		});
    }
});

server.route({
    method: 'GET',
    path:'/myflickr', 
    handler: function (request, reply) {
		var credentials = require('./shared/credentials.js'),
			flickrLib = require('./shared/flickr.js'),
			httpRequest = require('request');
		flickrLib.myflickrOptions.qs.api_key = credentials.flickr.api_key;
		flickrLib.myflickrOptions.qs.user_id = credentials.flickr.user_id;
		
		httpRequest(flickr.Options, function (error, incomingMessage, response) {
			if (!error && incomingMessage.statusCode === 200) {
				var html = '';
					photoSrc = flickrLib.createJpgPath(response.photos.photo);
				for (var i = 0, len = photoSrc.length; i < len; i++) {
					html += "<img src='" + photoSrc[i] + "'>";
				}
				reply(html); // Complete browser output
			}
		});
    }
});


server.route({
    method: 'GET',
    path:'/google', 
    handler: function (request, reply) {
		var httpRequest = require('request');
		httpRequest('http://www.google.com', function (error, response, body) {
			if (!error && response.statusCode === 200) {
				reply(body); // Browser output // Show the HTML for the Google homepage.
				console.log("Command window");
			}
		});
    }
});

// Start the server
server.start(function () {
	console.log('Server running at ' + server.info.uri);
});