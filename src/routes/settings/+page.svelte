<script lang="ts">
    const goBack = () => {
        history.back()
    }
</script>

<section class="main-section">
    <div class="wrapper">
        <div class="flex-container">
            <button class="back" on:click={goBack}>
                
                    <img src="./assets/back.svg" alt="" class="back-icon">
                
            </button>
            <div class="container">
                <div class="content">
                    <h1 class="header kanit" style="font-weight: 500; color: #333333; font-size: 48px">
                        การตั้งค่า
                    </h1>

                    <form action="" class="settings">
                        <div class="volumn">
                            <img src="./assets/volumn.svg" alt="" class="volumn-icon">
                            <input type="range" id="volumn" min="0" max="1" step="0.1">
                        </div>
                        <div class="music">
                            <img src="./assets/music.svg" alt="" class="music-icon">
                            <input type="range" id="music" min="0" max="1" step="0.1">
                        </div>
                    </form>

                </div>
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

                .back {
                    position: absolute;
                    top: 0;
                    left: 0;
                    margin: 1rem;
                    width: 100px;
                    height: 100px;
                    border-radius: 35px;
                    background-color: #FFFFFF;
                    border: none;
                    transition: 0.2s ease-in;
                    cursor: pointer;
                    

                    
                }
                .container {
                    width: 60%;
                    height: 60%;
                    background-color: white;
                    border-radius: 40px;
                    border: none;
                    padding: 2rem;
                    .content {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-flow: column nowrap;
                        align-items: center;

                        form.settings {
                            display: flex;
                            flex-flow: column nowrap;
                            align-items: center;
                            width: 100%;
                            height: 100%;
                            margin-top: 3rem;

                            div {
                                width: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                column-gap: 3rem;

                                input {
                                    width: 60%;
                                    height: 10px;
                                    appearance: none;
                                    background: #3BAEA0;
                                    border-radius: 7px;
                                }
                            }
                        }
                        
                    }
                }

            }
            
        }
    }

</style>