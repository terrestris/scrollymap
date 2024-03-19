export const updateView = (config, view) => {
    if (!config || !view) {
        return;
    }
    view.animate(
        {center: config.center},
        {zoom: config.zoom}
    );
};
