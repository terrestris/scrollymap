<script lang="ts">
  import { parse as parseYaml } from "yaml";
  import Scrolly from "./components/Scrolly.svelte";
  import Map from "./components/Map.svelte";
  import Chart from "./components/Chart.svelte";
  import { step } from "./store/step";
  import { marked } from "marked";
  import Header from "./components/Header.svelte";

  import type { Config } from "./types";


  /* By Connor Rothschild https://twitter.com/CL_Rothschild
	Scrollytelling component from Russell Goldenberg https://twitter.com/codenberg/status/1432774653139984387
  https://svelte.dev/repl/82181dc9c8c04053a7ebabd03c654d1d?version=4.0.1 */

  // read config
  const getConfig = () => {
    const url = new URL(window.location.href);
    const path = url.searchParams.get("config");
    if (!path) {
      console.error("No config path defined.");
    }
    return path;
  };
  const path = getConfig();
  const promise = fetch(path)
    .then((response) => response.text())
    .then((text) => parseYaml(text) as Config)
  // TODO error handling

  const basePath = location.origin + location.pathname;
</script>

{#if !path}
  <div class="error">
    <div>
      <p>Please define config path as search param, e.g.:</p>
      <a href="{basePath}?config=/scrollymap/storyBoard.yml"> {basePath}?config=/scrollymap/storyBoard.yaml</a>
    </div>
  </div>
{:else}
  {#await promise}
    <div>Waiting</div>
  {:then config}
    <div class="map">
      <Map steps={config.steps} />
    </div>
    <section>
      {#if config.title}
        <Header title={config.title} subTitle={config.subTitle} />
      {/if}
      <div class="section-container">
          <Scrolly bind:value={$step}>
            {#each config.steps as s, i}
              <div class="step" class:active={$step === i}>
                <div class="step-content">
                  {#if s.content}
                    {@html marked.parse(s.content)}
                  {:else if s.chart}
                    <Chart config={s.chart} />
                  {/if}
                  {#if s.attribution}
                    <span class="attribution">{@html s.attribution}</span>
                  {/if}
                </div>
                <p />
              </div>
              {/each}
              <!-- <div class="spacer" /> -->
          </Scrolly>
      </div>
    </section>
    <!-- TODO error handling
       {:catch error}
    <p>{error.message}</p> -->
  {/await}
{/if}

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Rosario:ital,wght@0,300..700;1,300..700&display=swap");

  :global(body) {
    overflow-x: hidden;
    font-family: "Rosario", sans-serif;
    font-optical-sizing: auto;
    background: #ffffff;
    margin: 0;
  }

  :global(.error) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  :global(.step-content img) {
    width: 100%;
  }

  :global(.attribution) {
    font-size: 0.75rem;
  }

  // .spacer {
  //   height: 25vh;
  // }

  .map {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: -10;
  }

  .section-container {
    width: 33vw;
  }

  .step {
    height: 125vh;
    display: flex;
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
    margin: auto;
    max-width: 28vw;
  }

  .step.active .step-content {
    background: white;
    color: black;
  }

  /* Comment out the following line to always make it 'text-on-top' */
  @media screen and (max-width: 768px) {
    .section-container {
      flex-direction: column-reverse;
    }
  }
</style>
