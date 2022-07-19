const express = require("express");
const process = require('process'); // process module which is used to get the current working directory of the node.js process
const {v4 : uuidv4} = require('uuid')// import single method(v4) from uuid library and call it uuidv4.[ else uuid = require('uuid')  => uuid.v4()]
let fs = require('fs');
const router = express.Router();

const currentMessagesJson = require("../messages.json");
let currentMessagesTable = currentMessagesJson.messages;

/////////////GET////////////////////////////

router.get("/", (req, res) => { //http://localhost:8000/messages/
  return res.status(200).json(currentMessagesJson);
});

router.get("/:id", (req, res) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
  const id = req.params.id;
  return res.status(200).json({
    message: currentMessagesTable.filter((message) => message.id === id)[0],
  });
});

/////////////POST////////////////////////////

router.post("/", (req, res) => { //http://localhost:8000/messages/
  //const id = parseInt(currentMessagesTable[currentMessagesTable.length - 1].id) + 1; // and then id: String(id)
  const newMessage = {text: req.body.text, id: uuidv4(), time: new Date().toLocaleString() ,user_name: req.body.user_name}; // Make new const tweet and 
  currentMessagesTable.push(newMessage);

  saveUpdatedMessagesToJsonFile(req, res);
});

/////////////PUT////////////////////////////

router.put("/:id", (req, res) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
  const id = req.params.id;
  const updatedMessageText = req.body.text;
  const index = currentMessagesTable.map((message) => message.id).indexOf(id);
  //console.log(currentMessagesTable.map((message) => message.id));
  if(index !== -1) {
    currentMessagesTable[index].text = updatedMessageText;
    saveUpdatedMessagesToJsonFile(req, res);
  }
});

/////////////DELETE////////////////////////////

router.delete("/:id", (req, res) => { //http://localhost:8000/messages/88ab2e95-1955-482e-9107-bf2ae8825baf
  const id = req.params.id;
  const index = currentMessagesTable.map((message) => message.id).indexOf(id);
  if(index !== -1) {
    currentMessagesTable.splice(index, 1); // removes 1 element at the given index
    saveUpdatedMessagesToJsonFile(req, res);
  }
});

///////////////////////////////////////////////

function saveUpdatedMessagesToJsonFile(req, res) {
  const currentMessagesTableJson= {messages: currentMessagesTable}

  console.log(currentMessagesTableJson);
  console.log(JSON.stringify(currentMessagesTableJson, null, 2));//makes the json look much better
  console.log(JSON.stringify(currentMessagesTableJson));
  console.log(JSON.parse(JSON.stringify(currentMessagesTableJson)));
  console.log("Current working directory: ", process.cwd()); //Visual Studio Code Files/ChatAppBackend

  fs.writeFile("./messages.json", JSON.stringify(currentMessagesTableJson, null, 2), function(err) { //The path is relative to process.cwd()!
    if (err) {
      return res.status(400).json({ failure: "writing to file was failed"});
    }
    return res.status(200).json({ success: "writing to db completed with success" });
  })
};

///////////////////////////////////////////////

module.exports = router;// import and export router