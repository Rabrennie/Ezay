import stateMixin from '../../src/instance/state.js';

test('stateMixin adds data to prototype', () => {
    var testFunc = function () { };
    stateMixin(testFunc);
    expect(testFunc.prototype.data).toBeDefined();
});

test('stateMixin adds register to prototype', () => {
    var testFunc = function () { };
    stateMixin(testFunc);
    expect(testFunc.prototype.register).toBeDefined();
});

test('stateMixin adds update to prototype', () => {
    var testFunc = function () { };
    stateMixin(testFunc);
    expect(testFunc.prototype.update).toBeDefined();
});

describe('register', () => {

    let Ezay = function() { this.update = () => {}};
    let ezay;

    beforeEach(() => {
        stateMixin(Ezay);
        ezay = new Ezay();
    });

    test('register adds object to models', () => {
        ezay.register('test', { 'test': 123 });

        expect(ezay.models).toHaveProperty('test');
        expect(ezay.models.test).toEqual({ 'test': 123 });
    });
})