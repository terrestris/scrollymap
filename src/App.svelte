<script lang="ts">
  import { parse as parseYaml } from "yaml";
  import Scrolly from "./Scrolly.svelte";
  import Map from "./Map.svelte";
  import Chart from "./Chart.svelte";
  import { step } from "./store/step";
  import { marked } from "marked";

  /* By Connor Rothschild https://twitter.com/CL_Rothschild
	Scrollytelling component from Russell Goldenberg https://twitter.com/codenberg/status/1432774653139984387 */

  // read config
  const promise = fetch("/example/storyBoard.yml").then((response) =>
    response.text().then((text) => parseYaml(text)),
  );

</script>

{#await promise then config}
  <div class="map">
    <Map {config} />
  </div>
  <section>
    <div class="hero">
      {#if config.title}
        <h1>
          {config.title}
        </h1>
      {/if}
      {#if config.subTitle}
        <h2>
          {config.subTitle}
        </h2>
        <hr />
      {/if}
    </div>
    <div class="section-container">
      <div class="steps-container">
        <Scrolly bind:value={$step}>
          {#each config.steps as text, i}
            <div class="step" class:active={$step === i}>
              <div class="step-content">
                {#if text.content}
                  {@html marked.parse(text.content)}
                {:else if text.chart}
                  <Chart {config} />
                {/if}
              </div><p/>
            </div>
          {/each}
          <div class="spacer" />
        </Scrolly>
      </div>
    </div>
  </section>
{/await}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Rosario:ital,wght@0,300..700;1,300..700&display=swap');

  :global(body) {
    overflow-x: hidden;
    font-family: "Rosario", sans-serif;
    font-optical-sizing: auto;
    background: #ffffff;
    margin: 0;
  }

  :global(.step-content img) {
    width: 100%;
  }

  .hero {
    height: 20vh;
    display: flex;
    place-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background: rgba(255,255,255,0.9);
  }
  .hero hr {
    width: 90%;
  }
  .hero h1 {
    margin-top: 0;
    font-weight: 800;
    font-size: xxx-large;
  }

  .hero h2 {
    margin-top: 0;
    font-weight: 200;
    font-size: x-large;
  }

  .spacer {
    height: 40vh;
  }

  .map {
    position: fixed;
    /* top: 20vh; */
    width: calc(100vw); /** body padding + scrollbar width */
    height: calc(100vh);
    z-index: -10
  }

  .section-container {
    width: 30vw;
    margin-top: 1em;
    text-align: center;
    transition: background 100ms;
    display: flex;
  }

  .step {
    height: 100vh;
    display: flex;
    place-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .step-content {
    font-size: 1.75rem;
    background: whitesmoke;
    color: #ccc;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: background 500ms ease;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
    text-align: left;
    /* width: 75%; */
    margin: auto;
    max-width: 500px;
  }

  .step.active .step-content {
    background: white;
    color: black;
  }

  .steps-container {
    height: 100%;
    flex: 1 1 30%;
    z-index: 10;
  }

  /* Comment out the following line to always make it 'text-on-top' */
  @media screen and (max-width: 768px) {
    .section-container {
      flex-direction: column-reverse;
    }
  }
</style>
