var express = require('express');
//var router = express.Router();
var mysql = require('mysql');
var app = express();
//var json = require('res-json');
var session = require('express-session');


exports.home = function(req, res){
    res.render('home', {
        title: "Sistem Informasi Mesjid Cibiru"
    });
};

//komentar

exports.komentarList = function(req, res){
     req.getConnection(function(err, connection){

        var query = connection.query("SELECT * FROM komentar", function(err, rows){

            if(err)
                console.log("Error Selecting : %s ", err);

            res.render('komentar', {
                title: 'Komentar List',
                page_title: "Komentar List", data:rows
            });
        });
    });
};

exports.delete_komentarList = function(req, res){

    var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM komentar  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/komentar');
             
        });
        
     });
};

//------------------------------------------------------//

//profile

exports.profil = function(req, res,next){
     // res.render('profil', {title: "Profil | SIMAC"});
     req.getConnection(function(err, connection){

        var query = connection.query("SELECT * FROM data_masjid", function(err, rows){

            if(err)
                console.log("Error Selecting : %s ", err);

            res.render('profil', {
                title: 'Profile Masjid',
                page_title: "Profile Masjid", data:rows
            });
        });
    });
};

exports.savekomentarprofil = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function(err, connection){

        var data = {

            nama        : input.nama,
            email       : input.email,
            komentar    : input.komentar
        };

        var query = connection.query("INSERT INTO komentar set ?", data, function(err, rows){

            if(err)
                console.log("Error Instering : %s", err);
            res.redirect('/profil');
        });
    });
};
//---------------------------------------------------------------------------------//

//kegiatan

exports.kegiatan = function(req, res,next){
    // res.render('kegiatan', {title: "Kegiatan | SIMAC"});
    req.getConnection(function(err, connection){

        var query = connection.query("SELECT * FROM data_kegiatan", function(err, rows){

            if(err)
                console.log("Error Selecting : %s ", err);

            res.render('kegiatan', {
                title: 'Kegiatan Masjid',
                page_title: "Kegiatan Masjid", data:rows
            });
        });
    });
};

exports.savekomentar = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function(err, connection){

        var data = {

            nama        : input.nama,
            email       : input.email,
            komentar    : input.komentar
        };

        var query = connection.query("INSERT INTO komentar set ?", data, function(err, rows){

            if(err)
                console.log("Error Instering : %s", err);
            res.redirect('/kegiatan');
        });
    });
};

//-----------------------------------------------------------------------------//


exports.signup = function(req, res){
    res.render('sign-up', { title: 'Sign Up | SIMAC' });

};

exports.savesignup = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function(err, connection){

        var data = {

            username     : input.username,
            password     : input.password,
            email        : input.email,
            no_telepon    : input.no_telepon
        };

        var query = connection.query("INSERT INTO users set ?", data, function(err, rows){

            if(err)
                console.log("Error Instering : %s", err);
            res.redirect('/');
        });
    });
};

exports.admin = function(req, res, next){
    res.render('admin', { title: 'Login Admin | SIMAC' });
};

exports.homeAdmin = function(req, res, next){
    res.render('homeAdmin', { title: 'Home Admin | SIMAC' });
};

//userprofile-------------------------------------------------------------------
exports.userprofile = function(req, res){

    req.getConnection(function(err, connection){

        var query = connection.query("SELECT * FROM users", function(err, rows){

            if(err)
                console.log("Error Selecting : %s ", err);

            res.render('userprofile', {
                title: 'Profile User',
                page_title: "Profile User", data:rows
            });
        });
    });
};

exports.edit_userprofile = function(req, res){
    
    var id = req.params.id;
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM users',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edituserprofile',{
                title : 'Edit User Profile',
                page_title:"Edit User Profile",data:rows
            });
                
           
         });
    }); 
};

exports.save_edit_userprofile = function(req, res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            username     : input.username,
            password     : input.password,
            email        : input.email,
            no_telepon   : input.no_telepon
        
        };
        
        connection.query("UPDATE users set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/userprofile');
          
        });
    
    });
};

exports.delete_userprofile = function(req, res){

    var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM users  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/userprofile');
             
        });
        
     });
};
//--------------------------------------------------------------------------------------------//

//dataMasjidAdmin

exports.datamasjidAdmin = function(req, res,next){
     req.getConnection(function(err, connection){

        var query = connection.query("SELECT * FROM data_masjid", function(err, rows){

            if(err)
                console.log("Error Selecting : %s ", err);

            res.render('dataMasjidAdmin', {
                title: 'Data Masjid | SIMAC',
                page_title: "Data Masjid | SIMAC", data:rows
            });
        });
    });
};


exports.save_datamasjidAdmin = function(req, res){

 var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function(err, connection){

        var data = {

            nama_masjid : input.nama_masjid,
            alamat_masjid : input.alamat_masjid,
            no_telpon : input.no_telpon
        };

        var query = connection.query("INSERT INTO data_masjid set ?", data, function(err, rows){

            if(err)
                console.log("Error Instering : %s", err);
            res.redirect('/dataMasjidAdmin');
        });
    });

};

