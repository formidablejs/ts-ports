"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeInterfaceCommand = void 0;
const console_1 = require("@formidablejs/console");
const MakeResourceCommand_1 = require("@formidablejs/framework/lib/Foundation/Console/Commands/MakeResourceCommand");
const Interface_1 = require("./Interface");
class MakeInterfaceCommand extends MakeResourceCommand_1.MakeResourceCommand {
    /**
     * @inheritDoc
     */
    get signature() {
        return 'make:interface {name}';
    }
    /**
     * @inheritDoc
     */
    get props() {
        return {
            name: console_1.Prop.string().description('The name of the interface')
        };
    }
    /**
     * @inheritDoc
     */
    get description() {
        return 'Create a new interface';
    }
    /**
     * @inheritDoc
     */
    get resource() {
        return 'Interface';
    }
    /**
     * @inheritDoc
     */
    get stub() {
        return new Interface_1.Interface(this.argument('name'), {}, 'interface');
    }
}
exports.MakeInterfaceCommand = MakeInterfaceCommand;
