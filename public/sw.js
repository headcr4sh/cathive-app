//  _____   ___ _____   _   _ _____ _   _ _____ 
// /  __ \ / _ \_   _| | | | |_   _| | | |  ___|
// | /  \// /_\ \| |   | |_| | | | | | | | |__  
// | |    |  _  || |   |  _  | | | | | | |  __| 
// | \__/\| | | || |   | | | |_| |_\ \_/ / |___ 
//  \____/\_| |_/\_/   \_| |_/\___/ \___/\____/ 

(async () => {

/**
 * My shiny beloved ServiceWorker class.
 */
class ServiceWorker extends Object {
  constructor() {
    super();
  }
  async initialize() {

    console.info("Initializing ServiceWorker...");

    // Register the various life cycle events with the listener functions.
    self.oninstall = event => this.onInstall(event);
    self.onactivate = event => this.onActivate(event);

  }

  async onInstall(event) {

  }

  async onActivate(event) {
    event.waitUntil(self.clients.claim());
  }

  toString() {
    return "[Cat Hive] ServiceWorker";
  }
}

// Creates and initializes the ServiceWorker.
const INSTANCE = self[Symbol.for("@cathive/ServiceWorker")] = new ServiceWorker();
await INSTANCE.initialize();

})();
