import { MakeInterfaceCommand } from './Commands/Interface/MakeInterfaceCommand';
import { MakeTypeCommand } from './Commands/Type/MakeTypeCommand';
import { ServiceResolver } from '@formidablejs/framework';
import { GenerateTypesCommand } from './Commands/Types/GenerateTypesCommand';

export class TypeScriptPortsServiceResolver extends ServiceResolver {
    boot() {
        // @ts-ignore
        this.app.registerCommand(MakeInterfaceCommand)

        // @ts-ignore
        this.app.registerCommand(MakeTypeCommand)
        this.app.registerCommand(GenerateTypesCommand)
    }
}