export const updateView = (config, view) => {
    view.animate(
        {center: config.center},
        {zoom: config.zoom}
    );
};
