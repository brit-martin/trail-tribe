// IMPORTS
// styling
import '../styles/mapbox.css';
// packages
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
// icons
import AddIcon from '@mui/icons-material/Add';

mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOXTOKEN;

// TODO
// IMPORTANT - WHEN YOU MAKE A SAVE TO THIS FILE, ALL OF THE OLD MARKERS GET DELETED.
// THIS MEANS THAT WE JUST NEEDD TO CHANGE THE WAY THE MAPBOX RE-RENDERS TO FIX THE ISSUE
// OF OLD MARKERS NOT BEING DELETED

function Mapbox(props) {
  // INITS
  const map = useRef(null);
  const currentMarkers = useRef([]);
  const mapContainer = useRef(null);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    // Create the map object if it doesn't already exist
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: import.meta.env.VITE_REACT_APP_MAPBOX_STYLE,
        center: [props.lng, props.lat],
        zoom: zoom,
      });
    }

    // Everything in this check requires some locationData to be present
    if (props.locationData.length > 0) {
      // Remove previous markers
      if (currentMarkers.current.length > 0) {
        currentMarkers.current.forEach((marker) => {
          marker.remove();
        });
        currentMarkers.current = [];
      }

      // Create the Markers
      props.locationData.forEach((marker) => {
        // A: Set the HTML to place inside the popup
        const trailName = marker.tags.name ? marker.tags.name : 'No Name Provided';
        const innerHtmlContent = `
          <div>
            <container>
              <p><span>${trailName}</span></p>
              <p>${marker.id}</p>
            </container>
          </div>
        `;

        // B: create the HTMl container and the buttons
        const divElement = document.createElement('div');
        const trailBtn = document.createElement('div');
        const getPostsBtn = document.createElement('div');
        const createPostBtn = document.createElement('div');
        trailBtn.innerHTML = `<button>Display Trail</button>`;
        getPostsBtn.innerHTML = `<button>See Posts</button>`;
        createPostBtn.innerHTML = `<button>Create Posts</button>`;
        divElement.innerHTML = innerHtmlContent;
        divElement.appendChild(trailBtn);
        divElement.appendChild(getPostsBtn);
        divElement.appendChild(createPostBtn);

        // C: create trailBtn action
        trailBtn.addEventListener('click', (e) => {
          //  i: remove any existing path before making a new one
          if (map.current.getLayer('line')) {
            map.current.removeLayer('line');
            map.current.removeSource('line');
          }

          // ii: create the path array that holds all the path coords
          const trailPath = marker.geometry.map((step) => {
            return [step.lon, step.lat];
          });

          // iii: create the path
          map.current.addSource('line', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [...trailPath],
              },
            },
          });

          // iv: create the path layer
          map.current.addLayer({
            id: 'line',
            type: 'line',
            source: 'line',
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#FF4b1f',
              'line-width': 4,
            },
          });
        });

        // D: create the getPostsBtn action
        getPostsBtn.addEventListener('click', (e) => {
          console.log(marker.id);
          props.getPosts(marker.id);
        });

        // E: create the createPostBtn action
        createPostBtn.addEventListener('click', (e) => {
          console.log(marker.id);
          props.handleOpenModal(marker.id);
        });

        // F: add new markers
        const newMarker = new mapboxgl.Marker()
          .setLngLat([marker.geometry[0].lon, marker.geometry[0].lat])
          .setPopup(new mapboxgl.Popup().setDOMContent(divElement))
          .addTo(map.current);

        currentMarkers.current.push(newMarker);
      });
    }

    // Updater long and lat and zoom states
    if (map.current) {
      map.current.on('move', () => {
        props.setLng(map.current.getCenter().lng.toFixed(4));
        props.setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    }
  }, [props.locationData]);

  return (
    <>
      <div className='map__sidebar'>
        longitude: {props.lng} | Latitude: {props.lat} | Zoom: {zoom}
      </div>
      <AddIcon className='map__center' />
      <div ref={mapContainer} className='map' />
    </>
  );
}
export default Mapbox;
