import { Prop } from '@formidablejs/console';
import { MakeResourceCommand } from '@formidablejs/framework/lib/Foundation/Console/Commands/MakeResourceCommand';
import { Type } from './Type'

export class MakeTypeCommand extends MakeResourceCommand {
    /**
     * @inheritDoc
     */
    get signature(): string {
        return 'make:type {name}'
    }

    /**
     * @inheritDoc
     */
    get props() {
        return {
            name: Prop.string().description('The name of the type')
        }
    }

    /**
     * @inheritDoc
     */
    get description(): string {
        return 'Create a new type'
    }

    /**
     * @inheritDoc
     */
    get resource(): string {
        return 'Type';
    }

    /**
     * @inheritDoc
     */
    get stub() {
        return new Type(this.argument('name'), {}, 'type');
    }
}