"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeTypeCommand = void 0;
const console_1 = require("@formidablejs/console");
const MakeResourceCommand_1 = require("@formidablejs/framework/lib/Foundation/Console/Commands/MakeResourceCommand");
const Type_1 = require("./Type");
class MakeTypeCommand extends MakeResourceCommand_1.MakeResourceCommand {
    /**
     * @inheritDoc
     */
    get signature() {
        return 'make:type {name}';
    }
    /**
     * @inheritDoc
     */
    get props() {
        return {
            name: console_1.Prop.string().description('The name of the type')
        };
    }
    /**
     * @inheritDoc
     */
    get description() {
        return 'Create a new type';
    }
    /**
     * @inheritDoc
     */
    get resource() {
        return 'Type';
    }
    /**
     * @inheritDoc
     */
    get stub() {
        return new Type_1.Type(this.argument('name'), {}, 'type');
    }
}
exports.MakeTypeCommand = MakeTypeCommand;
