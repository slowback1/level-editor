<script lang="ts">
	import api from '../../api/api';
	import { loadUserResponse } from '../../stores/userDataStore';
	import SlowbackButton from '../../ui/SlowbackButton/SlowbackButton.svelte';
	import SlowbackCard from '../../ui/SlowbackCard/SlowbackCard.svelte';
	import SlowbackInput from '../../ui/SlowbackInput/SlowbackInput.svelte';
	import SlowbackTypography from '../../ui/SlowbackTypography/SlowbackTypography.svelte';

	let username: string = '';
	let password: string = '';

	const login = async () => {
		let loginResponse = await api.User.Login(username, password);

		loadUserResponse(loginResponse);
	};
</script>

<div class="login-page">
	<SlowbackCard>
		<div class="login-page__card">
			<SlowbackTypography variant="h1">Level Editor</SlowbackTypography>
			<div class="login-page__card-content">
				<div class="login-page__card-description">
					<SlowbackTypography>
						Easily create levels and manage assets for all of your HTML games. Either log in or
						start for free using the form to the right!
					</SlowbackTypography>
				</div>
				<form class="login-page__form">
					<SlowbackInput
						label="Username"
						type="text"
						onChange={(e) => (username = e.target.value)}
					/>
					<SlowbackInput
						label="Password"
						type="password"
						onChange={(e) => (password = e.target.value)}
					/>
					<SlowbackButton variant="primary" onClick={login}>Log In</SlowbackButton>
					<SlowbackButton variant="text">New User</SlowbackButton>
				</form>
			</div>
		</div>
	</SlowbackCard>
</div>

<style lang="scss">
	@import '../../style/index.scss';

	.login-page {
		display: flex;
		background: url('home-bg.png');
		width: 100vw;
		height: 100vh;
		margin: 0;
		justify-content: center;
		align-items: center;

		&__card {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;

			&-content {
				display: grid;
				grid-template-columns: 2fr 1fr;
				max-width: 500px;
				gap: 16px;
				margin-top: 12px;
			}
		}

		&__form {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 24px;
			border-left: 2px solid $gunmetal;
			padding-left: 24px;
		}
	}
</style>
