import { Command } from '@formidablejs/framework'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join, normalize } from 'path'
import { sync } from 'glob'

export class GenerateTypesCommand extends Command {
	get signature(): string {
		return 'types:generate'
	}

	get description(): string {
		return 'Generate form types'
	}

	get props(): object {
		return {

		}
	}

	/**
	 * Handle command.
	 */
	handle(): void {
		this.save()

		this.message('info', 'Succesfully Generated Types')

		this.exit()
	}

	/**
	 * Get request files.
	 */
	get requestFiles(): Array<string> {
		return sync("app/**/*Request.ts")
	}

	/**
	 * Get types from Request files.
	 */
	get types(): Array<any> {
		const types = []

		for (let index = 0; index < this.requestFiles.length; index++) {
			const file = this.requestFiles[index]
			const name = `${file.split(/[\\\/]/).pop().split('.')[0].slice(0, -7)}Form`
			const contents = readFileSync(file)

			const lines = contents.toString().split('\n')

			let type = []
			let open = false

			for (let index = 0; index < lines.length; index++) {
				const line = lines[index];

				if (line.trim().startsWith("rules()") && line.trim().endsWith("{")) {
					open = true
				}

				if (open && line.trim().endsWith("}")) {
					open = false
				}

				if (open) {
					if (!line.trim().startsWith("return") && !line.trim().includes("{")) {
						let prop = line.trim().split(':')[0]
						let originalOptions = line.replace(/['"]/g, '')
							.replace(/,\s*$/, "")
							.trim()

						let options = originalOptions.split(':')

						options = originalOptions.slice(options[0].length)

						if (options[0] == ':') {
							options = options.slice(1)
						}

						options.trim()

						if (options && /[a-zA-Z\$\_]/.test(prop[0])) {
							options = options.split('|')

							options.forEach((option, position) => {
								options[position] = option.trim()
							})

							prop = prop + (options.includes('nullable') ? '?' : '')

							let propType

							if (
								options.includes('string') ||
								options.includes('alpha') ||
								options.includes('alpha_dash') ||
								options.includes('alpha_num') ||
								options.includes('email') ||
								options.includes('image') ||
								options.includes('url')
							) {
								propType = 'string'
							} else if (options.includes('array')) {
								propType = 'Array<any>'
							} else if (options.includes('boolean')) {
								propType = 'boolean'
							} else if (options.includes('numeric') || options.includes('number') || options.includes('integer')) {
								propType = 'number'
							} else if (options.includes('accepted')) {
								propType = '"yes" | "on" | 1 | true'
							} else {
								for (let index = 0; index < options.length; index++) {
									const option = options[index];

									if (
										option.startsWith("between:") ||
										option.startsWith("digits:") ||
										option.startsWith("digits_between:") ||
										option.startsWith("file_size:") ||
										option.startsWith("max:") ||
										option.startsWith("min:") ||
										option.startsWith("size:")
									) {
										propType = 'number'
									} else if (
										option.startsWith("in:") ||
										option.startsWith("not_in:")
									) {
										propType = 'string | number'
									} else if (
										option.startsWith("regex:") ||
										option.startsWith("same:") ||
										option.startsWith("different:")
									) {
										propType = 'string'
									} else {
										propType = 'any'
									}
								}
							}

							type.push({ [`/** @rules ${options.join('|')} */\n\t${prop.trim()}`]: propType })
						}
					}
				}
			}

			types.push({ [name]: type })
		}

		if (types.length === 0) {
			this.message('info', 'No Types Generated')

			this.exit()
		}

		return types
	}

	/**
	 * Save auto generated types.
	 */
	save(): void {
		const types = this.types;

		for (let index = 0; index < types.length; index++) {
			const type = types[index];
			const name = Object.keys(type)[0] + '.ts'
			const filePath = join(process.cwd(), "app", "Types", "Forms", name)

			if (existsSync(filePath)) {
				const existingType = readFileSync(filePath)

				if (!existingType.toString().startsWith('// Auto-Generated: ')) {
					return
				}
			}

			const builder = [
				"// Auto-Generated: " + (new Date).toISOString() + "\n",
				`type ${Object.keys(type)[0]} = {`
			]

			Object.values(type)[0].forEach((line) => {
				builder.push("\t" + Object.entries(line)[0].join(': '))
			})

			builder.push("}\n")

			const directory = dirname(filePath)

			if (!existsSync(directory)) {
				mkdirSync(directory, { recursive: true })
			}

			const contents = builder.join('\n')

			writeFileSync(normalize(filePath), contents)
		}
	}
}
