


var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser')

const jwt = require('jsonwebtoken');
const request = require('postman-request');
var bodyParser = require('body-parser');
var multer  = require('multer');
var cors = require('cors');
var path = require('path');

var mysqlconnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mytask'
    
    
    
    
    });




var app = express();
app.use(cors());
app.use(cookieParser())
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static( '/Images'));


mysqlconnection.connect((err)=>{
    if(!err)
    {
        console.log('Database connection Succecded');
    }
    else{
        console.log('Database not connected\nError:'+JSON.stringify(err,undefined,2));
    }
    
    
    
    });
    app.listen(8081,()=>console.log('Express server is running on port no :8081'));
    //Define Diskstorage using multer
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage: storage});


//midelware of jwt
function verifyToken(req,res,next){

    if(!req.headers.authorization){
        return res.status(401).send('The user is  not authorized')
    }
    let token=req.headers.authorization.split(' ')[1]
    if(token==='null'){
        return res.status(401).send('No token provide user')
    }
    
    let payload =jwt.verify(token,'secretkey')
    if(!payload)
    {
        return res.status(401).send('no Payload user')
    
    }
    req.id=payload.subject
    next();
    }


    app.post('/login',(req,res)=>{
        
        var email = req.body.email;
        var password = req.body.password;
        
     mysqlconnection.query("SELECT *FROM login WHERE email=? AND password=?", [email,password], function (error, results, fields) {
        
            if (results.length > 0) {
          
                    let payload={subject: results[0].id}
                    let mytoken=jwt.sign(payload,'secretkey')
                    
                   
                 res.status(200).send({mytoken});
                 
            } else {
                res.ststus(401).send('Incorrect Username and/or Password!');
            }			
          res.end();
                                                      });
     
        
        });



        app.post('/register',function(request, response) {
  
            var first_name = request.body.first_name;
            var last_name = request.body.last_name;
            var email = request.body.email;
            var password = request.body.password;
            mysqlconnection.query("SELECT *FROM login WHERE email=? AND password=?", [email,password], function (error, results, fields) {
        
                if (results.length > 0) {
              
                     
                        
                       
                     response.status(401).send('This email is already registered');
                     
                } else {
                    mysqlconnection.query('INSERT INTO login(first_name,last_name,email,password) VALUES(?,?,?,?)', [first_name,last_name,email,password], function(error, results, fields) {
                  
                        if(error)
                        response.status(401).send(error)
                        else
                        {
                            let payload={subject: email}
                            let token=jwt.sign(payload,'secretkey')
                            
                           
                         response.status(200).send({token});
                         
                            
                        }
                       
                        response.end();    
                                
                            
                        });
                }			
             
                                                          });
         
            
           
           
            
            
        });




        app.get('/servicee', function(request, response) {





            mysqlconnection.query('SELECT *FROM servicee', function(error, results, fields) {
                  
                if(error)
                    response.send(error)
                    else
                 
                            
                response.send(results)
                        
                    response.end();
                });
          
        });



        app.post('/servicee',upload.single('file'), function(request, response) {
  
            var hed = request.body.hed;
            var des = request.body.des;
            var file = request.file.filename;
            var servce = request.body.servce;
            
            
            mysqlconnection.query('INSERT INTO servicee(name,des,img,parent_service) VALUES(?,?,?,?)', [hed,des,file,servce], function(error, results, fields) {
                  
                if(error)
                response.send(error)
                else
                response.send("data enter successfuly");
                        
                        
                    response.end();
                });
           
            
            
        });


    

