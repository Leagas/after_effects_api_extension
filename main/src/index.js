const express = require("express")
const { init_ipc } = require("./worker_ipc");

const port = process.env.PORT

require("log-timestamp")(function () {
  return "[" + new Date().toGMTString() + "] %s";
});

async function main(port) {
  const app = express();
  
  init_ipc();

  app.listen(port, () => {
    console.log(`Listening on ${port}`)
  })
}

main(port)