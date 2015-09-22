var statusController = require("../controllers/statuses");

module.exports = function(app) {
  
    app.get("/api/statuses", statusController.getStatuses);
    app.post('/api/statuses', statusController.addStatus);
};