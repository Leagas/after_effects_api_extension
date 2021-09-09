const pm2 = require("pm2");

// We can use CSInterface in this file

const csInterface = new CSInterface()
// Bridge setup functions

/**
 * 
 * @param {object} proc configuration of process to start
 * @param {number} pid pm2 index
 * @returns Promise<void>
 */
window.start_process = async function start_process(proc, pid) {
  return new Promise((resolve, reject) => {
    pm2.start(proc, (err, _) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
    .then(_ => {
      console.log("Starting worker...", pid)
    })
    .catch(err => {
      console.log(err)
    })
}

/**
 * Create listener on master process
 * 
 * Requests for CSInterface access from worker nodes are handled here
 */
window.initialize_bridge = async function initialize_bridge() {
  console.log("Creating bridge...")
  pm2.launchBus((_, pm2_bus) => {
    pm2_bus.on('process:msg', async (packet) => {
      switch (packet.data.type) {
        case "evalscript":
          await handle_eval(packet.data.msg, packet.process.pm_id);
        default:
          void (1);
      }
    })
  })
}

/**
 * 
 * @param {object} data a packet to be sent
 * @param {pid} pid pm2 index
 * @returns Promise<void>
 */
async function send_message(data, pid) {
  return new Promise((resolve, reject) => {
    pm2.sendDataToProcessId({
      id: pid,
      type: 'process:msg',
      data: data,
      topic: true
    }, function (err, res) {
      if (err) {
        return reject(err)
      }

      if (res.success) {
        return resolve(res)
      }
    })
  })
    .then(_ => {
      console.log("Message sent to worker ", pid)
    })
    .catch(err => {
      console.log(err)
    })
}

// Message Handlers

/**
 * 
 * @param {ExtendScript String} msg 
 * @param {Number} pid 
 */
 async function handle_eval(msg, pid) {
  console.log(`${msg} -> Worker ${pid}`)
  csInterface.evalScript(msg, (res) => {
    const data = {
      type: "evalscript",
      msg: "EvalScript Response"
    }

    if (res) {
      data.res = res
    }

    send_message(data, pid)
  })
}