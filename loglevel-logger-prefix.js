/**
 * Plugin for https://github.com/pimterry/loglevel
 *
 * Adds current loggerName prefix, when using custom loggers.
 *
 * @author maynagashev (https://github.com/maynagashev)
 */

var originalFactory = log.methodFactory;

log.methodFactory = function (methodName, logLevel, loggerName) {
    var rawMethod = originalFactory(methodName, logLevel, loggerName);

    return function () {
        var messages = [];

        if (typeof loggerName !== 'undefined') {
            var prefix = '['+loggerName+']';
            messages.push(prefix);
        }

        for (var i = 0; i < arguments.length; i++) {
            messages.push(arguments[i]);
        }
        rawMethod.apply(undefined, messages);
    };
};
log.setLevel(log.getLevel()); // Be sure to call setLevel method in order to apply plugin