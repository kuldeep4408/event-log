class Events {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  trigger(eventName, mongodbCallback) {
    if (this.events[eventName]) {
      for (const callback of this.events[eventName]) {
        callback();
        if (mongodbCallback) {
          mongodbCallback(eventName);
        }
      }
    }
  }

  off(eventName) {
    delete this.events[eventName];
  }
}
