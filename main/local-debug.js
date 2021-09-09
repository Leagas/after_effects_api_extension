const express = require("express")
const path = require("path")

function main() {
  const app = express();

  app.use(express.static(path.join(__dirname, "./public/develop")))

  app.listen(9991, () => {
    console.log("Local debug server listening on 9991")
  })
}

main()