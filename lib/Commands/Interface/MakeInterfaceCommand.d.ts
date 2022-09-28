import { MakeResourceCommand } from '@formidablejs/framework/lib/Foundation/Console/Commands/MakeResourceCommand';
import { Interface } from './Interface';
export declare class MakeInterfaceCommand extends MakeResourceCommand {
    /**
     * @inheritDoc
     */
    get signature(): string;
    /**
     * @inheritDoc
     */
    get props(): {
        name: import("@formidablejs/console/types/Props/Prop").default;
    };
    /**
     * @inheritDoc
     */
    get description(): string;
    /**
     * @inheritDoc
     */
    get resource(): string;
    /**
     * @inheritDoc
     */
    get stub(): Interface;
}
