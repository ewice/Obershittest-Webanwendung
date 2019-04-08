const mongoose = require('mongoose');

const dashboardPosition = mongoose.Schema({
    userId: String,
    dashboard: Array
    
});

module.exports = mongoose.model('DashboardPosition', dashboardPosition);