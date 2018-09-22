import initMixin from './init.js'
import stateMixin from './state.js'
import renderMixin from './render.js'

function Ezay(options) {
    this._init(options);
}

initMixin(Ezay);
stateMixin(Ezay);
renderMixin(Ezay);

export default Ezay;