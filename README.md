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

## Configuration ⚙️

- Simple `yaml` configuration
- See full example: `public/storyBoard.yml`
- Predefined baselayers:

| **config id** | **info**                                       | **extent**              | **link**        |
|---------------|------------------------------------------------|-------------------------|-----------------|
| osm           | OSM                                            | world                   | [GetMap](https://tile.openstreetmap.org/13/4287/2589.png)|
| topplus-bkg   | TopPlusOpen BKG                                | world                   | [GetMap](https://sgx.geodatenzentrum.de/wms_topplus_open?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=7.903145512574434761%2C53.96206434720841116%2C9.199377670919263394%2C55.35179002308666441&CRS=CRS%3A84&WIDTH=818&HEIGHT=878&LAYERS=web&STYLES=&FORMAT=image%2Fpng&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi%3A96&TRANSPARENT=TRUE)|
| sen2europe    | Mosaic based on Sentinel-2-Data by BKG         | europe                  | [GetMap](https://sgx.geodatenzentrum.de/wms_sen2europe?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=54.00168024446833925%2C7.795390272027431067%2C55.3914059203465925%2C9.0916224303722597&CRS=EPSG%3A4326&WIDTH=818&HEIGHT=878&LAYERS=rgb&STYLES=&FORMAT=image%2Fpng&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi%3A96&TRANSPARENT=TRUE)|
| sentinel-rgb  | Sentinel Mosaik by mundialis (channels 040302) | selected areas wordwide | [GetCapabilities](https://geoserver.mundialis.de/geoserver/wms?SERVICE=WMS&REQUEST=GetCapabilities) |
| sentinel-comp | Sentinel Mosaik by mundialis (channels 8A1104) | selected areas wordwide | [GetCapabilities](https://geoserver.mundialis.de/geoserver/wms?SERVICE=WMS&REQUEST=GetCapabilities) |

**Note:** Please consider to cache the layers to archive best performance.

- chart: See `storyBoard.yml` for an example
- dataLayer:
    - Cluster point features from a geojson file
    - Prototype, feel free to contribute!
    - See `storyBoard.yml` for an example

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

# Credits

- Russel Goldenberg (https://pudding.cool)
