var express = require('express');
var path = require('path');
var router = express.Router();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes');
var index = require('./routes/index');
var mysql = require('mysql');
var connection  = require('express-myconnection'); 
//var router = express.Router();
var session;
var app = express();
app.set('view engine', 'ejs');
//path
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//connection Db
app.use(
    
    connection(mysql,{
        
        host: 'localhost', //'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'simac'

    },'pool') //or single

);


//session
app.use(session({
    secret:'askfhla09013*&*afdajfa#',
    resave:false,
    saveUninitialized:true
}));
//main APP//
app.get('/', index.home);
app.get('/sign-up/add', index.signup);
app.get('/admin', index.admin);
app.post('/sign-up/add', index.savesignup);
app.post('/admin', index.session);
app.get('/redirects', index.redirects);
app.get('/homeAdmin', index.homeAdmin);
//-------------------------------------------------------------//

//kegiatan

app.get('/kegiatan', index.kegiatan);
app.post('/kegiatan/add', index.savekomentar);
//------------------------------------------------------------//

//profil

app.get('/profil', index.profil);
app.post('/profil/add', index.savekomentarprofil);
//-----------------------------------------------------------//
//userprofile//
app.get('/userprofile', index.userprofile);
app.get('/edituserprofile/edit/:id', index.edit_userprofile);
app.post('/edituserprofile/edit/:id', index.save_edit_userprofile);
app.get('/edituserprofile/delete/:id', index.delete_userprofile);
//--------------------------------------------------------------//

//dataMasjid//
app.get('/dataMasjidAdmin', index.datamasjidAdmin);
app.post('/dataMasjidAdmin/add', index.save_datamasjidAdmin);
app.get('/edit_dataMasjidAdmin/edit/:id', index.edit_datamasjidAdmin);
app.post('/edit_dataMasjidAdmin/edit/:id', index.save_edit_datamasjidAdmin);
app.get('/edit_dataMasjidAdmin/delete/:id', index.delete_datamasjidAdmin);
//--------------------------------------------------------------//

//dataKegiatan
app.get('/dataKegiatanAdmin', index.datakegiatanAdmin);
app.post('/dataKegiatanAdmin/add', index.save_datakegiatanAdmin);
app.get('/edit_dataKegiatanAdmin/edit/:id', index.edit_datakegiatanAdmin);
app.post('/edit_dataKegiatanAdmin/edit/:id', index.save_edit_datakegiatanAdmin);
app.get('/edit_dataKegiatanAdmin/delete/:id', index.delete_datakegiatanAdmin);
//--------------------------------------------------------------//

//dataPengurus
app.get('/dataPengurusAdmin', index.datapengurusAdmin);
app.post('/dataPengurusAdmin/add', index.save_datapengurusAdmin);
app.get('/edit_dataPengurusAdmin/edit/:id', index.edit_datapengurusAdmin);
app.post('/edit_dataPengurusAdmin/edit/:id', index.save_edit_datapengurusAdmin);
app.get('/edit_dataPengurusAdmin/delete/:id', index.delete_datapengurusAdmin);
//-------------------------------------------------------------//
app.get('/logout', index.logout);
app.get('*', index.notFound);
app.listen('3000', index.listen);


module.exports = app;
module.exports = routes;
