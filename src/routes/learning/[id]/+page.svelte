<script lang="ts">
	import { goto } from "$app/navigation";
    import type { PageServerData } from "./$types";
    import { onMount } from "svelte";

    let videoId = 'kgdpC2GjQt4'
    let player: YT.Player;
    let isPlaying: boolean = false;
    let progress: number = 0;

    let playImagePath = "/assets/pause.svg"

    let isDragging = false;
    // Upload youtube iframe API
    async function loadYouTubeAPI(): Promise<void> {
        if (!window.YT) {
        await new Promise<void>((resolve) => {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            window.onYouTubeIframeAPIReady = () => resolve();
            document.body.appendChild(tag);
        });
        } else if (!window.YT.Player) {
        await new Promise<void>((resolve) => {
            window.onYouTubeIframeAPIReady = () => resolve();
        });
        }
    }

    onMount(async () => {
        await loadYouTubeAPI();

        player = new window.YT.Player('ytplayer', {
            videoId,
            playerVars: {
                controls: 0,       // Hide default controls
                modestbranding: 1, // Remove YouTube logo
                rel: 0,            // Don't show related videos at end
                showinfo: 0,       // Hide video title (legacy)
                fs: 0,             // Disable fullscreen button
                iv_load_policy: 3, // Hide annotations
                disablekb: 1       // Disable keyboard shortcuts
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
    });

    function onPlayerReady(): void {
        setInterval(() => {
            if (player && player.getDuration && !isDragging) {
                const duration = player.getDuration();
                if (duration > 0) {
                const current = player.getCurrentTime();
                progress = (current / duration) * 100;
                }
            }
        }, 500);
    }

    function onPlayerStateChange(event: YT.OnStateChangeEvent): void {
        isPlaying = event.data === window.YT.PlayerState.PLAYING;

        
    }

    function togglePlay(): void {
        if (isPlaying) {
            player.pauseVideo();
            playImagePath = "/assets/pause-.svg";
        } else {
            player.playVideo();
            playImagePath = "/assets/pause.svg";
        }
    }

    function forward10(): void {
        const time = player.getCurrentTime();
        player.seekTo(time + 10, true);
    }

    function back10(): void {
        const time = player.getCurrentTime();
        player.seekTo(time - 10, true);
    }

    function seek(e: Event): void {
        const target = e.target as HTMLInputElement;
        const duration = player.getDuration();
        const seekTime = (parseFloat(target.value) / 100) * duration;
        

        isDragging = true;

        player.seekTo(seekTime, true); 

        progress = (seekTime / duration) * 100

        
    }

    function stopDragging() {
        isDragging = false;
    }

    // Props data
    export let data: PageServerData;


    // Get the ID to get the exact learning video for each specific lab
    const {id} = data;

    
</script>


<section class="main-section">
    <div class="wrapper">
        <button class="back-button" on:click={() => history.back()}>
            <img src="/assets/back-arrow.svg" alt="" class="back-icon">
        </button>

        <div class="container">
            <h1 class="kanit header1" style="font-size: 70px; font-weight: 500">การเรียนรู้</h1>


            <div class="row-video-arrow">
                <button on:click={back10}  class="back-arrow">
                    <img src="/assets/back.svg" alt="" class="back-arrow-icon">
                </button>
                <!-- Video -->
                <div id="ytplayer"></div>
                <!-- Video -->
                <button on:click={forward10} class="forward-arrow">
                    <img src="/assets/forward.svg" alt="" class="forward-arrow-icon">
                </button>

            </div>

            <div class="progress-pause">

                <button on:click={togglePlay} class="pause">
                    <img src={playImagePath} alt="" class="pause-icon">
                </button>
                <input
                    type="range"
                    min="0"
                    max="100"
                    bind:value={progress}
                    on:input={seek}
                    on:change={stopDragging}
                    style="width: 560px; margin-top: 10px;"
                />

                

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

            .container {
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                
                .row-video-arrow {
                    display: flex;
                    align-items: center;
                    margin-top: 3rem;
                    column-gap: 3rem;

                    button {
                        width: 100px;
                        height: 100px;
                        border: 2px solid white;
                        border-radius: 35px;
                        background-color: white;
                        cursor: pointer;
                        transition: 0.15s ease-out;
                        
                        &:hover {
                            border-color: #FFCB66;
                        }
                    }
                }
                .progress-pause {
                    margin-top: 2rem;
                    display: flex;
                    flex-flow: column nowrap;
                    row-gap: 1rem;
                    align-items: center;

                    .pause {
                        width: 100px;
                        height: 100px;
                        border: 4px solid #4FD1C5;
                        border-radius: 100px;
                        background-color: #4FD1C5;

                        cursor: pointer;
                        transition: 0.15s ease-out;

                        &:hover {
                            border-color: #FFCB66;
                        }
                    }

                    input[type="range"] {
                        appearance: none;
                        width: 100%;
                        background-color: #4FD1C5;
                        height: 15px;
                    }

                }
            }
            
        }
    }
</style>