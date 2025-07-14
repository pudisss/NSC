<script lang="ts">
    import { goto } from "$app/navigation";

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

                .settings {
                    position: absolute;
                    top: 0;
                    right: 0;
                    margin: 1rem;
                    width: 100px;
                    height: 100px;
                    border-radius: 35px;
                    background-color: #FFFFFF;
                    border: none;
                    transition: 0.2s ease-in;
                    cursor: pointer;
                    

                    
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