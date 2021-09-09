const path = require("path")
const start_process = window.start_process
const initialize_bridge = window.initialize_bridge

// We can use CSInterface in this file

const apps = [
  {
    name: "Render Develop",
    script: path.join(__dirname, "/src/index.js"),
    env: {
      db: "10.100.3.5:27017",
      dbUser: "admin",
      dbPass: "c5txTbrLa63Via8My0KGNEMitX1mUMt3",
      FFMPEG_PATH: "C:\\ffmpeg\\bin\\ffmpeg.exe",
      FFPROBE_PATH: "C:\\ffmpeg\\bin\\ffprobe.exe",
      NODE_ENV: "develop",
      PORT: 3002,
    }
  },
  {
    name: "Render Staging",
    script: path.join(__dirname, "/src/index.js"),
    env: {
      db: "10.4.1.3:27017",
      dbUser: "admin",
      dbPass: "c5txTbrLa63Via8My0KGNEMitX1mUMt3",
      FFMPEG_PATH: "C:\\ffmpeg\\bin\\ffmpeg.exe",
      FFPROBE_PATH: "C:\\ffmpeg\\bin\\ffprobe.exe",
      NODE_ENV: "staging",
      PORT: 3003,
    }
  }
]

async function main() {
  for (let i = 0; i < apps.length; i++) {
    await start_process(apps[i], i)
  }

  initialize_bridge()
}

main()