app.post('/content',upload.single('file'),(req,res)=>{
        
    var fk = req.body.fk;
    var meta = req.body.meta;
    var hed1 = req.body.hed1;
    var des1 = req.body.des1;
    var hed2 = req.body.hed2;
    var des2 = req.body.des2;
    var hed3 = req.body.hed3;
    var des3 = req.body.des3;
    var hed4 = req.body.hed4;
    var des4 = req.body.des4;
    var hed5 = req.body.hed5;
    var des5 = req.body.des5;
    var hed6 = req.body.hed6;
    var des6 = req.body.des6;
    var hed7 = req.body.hed7;
    var des7 = req.body.des7;
    var hed8 = req.body.hed8;
    var des8 = req.body.des8;
    var hed9 = req.body.hed9;
    var des9 = req.body.des9;
    var hed10 = req.body.hed10;
    var des10 = req.body.des10;
    var hed11 = req.body.hed11;
    var des11 = req.body.des11;
    var file = req.file.filename;
   
    
    
    
    // validation
    
    
    // insert to db
    mysqlconnection.query("INSERT INTO servicepages(fk, meta,img1, hed1, des1, hed2, des2, hed3, des3, hed4, des4, hed5, des5, hed6, des6, hed7, des7, hed8, des8, hed9, des9, hed10, des10, hed11, des11) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [fk,meta,file,hed1,des1,hed2,des2,hed3,des3,hed4,des4,hed5,des5,hed6,des6,hed7,des7,hed8,des8,hed9 ,des9 ,hed10 ,des10,hed11,des11 ], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Content successfully added' });
    });
    
    });



    app.get('/content', function(request, response) {


  
	
	
        mysqlconnection.query('SELECT c.* , s.* FROM servicepages c,sub_service s WHERE c.fk=s.id', function(error, results, fields) {
              
            if(error)
                response.send(error)
                else
              
                        
            response.send(results)
                    
                response.end();
            });
      
    });

    app.get('/content/:id', function(request, response) {


  id=request.params.id;
	
	
        mysqlconnection.query('SELECT c.* , s.* FROM servicepages c,sub_service s WHERE c.fk=s.id AND c.pid=?',[id], function(error, results, fields) {
              
            if(error)
                response.send(error)
                else
              
                        
            response.send(results)
                    
                response.end();
            });
      
    });


    app.delete('/content/:id', function(request, response) {


        id=request.params.id;
          
          
              mysqlconnection.query('DELETE FROM servicepages where pid=?',[id], function(error, results, fields) {
                    
                  if(error)
                      response.send(error)
                      else
                    
                              
                  response.send("Deleted Successfully")
                          
                      response.end();
                  });
            
          });



    // app.get('/', function(request, response) {
    //     response.sendFile(path.join(__dirname + '/index.html'));
    // });
    // app.get('/', function(request, response) {
    //     response.sendFile(path.join(__dirname + '/login.html'));
    // });
    // app.get('/index', function(request, response) {
    //     if (request.session.loggedin){
    //     response.sendFile(path.join(__dirname + '/index.html'));
    //     }
    //     else{
    //         response.redirect('/')
    //     }
    // });
   
            
   

    // app.post('/auth', function(request, response) {
    //     var email = request.body.email;
    //     var password = request.body.password;
    //     if (email && password) {
    //         mysqlconnection.query('SELECT * FROM login WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
    //             if (results.length > 0) {
    //                 request.session.loggedin = true;
    //                 request.session.email = email;
    //                 response.redirect('/index');
    //             } else {
    //                 response.send('Incorrect Username and/or Password!');
    //             }			
    //             response.end();
    //         });
    //     } else {
    //         response.send('Please enter Username and Password!');
    //         response.end();
    //     }
    // });

    // app.post('/subservice', function(request, response) {
      
    //     var name = request.body.name;
    //     var service = request.body.servce;
        
        
    //     mysqlconnection.query('INSERT INTO sub_service (name,servce) VALUES(?,?)', [name,service], function(error, results, fields) {
              
    //         if(error)
    //         response.send(error)
    //         else
    //         response.send("data enter successfuly");
                    
                    
    //             response.end();
    //         });
       
        
        
    // });
         
// app.post('/service', function(request, response) {
    
// 	var service = request.body.name;
	
	
//     mysqlconnection.query('INSERT INTO service (name) VALUES(?)', [service], function(error, results, fields) {
          
        
//         if(error)
//         response.send(error)
//         else
//         response.send("data enter successfuly");
                
				
// 			response.end();
//         });
    
	
// });

// app.get('/service', verifyToken, function(request, response) {


  
	
	
//     mysqlconnection.query('SELECT *FROM service', function(error, results, fields) {
          
//         if(error)
//             response.send(error)
//             else
      
                    
//         response.send(results)
				
// 			response.end();
// 		});
   
// });
// app.get('/service/:id', function(request, response) {
	

  
	
	
//     mysqlconnection.query('SELECT *FROM service where id =?',[request.params.id], function(error, results, fields) {
          
//         if(error)
//             response.send(error)
//             else
         
                    
//         response.send(results)
				
// 			response.end();
// 		});
  
// });
// app.put('/service/:id', function(request, response) {
	
// name=request.body.name;
// ;
  
	
	
//     mysqlconnection.query('UPDATE service SET name=? where id =?',[name,request.params.id], function(error, results, fields) {
          
//         if(error)
//             response.send(error)
//             else
         
                    
//         response.send("Data Updated")
				
// 			response.end();
// 		});
  
// });


// app.delete('/service/:id', function(request, response) {
	

  
	
	
//     mysqlconnection.query('DELETE FROM service where id=?',[request.params.id], function(error, results, fields) {
          
//         if(error)
//             response.send(error)
//             else
         
                    
//         response.send("deleted Successfuly")
				
// 			response.end();
// 		});
  
// });


// app.get('/subservice/:id', function(request, response) {
	

  
	
	
//     mysqlconnection.query('SELECT *FROM sub_service where id =?',[request.params.id], function(error, results, fields) {
          
//         if(error)
//             response.send(error)
//             else
         
                    
//         response.send(results)
				
// 			response.end();
// 		});
  
// });
// app.put('/subservice/:id', function(request, response) {
	
// name=request.body.name;
// servce=request.body.servce;
  
	
	
//     mysqlconnection.query('UPDATE sub_service SET name=? servce=? where id =?',[name,servce,request.params.id], function(error, results, fields) {
          
//         if(error)
//             response.send(error)
//             else
         
                    
//         response.send("Data Updated")
				
// 			response.end();
// 		});
  
// });


// app.delete('/subservice/:id', function(request, response) {
	

  
	
	
//     mysqlconnection.query('DELETE FROM sub_service where id=?',[request.params.id] ,function(error, results, fields) {
          
//         if(error)
//             response.send(error)
//             else
         
                    
//         response.send("deleted Successfuly")
				
// 			response.end();
// 		});
  
// });



        //   app.get('/subservicecat', function(request, response) {


  
	
	
        //     mysqlconnection.query('SELECT c.* , s.* FROM subservicecat c,sub_service s WHERE c.sfk=s.id', function(error, results, fields) {
                  
        //         if(error)
        //             response.send(error)
        //             else
                  
                            
        //         response.send(results)
                        
        //             response.end();
        //         });
          
        // });

        


      