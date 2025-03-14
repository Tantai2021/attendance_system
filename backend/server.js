const express = require('express');
const cors = require('cors');
const app = express();

const sequelize = require('./src/config/database');


const Routes = require("./src/routes/index");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

Routes(app);

sequelize.sync({ force: false }) // `force: true` để reset DB mỗi lần chạy
    .then(() => console.log("Database connected"))
    .catch(err => console.log("DB Error:", err));

app.listen(process.env.PORT || 5000, () => console.log('Server running on port 5000'));
