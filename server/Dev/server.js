// const express = require('express');
// const session = require('express-session');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const router = require('./router.js');
// require('dotenv').config();

// const PORT = process.env.PORT || 5000;
// const app = express();
// app.options('*', cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
// app.use('/api', router);
// // Middleware
// app.use(bodyParser.json());
// // app.use(
// //   session({
// //     secret: process.env.SESSION_SECRET || 'YEAR2024',
// //     resave: false,
// //     saveUninitialized: true,
// //     cookie: { secure: false, maxAge: 60000 * 60 }, // 1 hour
// //   })
// // );

// router(app);

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


//------------------------------------------------
const express = require('express');
const cors = require('cors')
const path = require('path');
require('dotenv').config();
const router = require('./router.js');

const PORT = process.env.PORT || 5000;

const app = express();
//const port = process.env.PORT || 3001;
const corsOptions = {
  origin: `http://localhost:${PORT}`, // Your frontend origin
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
//app.options('*', cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use('/api/v1', router);


app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

//-----------------------------------------------------------------------------------------//
// http code start
//-----------------------------------------------------------------------------------------//

app.listen(PORT, function(){

    console.log("server started!!!"  );
  
    console.log('http://localhost:' + PORT);
});

//-----------------------------------------------------------------------------------------//
// http code end
//--------------------------------------------------------------------------------------------//