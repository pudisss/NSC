<script lang="ts">

    import { goto } from "$app/navigation";
	
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    const { score, questionLength, message, success, id } = data;
    const goBack = () => history.back();
</script>

<section class="main-section">
    
    <div class="wrapper">

        <button class="back-button" on:click={goBack}>
            <img src="/back-arrow.svg" alt="" class="back-icon">
        </button>

        <div class="container">
            <h1 class="header kanit" style="font-size: 96px; font-weight: 500; color: #D32F2F;">คุณไม่ผ่านการทดสอบ</h1>
            <h3 class="score kanit">คุณได้ {score}/{questionLength} คะแนน</h3>
            <h4 class="message kanit">{message}</h4>
            <div class="row-button">
                <button class="do-again-button" on:click={() => goto("/quiz/"+data.id.toString())}>ทำใหม่</button>
                <button class="to-menu" on:click={() => goto(`/quiz/${id}/report`)}>ต่อไป</button>
            </div>
        </div>
    </div>
</section>

<style lang="scss">

    .main-section {
        width: 100%;
        height: 100vh;

        background-color: #F4F9F9;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem;

        .wrapper {
            width: 100%;
            height: 100%;
            background-color: #FFFFFF;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            .container {
                

                display: flex;
                flex-flow: column nowrap;
                align-items: center;

                .row-button {
                    width: 100%;
                    margin-top: 7rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    button {
                        width: 150px;
                        height: 50px;
                        border: 2px solid #4FD1C5;
                        background-color: #4FD1C5;
                        color: white;
                        font-family: "Kanit", sans-serif;
                        font-size: 1.5rem;
                        font-weight: 500;
                        border-radius: 7px;
                        transition: 0.15s ease-out;
                        cursor: pointer;

                        &:hover {
                            background-color: white;
                            color: black;
                        }
                    }
                }
            }
            .back-button {
                position: absolute;
                top: 0;
                left: 0;
                width: 100px;
                height: 100px;
                background-color: white;
                border: 2px solid white;
                transition: 0.15s ease-out;
                border-radius: 35px;
                cursor: pointer;
                margin: 1rem;
                &:hover {
                    border-color: #FFCB66;
                }
            }
        }
    }
</style>