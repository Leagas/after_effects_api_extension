const EventEmitter  = require("events").EventEmitter;
const IPCEmitter = new EventEmitter();

exports.IPCEmitter = IPCEmitter;

// We cannot use CSInterface in this file

function init_ipc() {
  process.on('message', (packet) => {
    switch (packet.data.type) {
      case "evalscript":
        IPCEmitter.emit("evalscript", packet.data);
      default:
        void 0;
    }
  })
}

exports.init_ipc = init_ipc;

/**
 * 
 * @param {object} data any object
 * @returns Promise<void>
 */
function send_message_to_master(data) {
  return new Promise((resolve, reject) => {
    process.send({
      type: 'process:msg',
      data: data
    }, null, {}, (err) => {
      if (err) reject(err)
      
      // won't resolve until we get a reply from master
      IPCEmitter.on(data.type, (res) => {
        resolve(res)
      })
    })
  })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err)
    })
}

exports.send_message_to_master = send_message_to_master