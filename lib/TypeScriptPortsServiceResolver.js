"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeScriptPortsServiceResolver = void 0;
const MakeInterfaceCommand_1 = require("./Commands/Interface/MakeInterfaceCommand");
const MakeTypeCommand_1 = require("./Commands/Type/MakeTypeCommand");
const framework_1 = require("@formidablejs/framework");
class TypeScriptPortsServiceResolver extends framework_1.ServiceResolver {
    boot() {
        this.app.registerCommand(MakeInterfaceCommand_1.MakeInterfaceCommand);
        this.app.registerCommand(MakeTypeCommand_1.MakeTypeCommand);
    }
}
exports.TypeScriptPortsServiceResolver = TypeScriptPortsServiceResolver;
