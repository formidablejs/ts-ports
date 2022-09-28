import { MakeInterfaceCommand } from './Commands/Interface/MakeInterfaceCommand';
import { MakeTypeCommand } from './Commands/Type/MakeTypeCommand';
import { ServiceResolver } from '@formidablejs/framework';

export class TypeScriptPortsServiceResolver extends ServiceResolver {
    boot() {
        this.app.registerCommand(MakeInterfaceCommand)
        this.app.registerCommand(MakeTypeCommand)
    }
}