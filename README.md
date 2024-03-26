# Scrollymap ✒️🌍

A svelte.js and openlayers based scrolly map application.

## Purpose 💡

Create a scrollytelling map application with a simple configuration.

## Features 🍜

- Basemaps
- Topic layers
- Highlight ares (rectangle)
- Show markdown Content (video, graphics)
- charts (echarts)
- clustering of data point layer

## Development 👨‍💻

[bun.sh](https://bun.sh) is used as bundler (Node.js compatible).  

Install the dependencies...

```bash
bun i
```

```bash
bun run dev
```

Open example application `http://localhost:5173/?config=public/storyBoard.yml`.

## Building and running in production mode 🏗️

To create an optimised version of the app:

```bash
bun run build
```

Put all files in `dist` on your webserver, or test it locally, e.g. `python3 -m http.server`.

## Configuration ⚙️

See example: `public/storyBoard.yml`.

# Credits

- Russel Goldenberg (https://pudding.cool)
