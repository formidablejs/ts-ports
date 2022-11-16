import { Stub } from '@formidablejs/stubs';
export declare class Type extends Stub {
    /**
     * @inheritdoc
     */
    get props(): {
        definition: {
            type: StringConstructor;
            required: boolean;
        };
        schema: {
            type: StringConstructor;
            required: boolean;
        };
    };
    /**
     * @inheritdoc
     */
    get data(): {
        class: string;
        definition: string | null;
    };
    /**
     * Get definition.
     */
    get getDefinition(): string | null;
    /**
     * @inheritDoc
     */
    get stub(): string;
    /**
     * @inheritDoc
     */
    get fileName(): string;
    /**
     * @inheritDoc
     */
    get destination(): string;
    /**
     * Resolve type.
     */
    resolveType(type: string): "string" | "number" | "boolean";
}
