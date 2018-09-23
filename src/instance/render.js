function renderMixin(Ezay) {

    Ezay.registerOption('el', {
        'required': true
    });

    Ezay.prototype.dom = Object.create({});
}

export function initRender(ezay) {
    let el = ezay.options.el;

    if (typeof el === 'string') {
        el = document.querySelector(el);
    }

    if (el == null) {
        throw "Could not bind to element";
    }

    ezay.dom = createElement(ezay, el);

    ezay.on('state-update', onStateUpdate.bind(ezay));
}

function createElement(ezay, node) {

    const children = [];
    for (let i = 0; i < node.childNodes.length; i++) {
        const n = node.childNodes[i];
        children.push(createElement(ezay, n))
    }

    const el = {
        'type': node.nodeName,
        'props': fetchAttributes(node),
        'children': children
    };

    return el;
}

function fetchAttributes(node) {
    
    if(node.nodeName == '#text') {
        return {
            textContent: node.textContent
        };
    };

    node.setAttribute('data-ezay-id', uid());

    return node && Array.prototype.reduce.call(node.attributes, function (list, attribute) {
        list[attribute.name] = attribute.value;
        return list;
    }, {}) || {};
};

function uid() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

function onStateUpdate(obj) {
    const vnode = renderEl.call(this, this.dom, {}, '');
    const node = document.querySelector(`[data-ezay-id=${this.dom.props['data-ezay-id']}]`);
    
    node.parentNode.replaceChild(vnode, node);
};

// TODO: implement a better virtual dom ( only update changed nodes etc. )
// TODO: handle external changes to dom
function renderEl(el, context, modelName) {
    if(el.type === '#text') {
        return createTextNode(el, context)
    }

    if(this.models[el.type.toLowerCase()] !== undefined) {
        if(this.data[el.type.toLowerCase()][el.props['data-ezay-id']] === undefined) {
            this.registerContext(el.props['data-ezay-id'], el.type.toLowerCase(), Object.assign({}, this.models[el.type.toLowerCase()] ));
        }
        context = this.contextModels[el.type.toLowerCase()][el.props['data-ezay-id']];
    }

    const vnode = document.createElement(el.type)

    for (const key in el.props) {
        if (el.props.hasOwnProperty(key)) {
            const prop = el.props[key];
            vnode.setAttribute(key, prop);

            if(key == "ezay:click") {
                vnode.addEventListener('click', () => context[prop].call(context));
            }

            if(key == "ezay:for") {
                const something = prop.split(' in ');

                const data = context[something[1]];
                
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];                    
                    for (let j = 0; j < el.children.length; j++) {
                        const child = el.children[j];
                        const thiscontext = {}
                        thiscontext[something[0]] = element;
                        vnode.appendChild(renderEl.call(this, child, thiscontext))
                    }
                }

                return vnode;
            }
        }
    }

    for (let i = 0; i < el.children.length; i++) {
        const child = el.children[i];
        vnode.appendChild(renderEl.call(this, child, context));
    }

    return vnode;
};

function createTextNode(el, context) {
    var re = /{{\s*([a-zA-Z0-9]+)\s*}}/g
    var text = el.props.textContent;
    var res;
    while(res = re.exec(text)) {
        var data = ''; 
        if(context[res[1]] !== null) {
            data = context[res[1]];
        }
        text = text.replace(res[0], data);
    }
    return document.createTextNode(text)
}

export default renderMixin;