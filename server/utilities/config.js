
const crypto = require('crypto');
const fs = require('fs');

const config = {
  decrypt: function(text, key) {
    const decipher = crypto.createDecipher('aes-256-ctr', key)
    let dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  },

  getConfig: function() {
    const key = process.argv[process.argv.length-1];
    const file = fs.readFileSync("./credentials.json", 'utf8');
    const obj = JSON.parse(file.replace(/^\uFEFF/, ''));

    return {
      accessKeyId: config.decrypt(obj.AKI, key),
      secretAccessKey: config.decrypt(obj.SAK, key),
      region: config.decrypt(obj.REG, key)
    };
  }
};

module.exports = config;
