const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


/*
* @ Config BBDD
*/
require('./config/db');

/***/


const app = express();

/*
* @ Routes
*/
const testRoutes = require('./routes/test');

/***/

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
app.use(bodyParser.urlencoded({exrended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(testRoutes);

app.listen(process.env.PORT || 3000);