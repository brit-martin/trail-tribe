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
