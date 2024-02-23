# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<!-- === OVERPASS API === -->

<!-- language guide -->

https://wiki.openstreetmap.org/wiki/Overpass_API/Language_Guide#Selecting_areas_by_name

<!-- overpass wizard -->

Bounding Boxes:
Here (51.477,-0.001,51.478,0.001) represents the bounding box. The order of the edges is always the same:

    51.477 is the latitude of the southern edge.
    -0.001 is the longitude of the western edge.
    51.478 is the latitude of the northern edge.
    0.001 is the longitude of the eastern edge.

Simple Queries to make:
natural=peak
highway=path

<!-- REACT -->
<!-- Multiple useEffects in a single component -->

separate useEffect functions by concerns... 1. adding event listeners on mount 2. listeners for prop changes 3. api calls that make changes to props or states

https://stackoverflow.com/questions/54002792/in-general-is-it-better-to-use-one-or-many-useeffect-hooks-in-a-single-component

<!-- MAPBOX -->

<!-- adding a line to a map using geoJSON source -->

https://docs.mapbox.com/mapbox-gl-js/example/geojson-line/

<!-- git rename branch -->

https://stackoverflow.com/questions/6591213/how-can-i-rename-a-local-git-branch
git branch -m <newName>

<!-- get geolocation data from user -->

// request to get the users geolocation
useEffect(() => {
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(getGeolocation, defaultLocation);
}
}, []);

// user accepted geolocation request -> set users coordinates
const getGeolocation = (position) => {
setLng(position.coords.longitude);
setLat(position.coords.latitude);
};

// user rejected geolocation request -> set default coordinates
const defaultLocation = (error) => {
setLng(-111.8746681);
setLat(40.4194344);
};
