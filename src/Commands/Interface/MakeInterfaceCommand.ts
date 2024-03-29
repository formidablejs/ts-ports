import { Prop } from '@formidablejs/console';
import { MakeResourceCommand } from '@formidablejs/framework/lib/Foundation/Console/Commands/MakeResourceCommand';
import { Interface } from './Interface'

export class MakeInterfaceCommand extends MakeResourceCommand {
    /**
     * @inheritDoc
     */
    get signature(): string {
        return 'make:interface {name} {?--domain}'
    }

    /**
     * @inheritDoc
     */
    get props() {
        return {
            name: Prop.string().description('The name of the interface'),
            domain: Prop.string().nullable().description('Domain name')
        }
    }

    /**
     * @inheritDoc
     */
    get description(): string {
        return 'Create a new interface'
    }

    /**
     * @inheritDoc
     */
    get resource(): string {
        return 'Interface';
    }

    /**
     * @inheritDoc
     */
    get stub() {
        return new Interface(this.argument('name'), {
            domain: this.option('domain', null)
        }, 'interface');
    }
}