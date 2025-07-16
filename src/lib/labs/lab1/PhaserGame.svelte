<script context="module" lang="ts">

    import type { Game, Scene } from "phaser";

    export type TPhaserRef = {
        game: Game | null,
        scene: Scene | null
    };

    export type LabResult = {
        success: boolean;
    };

</script>

<script lang="ts">

    import { onMount } from "svelte";
    import StartGame from "./game/main";
    import { EventBus } from './game/EventBus';
    import { createEventDispatcher } from "svelte";

    
    const dispatch = createEventDispatcher<{
        labCompleted: LabResult;
    }>();

    onMount(() => {

        const game = StartGame("game-container");

        // Listen for lab completion
        EventBus.on('lab-completed', (data) => {
            dispatch('labCompleted', data);
        });

        // Handle window resize
        const handleResize = () => {
            game.scale.resize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            EventBus.removeAllListeners();
            window.removeEventListener('resize', handleResize);
            if (game) {
                game.destroy(true);
            }
        };

    });

</script>

<div id="game-container"></div>

<style>
    #game-container {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        z-index: -1;
    }
</style>