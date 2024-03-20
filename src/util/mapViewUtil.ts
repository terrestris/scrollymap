import {upAndDown} from 'ol/easing';

export const updateView = (config, view) => {
    if (!config || !view) {
        return;
    }
    view.animate(
        {center: config.center},
        {zoom: config.zoom},
        {rotation: config.rotation || 0},
        {easing: upAndDown},
        {duration: 2000}
    );
};
