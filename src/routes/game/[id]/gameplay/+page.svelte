<script lang="ts">

    import { Data, type Scene } from "phaser";
    import type MainMenu from "$lib/labs/lab1/game/scenes/MainMenu";
    import PhaserGame, { type TPhaserRef, type LabResult} from "$lib/labs/lab1/PhaserGame.svelte";
    import { goto } from "$app/navigation";
    import type { PageData } from "./$types";

    export let data: PageData;
    let labCompleted = false;
    let labResult: LabResult | null = null;

    function handleLabCompleted(event: CustomEvent<LabResult>) {
        labCompleted = true;
        labResult = event.detail;
        console.log('Lab completed!', event.detail);
        
    }

    // Data 
    const { id } = data;
   
    
</script>

<div id="app">
    <PhaserGame on:labCompleted={handleLabCompleted}/>

    <div class="button-overlay">
        <div class="row">
            <button class="lab-menu-button" on:click={() => goto("/lab-menu")}>
                <img src="/assets/door.svg" alt="" class="door-image">
            </button>

            <div class="column">
                <button class="setting-button" on:click={() => goto("/settings")}>
                    <img src="/assets/settings.svg" alt="" class="setting-icon">
                </button>

                <button class="learning-button" on:click={() => goto(`/learning/${id}`)}>
                    <img src="/assets/archive.svg" alt="" class="archive-button">
                </button>
            </div>
        </div>
    </div>

    <div class="lab-finished-overlay" class:hidden={!labCompleted}>
        <div class="container">
            <h1 class="header kanit" style="font-size: 96px; font-weight: 500">ยินดีด้วย</h1>
            <h3 class="sub-header kanit" style="font-size: 36px; font-weight: 400">คุณสำเร็จการทำแลปแล้ว<br>ทดสอบความรู้ของคุณ</h3>

            <button class="quiz-button kanit" style="font-size: 1rem; font-weight: 400; margin-top: 2rem;" on:click={() => goto(`/quiz/${id}`)}>
                quiz
            </button>

        </div>

    </div>
</div>

<style lang="scss">
    #app {
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
        overflow: hidden;
        position: relative;

        .lab-finished-overlay {
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            z-index: 3;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;

            .container {
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                justify-content: center;
                width: 80%;
                height: 50%;
                background-color: white;
                border: none;
                border-radius: 7px;

                .quiz-button {
                    width: 150px;
                    height: 50px;
                    background-color: #4FD1C5;
                    border: 2px solid #4FD1C5;
                    border-radius: 7px;
                    color: white;
                    cursor: pointer;
                    transition: 0.15s ease-out;

                    &:hover {
                        background-color: white;
                        color: black;
                    }

                }
            }
        }
        .hidden {
            display: none;
        }
        .button-overlay {
            position: absolute; 
            top: 0;
            right: 0;
            
            height: 100%;
            
            z-index: 0;
            padding: 1rem;
            
            .row {
                height: 100%;
                display: flex;
                flex-flow: column;
                align-items: center;
                justify-content: space-between;
                

                button {
                    width: 100px;
                    height: 100px;
                    background-color: white;
                    border-radius: 35px;
                    border: none;
                    transition: 0.15s ease-out;
                    border: 2px solid white;
                    cursor: pointer;

                    &:hover {
                        border-color: #FFCB66;
                    }

                }

                

                .column {
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;
                    row-gap: 1rem;
                }
            }
        }
    }
    
    
</style>
