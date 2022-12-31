<script>
	import { ConsoleGreeter } from '$lib/greeter';

	const greeter = new ConsoleGreeter();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={greeter.greet}>Greet (check console)</button>
