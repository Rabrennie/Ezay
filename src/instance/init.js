import { initRender } from './render.js'

function initMixin(Ezay) {
    Ezay.options = Object.create({});
    Ezay.registerOption = registerOption;
    Ezay.prototype._init = init;
}

function init(options) {
    this.options = Object.create(null);

    for (const key in options) {
        if (options.hasOwnProperty(key)) {
            const option = options[key];
            if(this.constructor.options[key] !== undefined) {
                this.options[key] = option;
            }
        }
    }
    
    for (const key in this.constructor.options) {
        if (this.constructor.options.hasOwnProperty(key)) {
            const option = this.constructor.options[key];
            if(this.options[key] === undefined) {
                if(option.required) {
                    throw `Option ${key} is required.`;
                }
                if(option.default !== undefined) {
                    this.options[key] = option.default;
                }
            }
        }
    }

    initRender(this);
}

function registerOption(name, options) {
    this.options[name] = Object.create(null);
    this.options[name].required = !!options.required;
    this.options[name].default = options.default;
}


export default initMixin;