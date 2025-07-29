<script lang="ts">
    import { goto } from "$app/navigation";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    const toSettings = () => {
        goto("/settings")
    }
    const toLabMenu = () => {
        goto("/lab-menu")
    }
</script>


<section class="main-section">
    <div class="wrapper">
        <div class="flex-container">
            <button class="settings" on:click={toSettings}>
                
                    <img src="./assets/settings.svg" alt="" class="settings-icon">
                
            </button>

            {#if !data.user}
                <div class="button-row">
                    <button class="student kanit" on:click={() => goto("/user/student")}>นักเรียน</button>
                    <button class="teacher kanit" on:click={() => goto("/user/teacher")}>คุณครู</button>
                </div>

                {:else }
                    <div class="button-row" data-sveltekit-preload-data>
                        <button class="dashboard kanit" on:click={() => goto("/dashboard")}>Dashboard</button>
                    </div>
                    
            {/if}
            <div class="text-section">
                <h1 class="header kanit" style="font-size: 48px; color: #333333; font-weight: 500">Prelab - ปฏิบัติการทดลองแลปวิชาเคมี</h1>
                <p class="paragraph sarabun" style="font-size: 24px; color: #707070; font-weight: 400; text-align: center">เกมจำลองการทดลองเคมีช่วยเสริมความเข้าใจและเตรียมความพร้อม <br>ก่อนทดลองจริง</p>

                <button on:click={toLabMenu} class="play-button kanit" style="font-size: 32px; font-weight: 500">เล่น</button>
            </div>
        </div>

    </div>
</section>

<style lang='scss'>

    .main-section {
        width: 100%;
        height: 100vh;
        
        background-color: #F4F9F9;

        .wrapper {
            
            height: 100%;
            position: relative;
            .flex-container {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;


                .button-row {
                    display: flex;
                    align-items: center;
                    column-gap: 1rem;
                    position: absolute;
                    top: 0;
                    left: 0;
                    margin: 1rem;

                    button {
                        padding: 0.5rem 1rem;
                        border-radius: 7px;
                        border: 2px solid white;
                        background-color: white;
                        transition: 0.15s ease-out;
                        cursor: pointer;

                        &:hover {
                            border-color: #FFCB66;
                        }

                    }
                }
                

                .settings {
                    position: absolute;
                    top: 0;
                    right: 0;
                    margin: 1rem;
                    width: 100px;
                    height: 100px;
                    border-radius: 35px;
                    background-color: #FFFFFF;
                    
                    
                    cursor: pointer;
                    border: 2px solid white;
                    transition: 0.15s ease-out;

                    &:hover {
                        border-color: #FFCB66;
                    }
                    

                    
                }
                .text-section {
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;

                    .play-button {
                        width: 300px;
                        height: 70px;
                        background-color: #4FD1C5;
                        border: none;
                        border-radius: 7px;
                        cursor: pointer;
                        margin-top: 6rem;
                        transition: 0.2s ease-in;
                        color: white;

                        &:hover {
                            border: 3px solid #4FD1C5;
                            background-color: transparent;
                            color: #4FD1C5
                        }

                    }
                }

            }
            
        }
    }


</style>