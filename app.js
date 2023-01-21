var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var galeriaRouter = require('./routes/galeria');
var contactoRouter = require('./routes/contacto')

const { send } = require('process');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/galeria', galeriaRouter);
app.use('/contacto', contactoRouter);


//Ejemplos de RUTA
app.get('/prueba', function(req,res){
  res.send('Soy la Pagina de prueba')
})

app.get('/nosotros', function(req,res){
  res.send('Soy la Pagina de nosotros')
})

app.get('/servicios', function(req,res){
  res.send('Soy la Pagina de Servicios')  
})

/*Ejemplo de funcion de llamada individual puede manejar una ruta:
app.get('/ejemplo/aa', function(rep, res){
  res.send('Hello from A!')
})*/

//Ejemplo con NEXT
app.get('/ejemplo/b', function(rep, res, next){
  console.log('The response will be sent by the next function...');
  next();
}, function(req, res){
  res.send('Hello from B!'); 
});



/*--EJEMPLO DE MANEJADOR DE RUT ENCADENABLE PARA VIA DE ACCESO DE RUTA USANDO app.rout()
app.route('/book')
  .get(function(req,res){
    res.send('Conseguí un libro al azar')
  })
  .post(function(req,res){
    res.send('Agregar un libro')
  })
  .put(function(req,res){
    res,send('ACtualizar el libro')
  })

--Esta via de acceso coincidira con solicitud a/random.text
app.get('/random.text', function(req,res){
  res.send('random.text');
})


--APP CON GET
app.get('/', function(req,res){
  res.send( 'GET > Vamos a la Homepage');
})

--APP CON POST
app.post('/', function(req,res){
  res.send( 'POST > Vamos a la Homepage');
})

--APP CON ALL (PASA EL CONTROL AL SIGUIENTE CONTROLADOR)
app.all('/secret', function(req,res,next){
  console.log( 'Accesing the secret section...');
  next();
})


*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
