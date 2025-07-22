<script lang="ts">
    let email: string = "";
    let password: string = "";
    
    const login = async() => {
        const res = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});

		const data = await res.json();
		console.log(data);
    }
</script>

<section class="main-section">
    <div class="wrapper">
        <div class="container">
            <form on:submit|preventDefault={login} class="form">
                <h1 class="header kanit">เข้าสู่ระบบ</h1>

                <div class="email">
                    <label class="label kanit" for="email">อีเมล</label>
                    <input type="email" bind:value={email} class="email-input" placeholder="ป้อนอีเมลของท่าน">
                </div>
                <div class="password">
                    <label class="label kanit" for="password">รหัสผ่าน</label>
                    <input type="password" bind:value={password} class="password-input" placeholder="ป้อนอีเมลของท่าน">
                </div>
                
                <button class="submit-button">ยืนยัน</button>
            </form>
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

            .container {
                display: flex;
                align-items: center;
                justify-content: center;
                .form {
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;

                    div {
                        display: flex;
                        flex-flow: column nowrap;
                        align-items: flex-start;
                    }
                }
            }

        }
    }
</style>