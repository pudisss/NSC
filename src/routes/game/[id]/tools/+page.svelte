<script lang="ts">
    import type { PageServerData } from "./$types";
    import { labsData } from "../../../../lib/data/LabData";
	import { goto } from "$app/navigation";

    export let data: PageServerData;
    const { id } = data;

    // Get the selected lab from the id from the URL
    const clickedLab = labsData.filter((data) => data.id == Number(id))[0]
    
    const equipment_path = clickedLab["equipment_path"];
    
    const equipment_names = Object.keys(equipment_path)
    
    
</script>

<section class="main-section">
    <div class="wrapper">
        <div class="button-row">
            <button class="back-button" on:click={() => history.back()}>
                <img src="/assets/back-arrow.svg" alt="" class="back-icon">
            </button>
            <button class="forward-button">
                <img src="/assets/forward.svg" alt="" class="forward-icon">
            </button>
        </div>

        <div class="container">

            {#each equipment_names as name}

                <div class="equp-container">
                    <img src={equipment_path[name]} alt="">
                    <h2 class="header kanit">{name}</h2>
                </div>
            {/each}

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
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;

            .button-row {
                width: 100%;
                
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem;

                button {
                    
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
            .container {
                width: 100%;
                height: 100%;
                display: flex;
                
                align-items: flex-start;
                justify-content: center;
                flex-flow: row wrap;
                padding: 2rem;
                overflow-y: scroll;

                div {
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;

                    img {
                        width: 200px;
                        height: 200px;
                    
                    }
                }

                
            }
        }
    }
    

</style>