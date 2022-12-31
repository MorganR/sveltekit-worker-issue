// Browser guards are needed since `Worker` doesn't exist on the server.
import { browser } from '$app/environment';

export class ConsoleGreeter {
	constructor() {
		// We need to use a relative path for local development, since '/worker' gets re-written
		// to '/static/worker' for some reason.
		// this.worker = browser ? new Worker(new URL('../../worker.js', import.meta.url)) : undefined;

		// However, with `npm run build`, a relative path results in the error:
		/*
    Error [RollupError]: Could not resolve entry module "worker.js".
        at error (file:///.../sveltekit-worker-issue/node_modules/rollup/dist/es/shared/rollup.js:2001:30)
        at ModuleLoader.loadEntryModule (file:///.../sveltekit-worker-issue/node_modules/rollup/dist/es/shared/rollup.js:23018:20)
        at async Promise.all (index 0) {
      code: 'PLUGIN_ERROR',
      watchFiles: [
        ...
      ],
      pluginCode: 'UNRESOLVED_ENTRY',
      plugin: 'vite:worker-import-meta-url',
      hook: 'transform',
      id: '.../greeter.ts'
    }*/

		// Using a non-relative path resolves the above issue, and compiles successfully if the web
		// worker has no dynamic imports.
		this.worker = browser ? new Worker(new URL('/worker.js', import.meta.url)) : undefined;

		this.worker?.addEventListener('message', (e) => {
			console.log(`Received greeting: ${e.data}`);
		});
	}

	worker: Worker | undefined;

	greet() {
		this.worker?.postMessage('requesting greeting');
	}
}
