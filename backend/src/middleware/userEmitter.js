const myEmitters = require("events")

class OrderStatus extends myEmitters{
    constructor() {
        super();
        this.status = "pending",
        this.progress = 0
    }


start() {
    this.emit('started');
    this.updateprogress();
}

updateprogress() {
    setInterval(() => {
        if(this.progress<100) {
            this.progress += 10
            this.emit("progress",this.progress)
        } else {
            this.status = "completed"
            this.emit("completed")
        }
    },2000);
}
}

// const task = new Order()

// task.on('started', () => {
//     console.log('Task started');
//   });
  
//   task.on('progress', (progress) => {
//     console.log(`Progress: ${progress}%`);
//   });
  
//   task.on('completed', () => {
//     console.log('Task completed');
//   });
  
//   task.start();

module.exports = { OrderStatus }