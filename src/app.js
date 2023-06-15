import "dotenv/config.js"
import { connect } from 'mongoose'
import express from 'express'
import router from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'
import notFoundHander from './middlewares/notFoundHandler.js'
import { engine } from 'express-handlebars'
import { __dirname } from './utils.js'
import Handlebars from 'handlebars'
import navbarData from './middlewares/navbarData.js'
import logger from 'morgan'

const server = express()

//template engine
server.engine('handlebars',engine());
server.set('view engine','handlebars');
server.set('views',__dirname+'/views');

//middlewares
server.use('/public',express.static('public'));
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use('/', router);
server.use(errorHandler);
server.use(notFoundHander);
server.use('/',navbarData);
server.use(logger('dev'));


Handlebars.registerHelper('multiplication', (a, b) => {return a * b})
Handlebars.registerHelper('sum', (a, b) => {return a + b})

// database
connect('mongodb+srv://davriosv:Nym3r14.1108@daviddb.iqw1cpp.mongodb.net/commerce')// requiere minimo un parametro, el link de conexion 
    .then(() =>console.log('database connected'))
    .catch(err=>console.log(err))

export default server