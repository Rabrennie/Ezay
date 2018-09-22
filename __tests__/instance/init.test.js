import initInit from '../../src/instance/init.js';

test('initInit adds _init to prototype', () => {
    var testFunc = function () { };
    initInit(testFunc);
    expect(testFunc.prototype._init).toBeDefined();
});

test('initInit adds registerOption', () => {
    var testFunc = function () { };
    initInit(testFunc);
    expect(testFunc.registerOption).toBeDefined();
});

describe('registerOption', () => {
    let Ezay = function() {};

    beforeEach(() => {
        initInit(Ezay);
    });

    test('registerOption adds new option', () => {
        Ezay.registerOption('test', {
            'required': true,
            'default': 'test'
        });

        expect(Ezay.options).toHaveProperty('test');
        expect(Ezay.options.test).toEqual({ 'required': true, 'default': 'test' });
    });

    test('registerOption defaults required to false', () => {
        Ezay.registerOption('test', {});

        expect(Ezay.options).toHaveProperty('test');
        expect(Ezay.options.test).toEqual({ 'required': false });
    });

    test('registerOption ignores other properties', () => {
        Ezay.registerOption('test', { 'testing123': 123 });

        expect(Ezay.options).toHaveProperty('test');
        expect(Ezay.options.test).toEqual({ 'required': false });
    });
})
