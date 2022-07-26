import { MakeResourceCommand } from '@formidablejs/framework/lib/Foundation/Console/Commands/MakeResourceCommand';
import { Type } from './Type';
export declare class MakeTypeCommand extends MakeResourceCommand {
    /**
     * @inheritDoc
     */
    get signature(): string;
    /**
     * @inheritDoc
     */
    get props(): {
        name: import("@formidablejs/console/types/Props/Prop").default;
        definition: import("@formidablejs/console/types/Props/Prop").default;
        schema: import("@formidablejs/console/types/Props/Prop").default;
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
    get stub(): Type;
}
