<script lang="ts">
	import api from "../../api/api";
import SlowbackButton from "../../ui/SlowbackButton/SlowbackButton.svelte";
import SlowbackCard from "../../ui/SlowbackCard/SlowbackCard.svelte";
	import SlowbackInput from "../../ui/SlowbackInput/SlowbackInput.svelte";
	import SlowbackTypography from "../../ui/SlowbackTypography/SlowbackTypography.svelte";

    let username: string = "";
    let password: string = "";

    const login = async () => {
        let loginResponse = await api.User.Login(username, password);
    }

</script>
<div class="login-page">
    <SlowbackCard>
        <div class="login-page__card">
            <SlowbackTypography variant='h1'>
                Level Editor
            </SlowbackTypography>
            <div class="login-page__card-content">
                <div class="login-page__card-description">
                    <SlowbackTypography>
                        This is some random content that I need to write some real stuff for eventually <br />

                        This is some example content for now.
                    </SlowbackTypography>
                </div>
                <form class="login-page__form">
                    <SlowbackInput 
                        label="Username"
                        type="text"
                        onChange={e => username = e.target.value}

                    />
                    <SlowbackInput label="Password" type="password" onChange={e => password = e.target.value} />
<SlowbackButton variant="primary" onClick={login}>
Log In
</SlowbackButton>
<SlowbackButton variant="text">
    New User
</SlowbackButton>

                </form>
            </div>
        </div>
    </SlowbackCard>
</div>

<style lang="scss">
    @import "../../style/index.scss";

    .login-page {
        display: flex;
        background: url("home-bg.png");
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
                grid-template-columns: 1fr 2fr;
                max-width: 40vw;
                gap: 16px;
            }
        }

        &__form {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
        }
    }
</style>