// shared/flickr.js

var createJpgPath = function(photos) {
    var i,
            photo,
            photoSrc = [],
            len = photos.length;
    for (i = 0; i < len; i++) {
        photo = photos[i];
        // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
        photoSrc.push("https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg");
    }
    return photoSrc;

};

var myflickrOptions = {
	"url": 'https://api.flickr.com/services/rest/',
	"qs": {
		"method": 'flickr.photos.search', // people.getPublicPhotos
		"format": 'json',
		"nojsoncallback": 1
	},
	"json": true
};

if (typeof module !== "undefined") {
	module.exports.createJpgPath = createJpgPath;
	module.exports.myflickrOptions = myflickrOptions;
}
