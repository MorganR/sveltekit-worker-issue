onmessage = (e) => {
	if (document === undefined) {
		// We're in a worker!
		importScripts('./greeting.js');
		postMessage(greeting);
	} else {
		// We're in the main thread!
		const greetingExports = import('./greeting.js');
		postMessage(greetingExports.greeting);
	}
};
