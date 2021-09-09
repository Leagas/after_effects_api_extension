module.exports = {
  apps: [
    {
      name: "Render Local",
      script: "./server/render/src/index.js",
      env: {
        db: "localhost:27017",
        dbUser: "admin",
        dbPass: "c5txTbrLa63Via8My0KGNEMitX1mUMt3",
        FFMPEG_PATH: "C:\\ffmpeg\\bin\\ffmpeg.exe",
        FFPROBE_PATH: "C:\\ffmpeg\\bin\\ffprobe.exe",
        NODE_ENV: "develop",
        PORT: 3002,
      }
    },
  ]
};
