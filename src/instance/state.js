function stateMixin(Ezay) {
    Ezay.prototype.data = Object.create({});
    Ezay.prototype.models = Object.create({});
    Ezay.prototype.templates = Object.create({});
    Ezay.prototype.contextModels = Object.create({});
    Ezay.prototype.register = register;
    Ezay.prototype.registerContext = registerContext;
    Ezay.prototype.update = update;
}

function register(name, obj, template) {
    name = name.toLowerCase();

    if (this.models[name] !== undefined) {
        throw "Model " + name + " already registered."
    }

    this.models[name] = obj;

    this.contextModels[name] = Object.create({});
    this.data[name] = Object.create({});
    
    if(template !== undefined) {
        this.templates[name] = template.cloneNode(true);
        if(template.parentNode) {
            template.parentNode.removeChild(template);
        }
    }

    this.update();
}

function registerContext(name, modelName) {
    const obj = copy(this.models[modelName]);
    this.contextModels[modelName][name] = obj;
    this.data[modelName][name] = Object.create(null);

    Object.defineProperty(obj, '$add', {
        configurable: false,
        enumerable: false,
        value: function (prop, val) {
            addWatcher.call(this, this.data[modelName][name], obj, prop, val);
            this.update(this.data[modelName][name], prop);
        }.bind(this)
    });

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            addWatcher.call(this, this.data[modelName][name], obj, key);
        }
    }

    this.update();
}


function copy(obj) {
    let out, v, key;
    out = Array.isArray(obj) ? [] : {};
    for (key in obj) {
        v = obj[key];
        out[key] = (typeof v === "object" && v !== null) ? copy(v) : v;
    }
    return out;
 }

 
function update(data, prop) {
    this.dispatch('state-update', { data, prop })
}

// TODO: handle objects
function addWatcher(data, obj, prop, val) {
    const _this = this;

    if (val !== undefined) {
        data[prop] = val
        if (obj[prop] !== undefined && !obj[prop].configurable) {
            return;
        }
    } else {
        data[prop] = obj[prop];
    }

    if(Array.isArray(data[prop])) {
        extendArray.call(this, data, prop);
        
    }

    Object.defineProperty(obj, prop, {
        get: function () { return data[prop] },
        set: function (val) { data[prop] = val; _this.update(data, prop); },
    });
}

function extendArray(data, prop) {
    const _this = this;
    const funcNames = [
        "reverse",
        "sort",
        "push",
        "pop",
        "shift",
        "unshift",
        "splice",
        "concat",
        "slice",
        "copyWithin",
        "fill"
    ]
    for (let i = 0; i < funcNames.length; i++) {
        const funcName = funcNames[i];
        data[prop][funcName] = function() {
            Array.prototype[funcName].apply(data[prop], arguments);
            _this.update(data, prop);
            return data[prop].length;
        };
    }

}

export default stateMixin;
