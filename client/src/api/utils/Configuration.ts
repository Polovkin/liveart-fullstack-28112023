export default class Configuration {
	static get CONFIG(): Record<string, string> {
		return {
			VITE_VUE_APP_API_URL: '$VITE_VUE_APP_API_URL',
		};
	}

	static value(key: string): string {
		if (!(key in this.CONFIG)) {
			console.warn(`Configuration: There is no key named "${key}"`);
			return '';
		}

		const value = this.CONFIG[key];

		if (value === undefined) {
			console.warn(`Configuration: Value for "${key}" is not defined`);
			return '';
		}

		if (value.startsWith('$VITE_VUE_APP_')) {
			// development mode
			// Remove $ and get current value from process.env
			const envName = value.substring(1);
      const envValue = import.meta.env[envName];
			if (envValue !== undefined) {
				return envValue;
			} else {
				console.warn(`Configuration: Environment variable "${envName}" is not defined`);
			}
		} else {
			return value;
		}
		return '';
	}
}
