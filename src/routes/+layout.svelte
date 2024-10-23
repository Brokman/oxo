<script lang="ts">
	import '../app.css';
	import { afterNavigate } from "$app/navigation";
	import "./styles.css";

	let { children } = $props();

	afterNavigate(() => {
    	HSStaticMethods.autoInit();
  });
</script>

{@render children()}
