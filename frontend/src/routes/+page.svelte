<script lang="ts">
	import { get } from 'svelte/store';
	import { userDataStore } from '../stores/userDataStore';

	let userData = get(userDataStore);

	const userIsLoggedIn = !!userData;

	window.location.href = '/login';
</script>
