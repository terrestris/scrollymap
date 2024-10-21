<script lang="ts">
  import { onMount } from "svelte";
  
  // Define prop types
  export let root: HTMLElement | null = null;
  export let top: number = 0;
  export let bottom: number = 0;
  export let increments: number = 100;
  export let value: number = 0;

  // Local variables with specific types
  const steps: number[] = [];
  const threshold: number[] = [];
  let nodes: NodeListOf<HTMLElement> = document.querySelectorAll('.dummySelector'); // Initialize with an empty NodeList
  let intersectionObservers: IntersectionObserver[] = [];
  let container!: HTMLElement; // "!" asserts that container will be initialized later

  // Watch for changes in 'top' or 'bottom' and trigger update
  $: top, bottom, update();

  // Update function to create observers for each node
  const update = (): void => {
    if (!nodes.length) return;
    nodes.forEach((node, index) => createObserver(node, index));
  };

  // Function to determine which item is most in view
  const mostInView = (): void => {
    let maxRatio = 0;
    let maxIndex = 0;
    for (let i = 0; i < steps.length; i++) {
      if (steps[i] > maxRatio) {
        maxRatio = steps[i];
        maxIndex = i;
      }
    }

    value = maxRatio > 0 ? maxIndex : 0;
  };

  // Function to create an observer for a node
  const createObserver = (node: HTMLElement, index: number): void => {
    const handleIntersect = (entries: IntersectionObserverEntry[]): void => {
      const ratio = entries[0].intersectionRatio;
      steps[index] = ratio;
      mostInView();
    };

    const marginTop = top ? top * -1 : 0;
    const marginBottom = bottom ? bottom * -1 : 0;
    const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
    const options: IntersectionObserverInit = { root, rootMargin, threshold };

    if (intersectionObservers[index]) intersectionObservers[index].disconnect();

    const io = new IntersectionObserver(handleIntersect, options);
    io.observe(node);
    intersectionObservers[index] = io;
  };

  // onMount to set up the component after it mounts
  onMount((): void => {
    for (let i = 0; i < increments + 1; i++) {
      threshold.push(i / increments);
    }
    // Query all child elements
    nodes = container.querySelectorAll(":scope > *") as NodeListOf<HTMLElement>;
    update();
  });
</script>

<div bind:this={container}>
  <slot />
</div>
