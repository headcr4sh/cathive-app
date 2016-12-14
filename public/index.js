//  _____   ___ _____   _   _ _____ _   _ _____ 
// /  __ \ / _ \_   _| | | | |_   _| | | |  ___|
// | /  \// /_\ \| |   | |_| | | | | | | | |__  
// | |    |  _  || |   |  _  | | | | | | |  __| 
// | \__/\| | | || |   | | | |_| |_\ \_/ / |___ 
//  \____/\_| |_/\_/   \_| |_/\___/ \___/\____/                                            
                                       
(async () => {

const WebAppStatus = {
  /**
   * Status of the app while it is loading.
   */
  LOADING: "loading",

  /**
   * Status of the app when it has been fully loaded and is ready to be used.
   */
  READY: "ready",

  /**
   * Status of the app when something went wrong and it could not be loaded.
   */
  DEFUNCT: "defunct",

  values() {
    return [
      this.LOADING,
      this.READY,
      this.DEFUNCT
    ];
  }

};



class WebApp extends Object {

  /**
   * Creates a new WebApp instance.
   * Usually, only one instance is allowed to exist at any given time.
   */
  constructor() {
    super();
    this.status = WebAppStatus.LOADING;
  }

  get status() {
    return window.sessionStorage.getItem("app.status") || WebAppStatus.LOADING;
  }

  set status(status) {
    if (!WebAppStatus.values().includes(status)) {
      throw new Error(`Unknown status: "${status}".`);
    }
    window.sessionStorage.setItem("app.status", status);
  }

  async initialize() {
    window.sessionStorage.setItem("app.start.begin", JSON.stringify(new Date()));
    try {
      const reg = await navigator.serviceWorker.register("./sw.js", { scope: "/sw/" });
      this.status = WebAppStatus.READY;
      console.info(`ServiceWorker has been registered successfully (Scope: ${reg.scope}).`);
    } catch (e) {
      this.status = WebAppStatus.DEFUNCT;
      console.error("Registration of ServiceWorker has failed.");
      throw e;
    } finally {
      window.sessionStorage.setItem("app.start.end", JSON.stringify(new Date()));
    }
  }
  toString() {
    return "[Cat Hive] WebApp";
  }
}
 

// Creates and initializes the WebApp.
const INSTANCE = window[Symbol.for("@cathive/WebApp")] = new WebApp();
await INSTANCE.initialize();

})();