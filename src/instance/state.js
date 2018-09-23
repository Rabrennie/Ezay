function stateMixin(Ezay) {
    Ezay.prototype.data = Object.create({});
    Ezay.prototype.models = Object.create({});
    Ezay.prototype.contextModels = Object.create({});
    Ezay.prototype.register = register;
    Ezay.prototype.registerContext = registerContext;
    Ezay.prototype.update = update;
}

function register(name, obj) {
    if (this.models[name] !== undefined) {
        throw "Model " + name + " already registered."
    }

    this.models[name] = obj;

    this.contextModels[name] = Object.create({});
    this.data[name] = Object.create({});

    this.update();
}

function registerContext(name, modelName, obj) {

    this.contextModels[modelName][name] = obj;
    this.data[modelName][name] = Object.create(null);

    Object.defineProperty(obj, '$add', {
        configurable: false,
        enumerable: false,
        value: function (prop, val) {
            addWatcher.call(this, this.data[modelName][name], obj, prop, val);
        }.bind(this)
    });

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            addWatcher.call(this, this.data[modelName][name], obj, key);
        }
    }

    this.update();
}

function update(data, prop) {
    this.dispatch('state-update', { data, prop })
}

// TODO: handle objects
function addWatcher(data, obj, prop, val) {
    const _this = this;

    if (val !== undefined) {
        data[prop] = val
    } else {
        data[prop] = obj[prop];
    }

    if (Array.isArray(data[prop])) {
        overrideArray.call(this, data, prop);
    }

    Object.defineProperty(obj, prop, {
        get: function () { return data[prop] },
        set: function (val) { data[prop] = val; _this.update(data, prop); },
    });
}

function overrideArray(data, prop) {
    var _this = this;

    var arrayPrototype = Object.getOwnPropertyNames(Array.prototype);
    for (var funcKey in arrayPrototype) {
        if (typeof Array.prototype[arrayPrototype[funcKey]] == 'function') {
            data[prop][arrayPrototype[funcKey]] = (function(func, data, prop) {return function () {
                Array.prototype[func].apply(data[prop], arguments);
                _this.update(data, prop);
            }})(arrayPrototype[funcKey], data, prop)
        }
    }

}

export default stateMixin;
