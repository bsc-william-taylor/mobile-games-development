
var crypto = require('crypto');
var fs = require('fs');

var object = {
	decrypt: function(text, key){
	  var decipher = crypto.createDecipher('aes-256-ctr', key)
	  var dec = decipher.update(text,'hex','utf8')
	  dec += decipher.final('utf8');
	  return dec;
	},
	
	getConfig: function() {
		var key = process.argv[process.argv.length-2];
		var file = fs.readFileSync("credentials.json", 'utf8');
		var obj = JSON.parse(file.replace(/^\uFEFF/, ''));

		return {
			accessKeyId: object.decrypt(obj.AKI, key),
			secretAccessKey: object.decrypt(obj.SAK, key),
			region: object.decrypt(obj.REG, key)
		};
	}
};

module.exports = object;