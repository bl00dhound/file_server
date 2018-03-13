const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');

const app = express();

const { connection } = require('./db/connection');
const { connectURL, database, user, pwd } = require('./config/config').mongo;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    // res.header('WWW-Authenticate', 'Basic realm=Authorization Required');
    // res.header('AuthType', 'Basic')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    // res.header('Access-Control-Allow-Methods, 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // res.header('Access-Control-Allow-Headers', 'Authorization');
    next();
});

app.use(connection(app, `mongodb://${connectURL}/${database}`, {}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/storage', express.static(path.join(__dirname, 'storage'), {dotfiles: 'allow'}));
app.use('/api', require('./routes/api'));
app.use('/files', require('./routes/files'));
app.use('/login', require('./routes/login'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
