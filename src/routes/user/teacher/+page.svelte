<script lang="ts">
	import { goto } from "$app/navigation";

    let email: string = "";
    let password: string = "";

    let switches: number = 0;
    let output = {
        process: "",
        message: "",
        roomId: "",
        finished: false,
    }

    // General Function

    
    // Login / Register functions
    const login = async() => {
        const res = await fetch('/api/teacher/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});

        

		const data = await res.json();
		output.message = data.message;
        output.process = "login"
        output.finished = true;

        goto("/");
    }
    const register = async() => {
        const roomIdGen = Math.floor(Math.random() * 9000) + 1000;
        const res = await fetch('/api/teacher/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password, roomIdGen })
		});

		const data = await res.json();
        output.message = data.message;
        output.process = "register";
        output.roomId = data.roomId;
        output.finished = true;

        
    }

    // Handle change form
    const handleLogin = () =>  {
        switches = 0;
    }
    const handleRegister = () => {
        switches = 1;
    }

    
</script>

<section class="main-section">
    <div class="wrapper">
        <button class="back" on:click={() => history.back()}>
            <img src="/assets/back.svg" alt="back-icon" class="back-icon">
        </button>

        
        <div class="container">

            
            <div class="row-selection">
                <div class="login-container" on:click={handleLogin} class:clicked={switches == 0}>
                    <h2 class="header kanit">เข้าสู่ระบบ</h2>
                </div>

                <div class="register-container" on:click={handleRegister} class:clicked={switches == 1}>
                    <h2 class="header kanit">ลงทะเบียน</h2>
                </div>
            </div>
            {#if output.finished}
                {#if output.process == "login"}
                    <div class="output-container">
                        <h2 class="header kanit">{output.message}</h2>
                    </div>
                    {:else}
                        <div class="output-container">
                            <h2 class="header kanit">{output.message}<br>Your room id is {output.roomId}</h2>
                        </div>
                {/if}
            {/if}
            {#if switches == 0}
                <form on:submit|preventDefault={login} class="form-login">
                    <h1 class="header kanit" style="font-size: 48px; font-weight: 600; color: black;">เข้าสู่ระบบ</h1>

                    <div class="data-input">
                        <div class="email">
                            <label class="label kanit" for="email">อีเมล</label>
                            <input type="email" bind:value={email} class="kanit email-input" placeholder="ป้อนอีเมลของท่าน">
                        </div>
                        <div class="password">
                            <label class="label kanit" for="password">รหัสผ่าน</label>
                            <input type="password" bind:value={password} class="kanit password-input" placeholder="ป้อนอีเมลของท่าน">
                        </div>
                    </div>
                    
                    <button class="submit-button kanit">ยืนยัน</button>
                </form>
                {:else}
                    <form on:submit|preventDefault={register} class="form-register">
                        <h1 class="header kanit" style="font-size: 48px; font-weight: 600; color: black;">ลงทะเบียน</h1>

                        <div class="data-input">
                            <div class="email">
                                <label class="label kanit" for="email">อีเมล</label>
                                <input type="email" bind:value={email} class="kanit email-input" placeholder="ป้อนอีเมลของท่าน">
                            </div>
                            <div class="password">
                                <label class="label kanit" for="password">รหัสผ่าน</label>
                                <input type="password" bind:value={password} class="kanit password-input" placeholder="ป้อนอีเมลของท่าน">
                            </div>
                        </div>
                        
                        <button class="submit-button kanit">ยืนยัน</button>
                    </form>
            {/if}

            
        </div>
    </div>
</section>

<style lang="scss">
    .main-section {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        background-color: #F4F9F9;
        .wrapper {
            width: 100%;
            height: 100%;
            background-color: white;   
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            .back {
                position: absolute;
                top: 0;
                left: 0;
                margin: 1rem;
                width: 100px;
                height: 100px;
                border-radius: 35px;
                border: 3px solid white;
                background-color: white;
                transition: 0.15s ease-out;
                cursor: pointer;

                &:hover {
                    border-color: #FFCB66;
                }
            }

            .container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                justify-content: center;
                padding: 4rem 0;

                .output-container {
                    margin-top: 1rem;
                    padding: 0.5rem 1rem;
                    border: 1px solid #2E7D32;
                    border-radius: 7px;
                    background-color: white;
                    color: #2E7D32;

                    .header {
                        font-size: 1rem;
                        font-weight: 400;
                    }
                }
                .row-selection {
                    
                    display: flex;
                    align-items: center;
                    column-gap: 2rem;

                    div {
                        cursor: pointer;
                        transition: 0.15s ease-out;

                        .header {
                            font-size: 1.5rem;
                            font-weight: 400;
                            transition: 0.15s ease-out;
                        }

                        
                    }
                    .clicked {
                        border-bottom: 4px solid #4FD1C5;
                    }
                }
                .form-login {
                    width: 50%;
                    height: 60%;
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;
                    justify-content: space-evenly;

                    .data-input {
                        width: 40%;
                        display: flex;
                        flex-flow: column nowrap;
                        align-items: flex-start;
                        row-gap: 1rem;
                        div {
                            width: 100%;
                            display: flex;
                            flex-flow: column nowrap;
                            align-items: flex-start;
                            row-gap: 0.5rem;
                            label {
                                font-size: 16px;
                                font-weight: 300;
                                color: black;
                            }
                            input {
                                width: 100%;
                                height: 40px;
                                border: 1px solid #D1D5DB;
                                border-radius: 7px;
                                padding: 0 1rem;
                                font-size: 1rem;
                                font-weight: 400;
                            }
                        }
                    }
                    .submit-button {
                        width: 40%;
                        height: 40px;
                        font-size: 1rem;
                        font-weight: 400;
                        color: white;
                        background-color: #4FD1C5;
                        border: 2px solid #4FD1C5;
                        border-radius: 7px;
                        transition: 0.15s ease-out;
                        cursor: pointer;

                        &:hover {
                            background: transparent;
                            color: black;
                        }

                    }
                }

                .form-register {

                    @extend .form-login
                }
            }

        }
    }
</style>