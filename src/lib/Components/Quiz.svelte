<script lang='ts'>
    import { createEventDispatcher } from "svelte";

    export let question: string;
    export let options: string[];
    export let correctAnswer: string;
    export let questionNumber: number;


    
    let dispatch = createEventDispatcher();
    let optionsSelected: boolean[] = [false, false, false, false]

    const selectedOption = (id: number) => {
        optionsSelected[optionsSelected.findIndex((data) => data == true)] = false;
        optionsSelected[id] = true;

        dispatch("answer", {
            answer: options[id],
            questionNumber: questionNumber,
        })
    }
</script>

<div class="quiz">
    <h2 class="question kanit" style="font-size: 24px; font-weight: 500; text-align: left">{questionNumber}. {question}</h2>
    <div class="options">
        {#each options as option, id}
            <button class={"option"+id} on:click={() => selectedOption(id)} class:selected={optionsSelected[id]}>{option}</button>
        {/each}
    </div>

</div>


<style lang="scss">
    .quiz {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;

        .options {
            margin-top: 1rem;
            display: flex;
            flex-flow: column nowrap;
            row-gap: 1rem;

            button {
                width: 100%;
                height: 50px;
                background-color: #F9FAFB;
                border: 1px solid #D1D5DB;
                border-radius: 7px;
                cursor: pointer;
                font-family: "Kanit", sans-serif;
                font-size: 18px;
                font-weight: 400;
                text-align: left;
                padding: 0 1rem;
                transition: 0.15s ease-out;
            }

            .selected {
                border: 2px solid #2563EB;
                background-color: #3B82F6;
                color: white;
            }
        }
    }
</style>