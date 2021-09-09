const start_process = window.start_process
const initialize_bridge = window.initialize_bridge

// We can use CSInterface in this file

const local_path = document.currentScript.getAttribute("local_path")

const apps = [
  {
    name: "Render Local",
    script: local_path,
    watch: true,
    autorestart: false,
    env: {
      db: "localhost:27017",
      dbUser: "admin",
      dbPass: "c5txTbrLa63Via8My0KGNEMitX1mUMt3",
      FFMPEG_PATH: "C:\\ffmpeg\\bin\\ffmpeg.exe",
      FFPROBE_PATH: "C:\\ffmpeg\\bin\\ffprobe.exe",
      NODE_ENV: "develop",
      PORT: 3002,
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