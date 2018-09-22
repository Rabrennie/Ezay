import eventMixin from '../../src/instance/event.js';

test('eventMixin adds eventListeners to prototype', () => {
    var testFunc = function () { };
    eventMixin(testFunc);
    expect(testFunc.prototype.eventListeners).toBeDefined();
});

test('eventMixin adds on to prototype', () => {
    var testFunc = function () { };
    eventMixin(testFunc);
    expect(testFunc.prototype.on).toBeDefined();
});

test('eventMixin adds dispatch to prototype', () => {
    var testFunc = function () { };
    eventMixin(testFunc);
    expect(testFunc.prototype.on).toBeDefined();
});

test('dispatch calls handler with args', () => {
    var mockCallback = jest.fn(args => {})

    var testFunc = function() {};
    eventMixin(testFunc);

    var args = {
        'testing': 123
    };

    var testFuncInstance = new testFunc();

    testFuncInstance.on('test-event', mockCallback);
    testFuncInstance.dispatch('test-event',args);

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe(args);
});