<script lang="ts">
    export let title: string;
    export let subTitle: string;
</script>

<div class="header">
    <h1>{title}</h1>
    <h2>{subTitle}</h2>
</div>

<style lang="scss">
    .header {
        height: 20vh;
        display: flex;
        place-items: center;
        flex-direction: column;
        justify-content: center;
        background: rgba(255, 255, 255, 0.9);
        h1 {
            margin-top: 0;
            font-weight: 800;
            font-size: xxx-large;
        }
        h2 {
            margin-top: 0;
            font-weight: 200;
            font-size: x-large;
        }
    }
</style>
