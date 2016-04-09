# applyMiddleware
applyMiddleware for Constructor

```javascript
function X(a, b) {
	this.a = a;
	this.b = b;
}
X.prototype.getA = function () {
	console.log('getA');
	return this.a;
};
X.prototype.setA = function (val) {
	console.log('setA');
	return this.a = val;
};

var x = applyMiddleware({
		getA : function (next) {
			return function () {
				console.log('wrap-getA:' + this.a);
				next();
			}
		},
		setA : function (next) {
			return function (val) {
				console.log('setA-before:' + this.a);
				next(val);
				console.log('setA-after:' + this.a);
			}
		}
	})(X)(1, 20);
```
`x.setA(4)`
>setA-before:1 

>setA 

>setA-after:4
