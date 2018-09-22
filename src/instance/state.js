function stateMixin(Ezay) {
    Ezay.prototype.data = Object.create({});
    Ezay.prototype.models = Object.create({});
    Ezay.prototype.register = register;
    Ezay.prototype.update = update;
}

function register(name, obj) {
    if (this.data[name] !== undefined) {
        throw "Model " + name + " already registered."
    }

    this.models[name] = obj;
    this.data[name] = Object.create(null);

    Object.defineProperty(obj, '$add', {
        configurable: false,
        enumerable: false,
        value: function(prop, val) {
            addWatcher.call(this, this.data[name], obj, prop, val);
        }.bind(this)
    });

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            addWatcher.call(this, this.data[name], obj, key);
        }
    }

    this.update();
}

function update(data, prop) {
    this.dispatch('state-update', { data, prop })
}

// TODO: handle arrays/objects
function addWatcher(data, obj, prop, val) {
    const _this = this;

    if(val !== undefined) {
        data[prop] = val
    } else {
        data[prop] = obj[prop];
    }

    Object.defineProperty(obj, prop, {
        get: function () { return data[prop] },
        set: function (val) { data[prop] = val; _this.update(data, prop); },
    });
}

export default stateMixin;
