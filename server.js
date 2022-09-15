require('dotenv').config();
const express = require('express');
const expressHandlebars = require('express-handlebars');
const expressSession = require('express-session');

const moment = require('moment');

const SequelizeStore = require('connect-session-sequelize')(expressSession.Store);
const sequelize = require('./config/connection');
const routes = require('./routes');

const helpers = require('./utils/helpers');

const handlebars = expressHandlebars.create({
   helpers,
});

const sessionSettings = {
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialize: false,
   store: new SequelizeStore({
      db: sequelize,
   }),
   cookie: {
      //expires: 60000
   }
}

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(expressSession(sessionSettings));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

sequelize.sync({force: false}).then(() => {
   app.listen(PORT, () => console.log('server up at ' + moment().format('MMM Do YYYY, h:mm:ss a')));
});