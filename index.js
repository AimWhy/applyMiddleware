function compose() {
	for (var _i = 0, _len = arguments.length, funcs = Array(_len); _i < _len; _i++) {
		funcs[_i] = arguments[_i];
	}

	return function () {
		if (funcs.length) {
			var last = funcs[funcs.length - 1],
			rest = funcs.slice(0, -1),
			context = this;

			return rest.reduceRight(function (composed, f) {
				return f.call(context, composed);
			}, last.apply(context, arguments));
		} else {
			return arguments.length ? arguments[0] : undefined;
		}
	};
}

function applyMiddleware() {
	var middlewares = {};

	for (var _i = 0, _len = arguments.length; _i < _len; _i++) {
		var middlewareMap = arguments[_i];
		for (var _key in middlewareMap) {
			if (!middlewares[_key]) {
				middlewares[_key] = [];
			}
			middlewares[_key].push(middlewareMap[_key]);
		}
	}

	return function (Constructor) {
		return function (a, b, c, d, e, f, g, h, i, j) {
			var instance = new Constructor(a, b, c, d, e, f, g, h, i, j),
			_rawAction,
			action,
			chain;

			for (var key in middlewares) {
				chain = middlewares[key];
				_rawAction = instance[key].bind(instance);
				action = compose.apply(void 0, chain).call(instance, _rawAction);
				instance[key] = action;
			}

			return instance;
		};
	};
}
