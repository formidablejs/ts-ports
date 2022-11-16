"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
const path = require('path');
const stubs_1 = require("@formidablejs/stubs");
class Type extends stubs_1.Stub {
    /**
     * @inheritdoc
     */
    get props() {
        return {
            definition: {
                type: String,
                required: false,
            },
            schema: {
                type: String,
                required: false
            }
        };
    }
    /**
     * @inheritdoc
     */
    get data() {
        return {
            'class': this.realClassName,
            'definition': this.getDefinition
        };
    }
    /**
     * Get definition.
     */
    get getDefinition() {
        if (!this.options.definition && !this.options.schema)
            return null;
        const isDef = this.options.definition ? true : false;
        const definitions = isDef ? this.options.definition.split(',') : this.options.schema.split(',');
        const lines = [];
        if (!isDef) {
            lines.push("\tid: number");
        }
        for (const key in definitions) {
            if (Object.hasOwnProperty.call(definitions, key)) {
                const element = definitions[key];
                let [name, type] = element.split(':');
                type = isDef ? type : this.resolveType(type.split('.')[0]);
                let line = `${name.trim()}: ${type}`;
                if (!lines.includes(`\t${line}`)) {
                    lines.push(`\t${line}`);
                }
            }
        }
        if (!isDef) {
            const updatedAt = "\tupdated_at: string";
            const createdAt = "\tcreated_at: string";
            if (!lines.includes(updatedAt)) {
                lines.push(updatedAt);
            }
            if (!lines.includes(createdAt)) {
                lines.push(createdAt);
            }
        }
        return "{\n" + lines.join('\n') + "\n}";
    }
    /**
     * @inheritDoc
     */
    get stub() {
        const file = path.join(__dirname, 'stub');
        return file;
    }
    /**
     * @inheritDoc
     */
    get fileName() {
        return this.realClassName + '.ts';
    }
    /**
     * @inheritDoc
     */
    get destination() {
        return 'app/Types';
    }
    /**
     * Resolve type.
     */
    resolveType(type) {
        const numbers = [
            'integer',
            'bigInteger',
            'tinyint',
            'smallint',
            'mediumint',
            'bigint',
            'float',
            'double',
            'decimal'
        ];
        if (numbers.includes(type)) {
            return 'number';
        }
        if (type == 'boolean') {
            return 'boolean';
        }
        return 'string';
    }
}
exports.Type = Type;
