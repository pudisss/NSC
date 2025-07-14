<script lang="ts">
  import type { PageServerData } from "./$types"
  import { labsData } from "../../../lib/data/LabData";
	import { goto } from "$app/navigation";

  export let data: PageServerData;
 
  const { id } = data;

  const clickedLab = labsData.filter((data) => data.id == Number(id))

  console.log(clickedLab)


  const goBack = () => history.back();

</script>

<section class="main-section">
  <div class="backdrop"></div>
  <img src="/assets/experimental.jpg" alt="" class="image">
  <div class="wrapper">
    <button class="back-button" on:click={goBack}>
      <img src="/assets/door.svg" alt="" class="back">
    </button>
    <div class="text-section">
      <h1 class="header kanit" style="font-size: 128px; font-weight: 600;">การทดลอง</h1>
      <h3 class="subheader sarabun" style="font-size: 32px; font-weight: 400">อัตราการเกิดปฏิกิริยาจากปัจจัยต่างๆ</h3>

      <button class="play-button kanit" on:click={() => goto(`/game/${id}/tools`)}>
        ต่อไป
      </button>
    </div>

  </div>
</section>


<style lang="scss">

  .main-section {
    width: 100%;
    height: 100vh;
    position: relative;

    .wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .back-button {
        width: 100px;
        height: 100px;
        background-color: white;
        border: none;
        border-radius: 35px;
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        margin: 1rem;

      }

      .text-section {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        color: white;

        .play-button {
          width: 300px;
          height: 70px;
          border: none;
          border-radius: 7px;
          background-color: #4FD1C5;
          cursor: pointer;
          font-size: 40px;
          font-weight: 500;
          margin-top: 5rem;
        }
      }
    }

    .backdrop {
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.6);
      position: absolute;
      top: 0;
      z-index: -1;

      
    }

    .image {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      z-index: -2;
    }
  }

</style>