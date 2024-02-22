// IMPORTS
// styling
import '../styles/mapbox.css';
// packages
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

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
        const trailName = marker.tags.name ? marker.tags.name : 'None Provided';
        const innerHtmlContent = `
          <div>
            <h2>Trail Details</h2>
            <container>
              <p><span>Name:</span> ${trailName}</p>
            </container>
          </div>
        `;

        // B: create the HTMl container and the button
        const divElement = document.createElement('div');
        const assignBtn = document.createElement('div');
        assignBtn.innerHTML = `<button>Display Trail</button>`;
        divElement.innerHTML = innerHtmlContent;
        divElement.appendChild(assignBtn);

        // C: create the button to display the path
        assignBtn.addEventListener('click', (e) => {
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

        // D: add new markers
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
      <div ref={mapContainer} className='map' />
    </>
  );
}
export default Mapbox;
