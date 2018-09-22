# Ezay

👍 Easy to use modern javascript framework 

## Usage

```html
<div id="app">
    <my-el>
        {{ test }}
        <button ezay:click="clickHandler">
            {{ test }}
        </button>

    </my-el>
</div>

<script src="dist/ezay.min.js"></script>

<script>

    var ezay = new Ezay({ el: '#app' });

    var myEl = {
        'test': 1234,
        'clickHandler': function () {
            this.test += 1;
        }
    };

    ezay.register('my-el', myEl);

</script>
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

