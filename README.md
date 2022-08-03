# ts-ports

`ts-ports` enables TypeScript support in the Formidable framework.

## Requirements

- [@formidablejs/framework](https://www.npmjs.com/package/@formidablejs/framework): `>=0.11.x`

## Install

### Recommended

```bash
formidable new <app-name> [...args] --ts
```

### Existing Project

npm:

```bash
npm i @formidablejs/ts-ports --save
```

yarn:

```bash
yarn add @formidablejs/ts-ports --save
```

## Configuration

Open the `package.json` file and add `"language": "TypeScript"`:

```json
{
  ...
  "language": "TypeScript",
  ...
}
```

## Usage

The `use` decorator in `@formidablejs/ts-ports` works the same way as the `use` decorator in `@formidablejs/framework`. To get started, just import the `use` decorator from `@formidablejs/ts-ports` and add it next to any of your class functions:

```ts
import { use } from "@formidablejs/ts-ports";
import { Controller } from "./Controller";

export class UserController extends Controller {
  @use("table:users")
  public async show(user: Promise<User | null>): Promise<User | void> {
    return (await user) || this.notFound("User not found.");
  }
}
```

## Security

If you discover any security related issues, please email donaldpakkies@gmail.com instead of using the issue tracker.

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
