const app = require('./app/app');
require('dotenv').config();

const { env } = process;

app.listen(env.APP_PORT, () => {
  console.log(`CORS-enabled web server listening on port ${env.APP_PORT}`);
});
