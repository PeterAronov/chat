if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: __dirname + '/config/dev.env' }) // Default: path.resolve(process.cwd(), '.env')
} else {
  require('dotenv').config({ path: __dirname + '/config/prod.env' })
}
const app = require("./app");
require('./db/mongoose');

const port = process.env.PORT;
const ip = process.env.IP;

app.listen(port, ip, () => {
  console.log("Application starts at", port, "at IP:", ip);
});