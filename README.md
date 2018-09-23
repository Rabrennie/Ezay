# Ezay

👍 Easy to use modern javascript framework 

## Usage

```html
<div id="app">
    <my-el>
        {{ count }}
        <button ezay:click="clickHandler">+1</button>
        <ul ezay:for="num in array">
            <li>{{ num }}</li>
        </ul>
    </my-el>
</div>

<script src="dist/ezay.min.js"></script>

<script>

    var ezay = new Ezay({ el: '#app' });

    ezay.register('my-el', {
        'count': 1,
        'array': [1],
        'clickHandler': function () {
            this.count += 1;
            this.array.push(this.count);
        },
    });

</script>
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

