<script lang="ts">
	import { goto } from "$app/navigation";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    const { quizId, user } = data;

    let report: string = ""

    const sendReport = async() => {
        
        const res = await fetch("/api/student/quiz/report/", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ report: report, userId: user.userId, quizId: quizId})
        });
        const data = await res.json();

        if (data.success) {
            goto("/lab-menu");
        }

    }
</script>


<section class="report-section">
    <div class="wrapper">
        <form action="" class="report-form">
            <h2 class="header kanit" style="font-size: 2rem; font-weight: 500; color: black;">รายงานอธิบายขั้นตอนการทำแลป</h2>

            <div class="input">
                <label for="reports" class="sub-header kanit" style="font-size: 1rem; font-weight: 400; color: black;">จงอธิบายการทำแลปแต่ละขั้นตอนละเอียด</label>
                <textarea bind:value={report} name="reports" class="kanit" id="reports" placeholder="เขียนรายงานของคุณตรงนี้"></textarea>
            </div>
            <button class="submit-button kanit" on:click={sendReport} style="font-size: 1rem; font-weight: 400;">ส่ง</button>
        </form>
    </div>
</section>

<style lang="scss">
    .report-section {
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
            background-color: white;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            padding: 3rem;

            .report-form {
                height: 100%;
                width: 70%;
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                justify-content: space-between;

                .input {
                    width: 100%;
                    height: 50%;
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: flex-start;

                    #reports {
                        margin-top: 0.5rem;
                        width: 100%;
                        height: 60%;
                        padding: 0.5rem 1rem;
                        font-size: 1rem;
                        font-weight: 400;
                    }
                }
                .submit-button {
                    width: 100%;
                    height: 40px;
                    border-radius: 7px;
                    border: 2px solid #4FD1C5;
                    transition: 0.15s ease-out;
                    background-color: #4FD1C5;
                    color: white;
                    cursor: pointer;

                    &:hover {
                        background: transparent;
                        color: black;
                    }
                    
                }
            }

        }

    }
</style>