import { Prop } from '@formidablejs/console';
import { MakeResourceCommand } from '@formidablejs/framework/lib/Foundation/Console/Commands/MakeResourceCommand';
import { Type } from './Type'

export class MakeTypeCommand extends MakeResourceCommand {
    /**
     * @inheritDoc
     */
    get signature(): string {
        return 'make:type {name} {--definition} {--schema} {?--domain}'
    }

    /**
     * @inheritDoc
     */
    get props() {
        return {
            name: Prop.string().description('The name of the type'),
            definition: Prop.string().alias('d').description('Set type definition').nullable(),
            schema: Prop.string().alias('s').description('Set type schema').nullable(),
            domain: Prop.string().nullable().description('Domain name')
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
        return new Type(this.argument('name'), {
            definition: this.option('definition', null),
            schema: this.option('schema', null),
            domain: this.option('domain', null)
        }, 'type');
    }
}