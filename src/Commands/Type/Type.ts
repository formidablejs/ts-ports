const path = require('path');
import { Stub } from '@formidablejs/stubs';

export class Type extends Stub {
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
}