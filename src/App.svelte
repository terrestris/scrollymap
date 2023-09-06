<script lang="ts">
  import { parse as parseYaml } from "yaml";
  import Scrolly from "./Scrolly.svelte";
  import Map from "./Map.svelte";
  import { step } from "./store/step";

  /* By Connor Rothschild https://twitter.com/CL_Rothschild
	Scrollytelling component from Russell Goldenberg https://twitter.com/codenberg/status/1432774653139984387 */

  // read config
  const promise = fetch("http://localhost:5173/storyBoard.yml").then(
    (response) => response.text().then((text) => parseYaml(text))
  );
</script>

<section>
  {#await promise then config}
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
        <hr/>
      {/if}
    </div>
    <div class="section-container">
      <div class="steps-container">
        <Scrolly bind:value={$step}>
          {#each config.steps as text, i}
            <div class="step" class:active={$step === i}>
              <div class="step-content">{@html text.content}</div>
            </div>
          {/each}
          <div class="spacer" />
        </Scrolly>
      </div>
      <div class="sticky">
        <Map {config} />
      </div>
    </div>
  {/await}
</section>

<style>
  :global(body) {
    overflow-x: hidden;
    font-family: "Nanum Myeongjo", normal;
    background: #ffffff;
  }

  .hero {
    height: 20vh;
    display: flex;
    place-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;
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

  .sticky {
    position: sticky;
    top: 5vh;
    flex: 1 1 70%;
    width: 70%;
  }

  .section-container {
    margin-top: 1em;
    text-align: center;
    transition: background 100ms;
    display: flex;
  }

  .step {
    height: 80vh;
    display: flex;
    place-items: center;
    justify-content: center;
  }

  .step-content {
    font-size: 1.5rem;
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
    width: 75%;
    margin: auto;
    max-width: 500px;
  }

  .step.active .step-content {
    background: white;
    color: black;
  }

  .steps-container,
  .sticky {
    height: 100%;
  }

  .steps-container {
    flex: 1 1 30%;
    z-index: 10;
  }

  /* Comment out the following line to always make it 'text-on-top' */
  @media screen and (max-width: 768px) {
    .section-container {
      flex-direction: column-reverse;
    }
    .sticky {
      width: 95%;
      margin: auto;
    }
  }
</style>
