

module.exports = function(router){

    router.route('/session')
    // .all(auth.isLoggedIn, (req, res, next) => { 
    //     res.statusCode = 200;
    //     // console.log(req.loggedUser);
    //     res.setHeader('Content-Type', 'text/plain');
    //     res.setHeader('Access-Control-Allow-Origin', settings.serverSettings.clientOrigin);

    //     next();
    // })
    .get((req, res, next) => {
        try{
          if (!req.session.userId) {
            req.session.userId = `anonymous-${Date.now()}`;
          }
          res.json({ sessionId: req.session.userId });
        }
        catch(err){ 
            res.json({
            "status" : 0,
            "message" : ""
            });
        }
       
    });

    router.route('/users')
    // .all(auth.isLoggedIn, (req, res, next) => { 
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'text/plain');
    //     res.setHeader('Access-Control-Allow-Origin', settings.serverSettings.clientOrigin);

    //     next();
    // })
    .get((req, res, next) => {
        try{
          //   locationService.getById(req.query.id, function(result){
          //       res.json({
          //           "status" : result.status,
          //           "message" : result.message,
          //           "data": result.data
          //       });
          //  });
           res.json({
            "status" : '1',
            "message" : '',
            "data": null
        });
        }
        catch(err){ 
            res.json({
            "status" : 0,
            "message" : err.message
            });
        }
       
    })
    .post((req, res, next) => {
        try{
          res.json({
            "status" : '1',
            "message" : '',
            "data": null
        });
        }
        catch(err){ 
            res.json({
            "status" : 0,
            "message" : err.message
            });
        }
       
    })
    .put((req, res, next) => {
        try{
          res.json({
            "status" : '1',
            "message" : '',
            "data": null
        });
        }
        catch(err){ 
            res.json({
            "status" : 0,
            "message" : err.message
            });
        }
        
    })
    .delete((req, res, next) => {
        try{
          res.json({
            "status" : '1',
            "message" : '',
            "data": null
        });
        }
        catch(err){ 
            res.json({
            "status" : 0,
            "message" : err.message
            });
        }
        
    });

   

   
    return router;
};