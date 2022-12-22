const path = require('path');
import { Stub } from '@formidablejs/stubs';

export class Interface extends Stub {
    /**
	 * @inheritdoc
	 */
	get props() {
		return {
			domain: {
				type: String,
				required: false
			}
		};
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
        if (this.options.domain) {
			return `app/Domain/${this.options.domain}/Interfaces`;
		}

        return 'app/Interfaces';
    }
}