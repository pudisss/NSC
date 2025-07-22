

<script lang="ts">
    let user_type: string = "";
    let email: string = "";
    let password: string = "";

    let isRegisterd: boolean = false;

    const register = async() => {
        
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, user_type })
        });

        const data = await res.json();
        
        if (data.message == "User registered successfully") {
            isRegisterd = true;
        }
    }
</script>

<section class="main-section">
    <div class="wrapper">
        <div class="container">
            <form on:submit|preventDefault={register} class="form">
                <h1 class="header kanit" style="font-size: 40px">สร้างบัญชี</h1>

                <div class="email">
                    <label class="label kanit" for="email">อีเมล</label>
                    <input bind:value={email} type="email" class="email-input" placeholder="ป้อนอีเมลของท่าน">
                </div>
                <div class="password">
                    <label class="label kanit" for="password">รหัสผ่าน</label>
                    <input bind:value={password} type="password" class="password-input" placeholder="ป้อนอีเมลของท่าน">
                </div>
                <select bind:value={user_type} class="user-type kanit" style="font-weight: 400; margin-top: 2rem; font-size: 20px" id="School-tag" name="School-tag">
                    <option value="" disabled selected class="default-selected-options" style="text-align: center">ประเภทผู้ใช้</option>
                    <option value="student">นักเรียน</option>
                    <option value="teacher">คุณครู</option>
                    
                </select>
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

                        margin-top: 2rem;
                        display: flex;
                        flex-flow: column nowrap;
                        align-items: flex-start;
                        align-self: flex-start;
                        .header {
                            font-size: 36px;
                            font-weight: 500;
                            color: black;
                        }
                        label {
                            font-size: 16px;
                            font-weight: 500;
                            color: black;
                        }
                    }
                }
            }

        }
    }
</style>
