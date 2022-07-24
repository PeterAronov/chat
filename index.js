const app = require("./app");
require('dotenv').config({ path: './config/index.env' }); // Default: path.resolve(process.cwd(), '.env')

const port = process.env.PORT;
const ip = process.env.IP;

app.listen(port, ip, () => {
  console.log("Application starts at", port, "at IP:", ip);
});