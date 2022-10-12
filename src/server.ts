// import cron from 'node-cron';
// import axios from 'axios';
import fs from 'fs';
import https from 'https';
import app from './app';

const port = process.env.PORT || 3001;

const ssl = {
  key: fs.readFileSync('ssl/localhost-key.pem'),
  cert: fs.readFileSync('ssl/localhost.pem'),
};

// prettier-ignore
const server = process.env.NODE_ENV === 'production'
  ? https.createServer(ssl, app)
  : app;
// cron.schedule('* * * * *', async () => {
//   const { data } = await axios.get('http://localhost:3001/v1');
//   console.table(data);
// });
server.listen(port, () => console.log(`App listening on port: ${port}`));
