const attendanceRoutes = require("./attendanceRoutes");
const scheduleRoutes = require("./scheduleRoutes");
const authRoutes = require("./authRoutes");
const studentRoutes = require("./studentRoutes");
const Routes = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/schedules', scheduleRoutes);
    app.use('/api/students', studentRoutes);
}

module.exports = Routes;
