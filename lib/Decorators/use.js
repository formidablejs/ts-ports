"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
const framework_1 = require("@formidablejs/framework");
const Helpers_1 = require("@formidablejs/framework/lib/Support/Helpers");
const Bind_1 = require("@formidablejs/framework/lib/Database/Bind");
const use = (...parameters) => {
    return (target, memberName, propertyDescriptor) => {
        const value = propertyDescriptor.value;
        const config = {
            reply: null,
            request: null,
            validator: null,
        };
        propertyDescriptor.value = async (...expected) => {
            const args = [];
            const request = expected[0];
            const reply = expected[1];
            const parsed = { request: false, reply: false, };
            config.request = request;
            await parameters.forEach((object, key) => {
                let response = null;
                if ((0, Helpers_1.isString)(object) && object.substring(0, 'table:'.length) === 'table:') {
                    response = (0, Helpers_1.bind)(object.split(':')[1]).handle(request, key);
                }
                else if ((0, Helpers_1.isString)(object) && object.substring(0, 'query:'.length) === 'query:') {
                    const query = object.split(':')[1];
                    response = request.query(query, undefined) || undefined;
                }
                else if ((0, Helpers_1.isString)(object) && object.substring(0, 'param:'.length) === 'param:') {
                    const param = object.split(':')[1];
                    response = request.param(param, undefined) || undefined;
                }
                else if ((0, Helpers_1.isString)(object) && object === 'param') {
                    response = Object.values(request.params())[key] || undefined;
                }
                else if (object === Number) {
                    const param = Object.values(request.params())[key] || undefined;
                    if (isNaN(param)) {
                        throw new TypeError(("Argument " + (key++) + " must be of the type Number."));
                    }
                    ;
                    response = param;
                }
                else if (object === String) {
                    const param = Object.values(request.params())[key] || undefined;
                    if (!(isNaN(param))) {
                        throw new TypeError(("Argument " + (key++) + " must be of the type String."));
                    }
                    ;
                    response = param;
                }
                else if (object instanceof Bind_1.default) {
                    response = object.handle(request, key);
                }
                else if (object == framework_1.Request) {
                    response = request;
                    parsed.request = true;
                }
                else if (object == framework_1.FormRequest) {
                    response = request;
                    parsed.request = true;
                }
                else if (object == FastifyReply) {
                    response = reply;
                    parsed.reply = true;
                }
                else if (object == FastifyRequest) {
                    response = request;
                    parsed.request = true;
                }
                else if (framework_1.FormRequest.isPrototypeOf(object) || framework_1.Request.isPrototypeOf(object)) {
                    response = new object(request.request, request.route, reply.raw, request.config);
                    if (!(0, Helpers_1.isEmpty)(request.auth)) {
                        response.auth = request.auth;
                    }
                    if (!response.passesAuthorization()) {
                        response.failedAuthorization();
                    }
                    parsed.request = true;
                    Object.keys(request).map(function (key) {
                        if ((0, Helpers_1.isEmpty)(response[key])) {
                            return response[key] = request[key];
                        }
                        ;
                    });
                    const validator = response.validate();
                    if (validator.fails()) {
                        throw framework_1.ValidationException.withMessages(validator.errors.errors);
                    }
                }
                else {
                    response = (!!object.prototype && !!object.prototype.constructor.name) ? (new object) : object;
                }
                args.push(response);
            });
            if (!parsed.request) {
                args.push(request);
            }
            if (!parsed.reply) {
                args.push(reply);
            }
            return value.apply(target, args);
        };
        return propertyDescriptor;
    };
};
exports.use = use;
