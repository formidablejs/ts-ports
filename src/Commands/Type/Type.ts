const path = require('path');
import { Stub } from '@formidablejs/stubs';

export class Type extends Stub {
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
    get getDefinition(): string | null {
        if (!this.options.definition && !this.options.schema) return null;

        const isDef = this.options.definition ? true : false;

        const definitions = isDef ? this.options.definition.split(',') : this.options.schema.split(',');

		const lines = [];

        if (!isDef) {
            lines.push("\tid: number")
        }

		for (const key in definitions) {
			if (Object.hasOwnProperty.call(definitions, key)) {
				const element = definitions[key];
				let [ name, type ] = element.split(':')

				type = isDef ? type : this.resolveType(type.split('.')[0])

				let line = `${name.trim()}: ${type}`

				if (!lines.includes(`\t${line}`)) {
					lines.push(`\t${line}`)
				}
			}
		}

        if (!isDef) {
            const updatedAt = "\tupdated_at: string"
            const createdAt = "\tcreated_at: string"

            if (!lines.includes(updatedAt)) {
                lines.push(updatedAt);
            }

            if (!lines.includes(createdAt)) {
                lines.push(createdAt);
            }
        }

		return "{\n" + lines.join('\n') + "\n}"
    }

    /**
     * @inheritDoc
     */
    get stub(): string {
        const file = path.join(__dirname, 'stub');

        return file;
    }

    /**
     * @inheritDoc
     */
    get fileName(): string {
		return this.realClassName + '.ts';
	}

    /**
     * @inheritDoc
     */
    get destination(): string {
        return 'app/Types';
    }

    /**
     * Resolve type.
     */
    resolveType(type: string) {
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
            return 'boolean'
        }

        return 'string';
    }
}