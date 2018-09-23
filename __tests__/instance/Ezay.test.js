import Ezay from '../../src/instance/index.js';

beforeEach(() => {
    const div = document.createElement('div');
    div.id = 'test';
    document.body.appendChild(div);
});

test('construct throws if option is required', () => {
    Ezay.registerOption('test', { 'required': true });

    expect(() => {
        new Ezay({'el': '#test'})
    }).toThrow();
});

test('construct sets default option', () => {
    Ezay.registerOption('test', { 'default': 123 });

    const ezay = new Ezay({'el': '#test'});

    expect(ezay.options).toHaveProperty('test');
    expect(ezay.options.test).toEqual(123);
});

test('construct ignores non required non default options', () => {    
    Ezay.registerOption('test', {});

    const ezay = new Ezay({'el': '#test'});

    expect(ezay.options.test).toBeUndefined();
});