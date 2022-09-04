require('dotenv').config();
const express = require('express');
const expressHandlebars = require('express-handlebars');
const expressSession = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(expressSession.Store);
const sequelize = require('./config/connection');
//routes

const handlebars = expressHandlebars.create();

const sessionSettings = {
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialize: false,
   store: new SequelizeStore({
      db: sequelize,
   }),
}

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.status('public'));

app.use(expressSession(sessionSettings));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

sequelize.sync({force: false}).then(() => {
   app.listen(PORT, () => console.log('server up'));
});