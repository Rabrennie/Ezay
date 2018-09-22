import initInit from './init.js'
import initState from './state.js'
import initRender from './render.js'

function Ezay(options) {
    this._init(options);
}

initInit(Ezay);
initState(Ezay);
initRender(Ezay);

export default Ezay;