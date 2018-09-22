function eventMixin(Ezay) {

    Ezay.prototype.eventListeners = Object.create({});

    Ezay.prototype.on = on;
    Ezay.prototype.dispatch = dispatch;

}

function on(event, handler) {
    if(this.eventListeners[event] === undefined) {
        this.eventListeners[event] = [];
    }

    this.eventListeners[event].push(handler);
}

function dispatch(event, obj) {
    if(this.eventListeners[event] === undefined) {
        return;
    }

    for (let i = 0; i < this.eventListeners[event].length; i++) {
        this.eventListeners[event][i](obj);
        
    }
}

export default eventMixin;