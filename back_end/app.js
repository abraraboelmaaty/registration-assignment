const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")

const authRoutes =require('./routes/auth.routs')
const usersRouter = require('./routes/users.routs')
const employeesRouter = require('./routes/employees.routs')

const connectToDB = require('./config/db')
connectToDB();

const app = express();
 
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth',authRoutes)
app.use('/user',usersRouter)
app.use('/emplyee',employeesRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



module.exports = app;
