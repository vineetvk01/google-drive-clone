import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fetchAuthentication } from './middleware/authentication'; 
import drive from './routes/drive';
import authentication from './routes/authentication';
import config from './config';

const app = express();

var corsOptions = {
  origin: ['http://localhost:3000', config.CLIENT],
  optionsSuccessStatus: 200
}

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type, *');
  next();
});

app.use((req, res, next) => {
  res.publish = (success, message, data, status) => {
    res.status(status || 200).send({
      success,
      message: message || '',
      data: data || {}
    });
  };
  next();
});

app.use(cors(corsOptions));
app.use(fetchAuthentication);

// app.use(express.static(path.join(__dirname, '../public')));

/* API Entry points */


app.get('/', (req, res) => {
  res.status(200).send({
    server: 'Running',
  });
});

app.use('/drive', drive);
app.use('/auth', authentication);

app.use(function (req, res, next) {
  res.status(404);
  // respond with json
  console.log('Not Found -->', req.path, req.method)
  if (req.accepts('json')) {
    res.send({ status: '404', error: 'Not found', });
    return;
  }
  res.send();
});

export default app;
