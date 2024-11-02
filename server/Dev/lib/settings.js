module.exports={
    serverSettings:{
        port:3000,
        clientOrigin : '*'
    },
    tokenSettings:{
        secretKey : 'Avatar@2024'
    },
    mysql:{
        host:'localhost',
        user:'root',
        password:'root',
        database:'test_db',
        port: 3306,
        debug: true,
        connectionLimit:100
    },
    postgresql:{
        host:'localhost',
        user:'postgres',
        password:'root',
        database:'AvatarWorldDB',
        port: 5432,
        debug: true,
        connectionLimit:100
    },
    DB_STATUS : {
        NG : 0 ,
        OK : 1
    },
   
    
};