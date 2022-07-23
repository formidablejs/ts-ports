import { FormRequest, Request, ValidationException } from "@formidablejs/framework";
import type { FastifyRequest, FastifyReply } from "@formidablejs/framework";
import { bind, isEmpty, isString} from "@formidablejs/framework/lib/Support/Helpers";
import Bind from "@formidablejs/framework/lib/Database/Bind";

export const use = (...parameters: any) => {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
        const value = propertyDescriptor.value;

        const config = {
            reply: null,
            request: null,
            validator: null,
        };

        propertyDescriptor.value = async (...expected: any[]) => {
            const args = [];
            const request = expected[0];
            const reply = expected[1];

            const parsed = { request: false, reply: false, };

            config.request = request;

            await parameters.forEach((object: any, key: any) => {
                let response: any = null;

                if (isString(object) && object.substring(0, 'table:'.length) === 'table:') {
                    response = bind(object.split(':')[1]).handle(request, key);
                } else if (isString(object) && object.substring(0, 'query:'.length) === 'query:') {
                    const query = object.split(':')[1];

                    response = request.query(query, undefined) || undefined;
                } else if (isString(object) && object.substring(0, 'param:'.length) === 'param:') {
                    const param = object.split(':')[1];

                    response = request.param(param, undefined) || undefined;
                } else if (isString(object) && object === 'param') {
                    response = Object.values(request.params())[key] || undefined;
                } else if (object === Number) {
                    const param = Object.values(request.params())[key] || undefined;

                    if (isNaN(param)) {
                        throw new TypeError(("Argument " + (key++) + " must be of the type Number."))
                    };

                    response = param;
                } else if (object === String) {

                    const param = Object.values(request.params())[key] || undefined;

                    if (!(isNaN(param))) {
                        throw new TypeError(("Argument " + (key++) + " must be of the type String."))
                    };

                    response = param;
                } else if (object instanceof Bind) {
                    response = object.handle(request, key);
                } else if (object == Request) {
                    response = request;
                    parsed.request = true;
                } else if (object == FormRequest) {
                    response = request;
                    parsed.request = true;
                } else if (object == FastifyReply) {
                    response = reply;
                    parsed.reply = true;
                } else if (object == FastifyRequest) {
                    response = request;
                    parsed.request = true;
                } else if (FormRequest.isPrototypeOf(object) || Request.isPrototypeOf(object)) {
                    response = new object(
                        request.request,
                        request.route,
                        reply.raw,
                        request.config
                    );

                    if (!isEmpty(request.auth)) {
                        response.auth = request.auth;
                    }

                    if (!response.passesAuthorization()) {
                        response.failedAuthorization();
                    }

                    parsed.request = true;

                    Object.keys(request).map(function (key) {
                        if (isEmpty(response[key])) {
                            return response[key] = request[key]
                        };
                    });

                    const validator = response.validate();

                    if (validator.fails()) {
                        throw ValidationException.withMessages(validator.errors.errors);
                    }
                } else {
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

            return value.apply(this, args);
        };

        return propertyDescriptor;
    }
}