<script lang="ts">
	import { userDataStore } from '../../stores/userDataStore';

	function clearData() {
		userDataStore.set(null);
		document.cookie.split(';').forEach(function (c) {
			document.cookie = c
				.replace(/^ +/, '')
				.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
		});
	}
</script>

<p>Hello World</p>
<button on:click={clearData}> Clear Data </button>
