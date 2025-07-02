<script lang="ts">

const goBack = () => {
    history.back()
}

// Imagine data
const labsData = [
    {
        done: true,
        name: "การทดลองครั้งที่ 1",
        level: "4",
        stars: 2,
    },
    {
        done: false,
        name: "การทดลองครั้งที่ 2",
        level: "5",
        stars: 2,
    },
    {
        done: false,
        name: "การทดลองครั้งที่ 3",
        level: "5",
        stars: 2,
    },
    {
        done: true,
        name: "การทดลองครั้งที่ 4",
        level: "4",
        stars: 2,
    },
    {
        done: false,
        name: "การทดลองครั้งที่ 5",
        level: "6",
        stars: 2,
    },
    {
        done: false,
        name: "การทดลองครั้งที่ 6",
        level: "6",
        stars: 2,
    },
    {
        done: false,
        name: "การทดลองครั้งที่ 7",
        level: "4",
        stars: 2,
    },
    {
        done: true,
        name: "การทดลองครั้งที่ 8",
        level: "5",
        stars: 2,
    },
    {
        done: true,
        name: "การทดลองครั้งที่ 9",
        level: "6",
        stars: 2,
    },


]
</script>


<section class="main-section">
    <div class="wrapper">
        <div class="flex-container">
            <div class="button-row">
                <button class="back" on:click={goBack}>
                    <img src="./back.svg" alt="" class="back-icon">
                </button>
                <button class="settings">
                    <img src="./settings.svg" alt="" class="settings-icon">
                </button>
            </div>

            <div class="lab-menu">
                <!-- Search bar -->
                <form class="search">
                    <input type="text" class="search-input kanit" style="font-weight: 400; color: #707070; font-size: 24px; padding: 0 2rem" placeholder="ค้นหา">

                    <select class="school-tag kanit" style="font-weight: 400; margin-top: 2rem; font-size: 20px" id="School-tag" name="School-tag">
                        <option value="" disabled selected class="default-selected-options" style="text-align: center">เรียงตาม</option>
                        <option value="m1">มัธยมศึกษาปีที่ 1</option>
                        <option value="m2">มัธยมศึกษาปีที่ 2</option>
                        <option value="m3">มัธยมศึกษาปีที่ 3</option>
                        <option value="m4">มัธยมศึกษาปีที่ 4</option>
                        <option value="m5">มัธยมศึกษาปีที่ 5</option>
                        <option value="m6">มัธยมศึกษาปีที่ 6</option>
                    </select>
                </form>

                <div class="labs">
                    {#each labsData as data, id}
                        <div class="container">
                            {#if data.done}
                                <img src="./done.svg" alt="" class="done-image">
                                {:else}
                                    <img src="./undone.svg" alt="" class="undone-image">
                            {/if}
                            <h3 class="lab-name">LAB {id}: {data.name}</h3>
                            <h3 class="level">ชั้นมัธยมศึกษาปีที่ {data.level}</h3>
                            <div class="stars">
                                {#each Array.from({ length: data.stars }) as _, i}
                                    <img src="./star.svg" alt="" class="rate">
                                {/each}
                            </div>

                        </div>
                    {/each}

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
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-flow: column nowrap;


                .button-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    position: relative;
                    top: 0;

                    .back {
                    
                        margin: 1rem;
                        width: 100px;
                        height: 100px;
                        border-radius: 35px;
                        background-color: #FFFFFF;
                        border: none;
                        transition: 0.2s ease-in;
                        cursor: pointer;
                        

                        
                    }

                    .settings {
                        
                        margin: 1rem;
                        width: 100px;
                        height: 100px;
                        border-radius: 35px;
                        background-color: #FFFFFF;
                        border: none;
                        transition: 0.2s ease-in;
                        cursor: pointer;

                    }
                }

                .lab-menu {
                    width: 80%;
                    height: 100%;
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;

                    .search {
                        width: 100%;
                        display: flex;
                        flex-flow: column nowrap;
                        align-items: center;
                        justify-content: center;
                        padding: 0 4rem;

                        position: relative;

                        .search-input {
                            width: 100%;
                            height: 60px;
                            background-color: white;
                            border: none;
                            border-radius: 10px;

                            background-image: url('./search.svg');
                            background-position: 98% 50%;
                            background-repeat: no-repeat;
                        }
                        .school-tag {
                            align-self: flex-end;
                            appearance: none;
                            padding: 15px 10px;
                            background-color: white;
                            border-radius: 10px;
                            border: none;
                            
                            

                            
                        

                        }
                        
                    }
                    .labs {
                        display: flex;
                        flex-flow: column nowrap;
                        align-items: center;
                        width: 100%;
                        height: 100%;
                    }
                }
                
                

            }
            
        }
    }

</style>
