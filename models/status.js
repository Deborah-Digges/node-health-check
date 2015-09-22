var db = require('../config/db');

var status = db.model('status', {
      service: { 
        type: String, 
        required: true},

      url: {
        type: String,
        required: true
      },

      status:  { 
        type: Boolean,
        required: true,
        default: true 
      },

      category: {
        type: String,
        required: true
      },

      pointofcontact:  {
       type: String, 
       required: true 
     },

      uptime:   { 
        type:String,
        required:true,
        default: ""
      },

      timestamp: {
        type: String,
        required: false,
        default: ""
      }
});

module.exports = status;