exports.edit_datamasjidAdmin = function(req, res){
    
    var id = req.params.id;
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM data_masjid',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_dataMasjidAdmin',{
                title : 'Edit Data Masjid',
                page_title:"Edit Data Masjid",data:rows
            });
                
           
         });
    }); 
};

exports.save_edit_datamasjidAdmin = function(req, res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            nama_masjid : input.nama_masjid,
            alamat_masjid : input.alamat_masjid,
            no_telpon : input.no_telpon
        
        };
        
        connection.query("UPDATE data_masjid set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/dataMasjidAdmin');
          
        });
    
    });
};

exports.delete_datamasjidAdmin = function(req, res){

    var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM data_masjid  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/dataMasjidAdmin');
             
        });
        
     });
};

//-----------------------------------------------------------------------------------------//

//Data Kegiatan

exports.datakegiatanAdmin = function(req, res,next){
     req.getConnection(function(err, connection){

        var query = connection.query("SELECT * FROM data_kegiatan", function(err, rows){

            if(err)
                console.log("Error Selecting : %s ", err);

            res.render('dataKegiatanAdmin', {
                title: 'Data Masjid | SIMAC',
                page_title: "Data Masjid | SIMAC", data:rows
            });
        });
    });
};


exports.save_datakegiatanAdmin = function(req, res){

 var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function(err, connection){

        var data = {

            nama_kegiatan : input.nama_kegiatan,
            jenis_kegiatan : input.jenis_kegiatan,
            type_kegiatan : input.type_kegiatan,
            pengisi_kegiatan : input.pengisi_kegiatan
        };

        var query = connection.query("INSERT INTO data_kegiatan set ?", data, function(err, rows){

            if(err)
                console.log("Error Instering : %s", err);
            res.redirect('/dataKegiatanAdmin');
        });
    });

};

exports.edit_datakegiatanAdmin = function(req, res){
    
    var id = req.params.id;
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM data_kegiatan',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_dataKegiatanAdmin',{
                title : 'Edit Data Kegiatan',
                page_title:"Edit Data Kegiatan",data:rows
            });
                
           
         });
    }); 
};

exports.save_edit_datakegiatanAdmin = function(req, res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            nama_kegiatan : input.nama_kegiatan,
            jenis_kegiatan : input.jenis_kegiatan,
            type_kegiatan : input.type_kegiatan,
            pengisi_kegiatan : input.pengisi_kegiatan
        
        };
        
        connection.query("UPDATE data_kegiatan set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/dataKegiatanAdmin');
          
        });
    
    });
};

exports.delete_datakegiatanAdmin = function(req, res){

    var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM data_kegiatan  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/dataKegiatanAdmin');
             
        });
        
     });
};

//-----------------------------------------------------------------------------------------//

//data Pengurus

exports.datapengurusAdmin = function(req, res,next){
     req.getConnection(function(err, connection){

        var query = connection.query("SELECT * FROM data_pengurus", function(err, rows){

            if(err)
                console.log("Error Selecting : %s ", err);

            res.render('dataPengurusAdmin', {
                title: 'Data Pengurus | SIMAC',
                page_title: "Data Pengurus | SIMAC", data:rows
            });
        });
    });
};


exports.save_datapengurusAdmin = function(req, res){

 var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function(err, connection){

        var data = {

            nama_pengurus : input.nama_pengurus,
            alamat_pengurus : input.alamat_pengurus,
            jabatan : input.jabatan,
            no_telepon : input.no_telepon
        };

        var query = connection.query("INSERT INTO data_pengurus set ?", data, function(err, rows){

            if(err)
                console.log("Error Instering : %s", err);
            res.redirect('/dataPengurusAdmin');
        });
    });

};

exports.edit_datapengurusAdmin = function(req, res){
    
    var id = req.params.id;
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM data_pengurus',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_dataPengurusAdmin',{
                title : 'Edit Data Pengurus',
                page_title:"Edit Data Pengurus",data:rows
            });
                
           
         });
    }); 
};

exports.save_edit_datapengurusAdmin = function(req, res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            nama_pengurus : input.nama_pengurus,
            alamat_pengurus : input.alamat_pengurus,
            jabatan : input.jabatan,
            no_telepon : input.no_telepon
        
        };
        
        connection.query("UPDATE data_pengurus set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/dataPengurusAdmin');
          
        });
    
    });
};

exports.delete_datapengurusAdmin = function(req, res){

    var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM data_pengurus  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/dataPengurusAdmin');
             
        });
        
     });
};

//----------------------------------------------------------------------------------------//
exports.session = function(req, res){
    session = req.session;
    //res.end(JSON.stringify(req.body));
    if(req.body.username == 'ibnuazizn' && req.body.password == 'admin'){
        session.uniqueID = req.body.username;
    }
    res.redirect('/redirects');
};
exports.redirects = function(req, res){
    session = req.session;
    if(session.uniqueID){
        res.redirect('/homeAdmin');
    }else{
        res.end('Who Are You???');
    }
};
exports.notFound = function(req, res){
   res.send("<h1>File Not Found</h1>");
};

exports.logout = function(req, res, next){
    res.render('logout', { title: 'Logout | SIMAC' });
};

exports.listen = function(req, res){
    console.log("This application running at port 3000");
};