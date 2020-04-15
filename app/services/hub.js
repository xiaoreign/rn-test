import signalr from 'react-native-signalr';
var hubConn;
var connectionState

export function init(hubName, signalrUrl) {
    hubConn = signalr.hubConnection(`${signalrUrl}`);
    connectionState = hubConn.connectionState

  hubConn.logging = true;
  // console.log(`[hubConn]init[${hubConn.url}]`);
  hubProxy = hubConn.createHubProxy(hubName);
}
export function start () {
  // console.log(`[hubConn]starting[${hubConn.url}]`);
  hubConn
    .start()
    .done(() => {
      // console.log(`[hubConn]started`);
      // console.log(
      //   `[hubConn]connectionId[${hubConn.id}]transport[${
      //     hubConn.transport.name
      //   }]`,
      // );
    })
    .fail(() => console.error(`[hubConn]startfailed`));
};
export function stop  () {
  if (hubConn.state === connectionState.connected) {
    // console.log(`[hubConn]stopping[${hubConn.url}]connectionId[${hubConn.id}]`);
    hubConn.stop();
    console.log(`[hubConn]stopped`);
  }
};
export function getConnState() { 
    return hubConn.state;
}

export function callHubService (args, doneFn, failFn) {
  if (typeof args[0] === "string") {
    hubProxy.invoke(...args).done(() => doneFn()).fail((error) => { console.log(error); failFn(); });
  }
};

export function registerHubConnEvent (fn) {
  const fnName = fn.name;
  if (typeof fn === 'function' && !hubConn.hasOwnProperty(fnName)) {
    hubConn[fnName](fn);
  }
};
export function registerHubProxyEvent (fn) {
  const fnName = fn.name.toLowerCase();
  if (
    typeof fn === 'function' &&
    !hubProxy._.callbackMap.hasOwnProperty(fnName)
  ) {
    hubProxy.on(fn.name, fn);
  }
};
