import initState from '../../src/instance/state.js';

test('initState adds data to prototype', () => {
    var testFunc = function () { };
    initState(testFunc);
    expect(testFunc.prototype.data).toBeDefined();
});

test('initState adds register to prototype', () => {
    var testFunc = function () { };
    initState(testFunc);
    expect(testFunc.prototype.register).toBeDefined();
});

test('initState adds update to prototype', () => {
    var testFunc = function () { };
    initState(testFunc);
    expect(testFunc.prototype.update).toBeDefined();
});

describe('register', () => {

    let Ezay = function() {};
    let ezay;

    beforeEach(() => {
        initState(Ezay);
        ezay = new Ezay();
    });

    test('register adds object to data', () => {
        ezay.register('test', { 'test': 123 });

        expect(ezay.data).toHaveProperty('test');
        expect(ezay.data.test).toEqual({ 'test': 123 });
    });

    test('register adds setter and getter for properties', () => {
        var obj = { 'test': 123 };
        ezay.register('test', obj);

        expect(obj).toHaveProperty('test');
        expect(Object.getOwnPropertyDescriptor(obj, 'test')).toHaveProperty('get');
        expect(Object.getOwnPropertyDescriptor(obj, 'test')).toHaveProperty('set');
    });

    test('register adds $add function to object', () => {
        var obj = { 'test': 123 };
        ezay.register('test', obj);

        expect(obj).toHaveProperty('$add');
    });
})