// IMPORTS
// styling
import '../styles/mapbox.css';
// packages
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useSelector, useDispatch } from 'react-redux';

mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOXTOKEN;

function Mapbox(props) {
  const dispatch = useDispatch();
  const reduxLocationData = useSelector((state) => state.locationData);
  // const reduxMarkers = useSelector((state) => state.currentMarkersReducer.currentMarkers);
  // console.log(reduxMarkers);
  // const [currentMarkers, setCurrentMarkers] = useState([]);
  const map = useRef(null);
  // const [map, setMap] = useState();
  const currentMarkers = useRef([]);
  console.log(currentMarkers);

  // console.log(props.locationData);
  //stores the dom element in the useRef
  const [locationData, setLocationData] = useState(props.locationData);
  const mapContainer = useRef(null);
  // const currentMarkers = [];
  // const [lng, setLng] = useState(-111.8746681);
  // const [lat, setLat] = useState(40.4194344);
  const [zoom, setZoom] = useState(12);
  // const { setBoundingBox } = props;
  // console.log('locationData:');
  // console.log(props.locationData);
  // console.log(locationData);
  // console.log('currentMarkers:');
  // console.log(currentMarkers);

  // UseEffect
  useEffect(() => {
    console.log('== Mapbox UseEffect ==');
    // console.log('made it to useEffect!');
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: import.meta.env.VITE_REACT_APP_MAPBOX_STYLE,
        center: [props.lng, props.lat],
        zoom: zoom,
      });
    }
    console.log(map);

    map.current.on('load', () => {});

    // console.log('made it past the return statement');

    console.log('setting locationData');
    setLocationData(props.locationData);

    //step two: add markers to map---------------------------------------
    // TODO - create the popup stuff

    console.log('checking locationData.length');

    if (props.locationData.length > 0) {
      console.log('locationData greater than 0');

      // remove all current markers
      console.log('checking currentMarkers.length');
      // if (currentMarkers.current.length > 0) {
      if (map.current._markers.length > 0) {
        console.log(map.current._markers);
        console.log('removing all currentMarkers');
        map.current._markers.forEach((marker, idx) => {
          console.log(marker);
          // marker.remove();
          // currentMarkers.current.shift(idx);
          // setCurrentMarkers(currentMarkers[idx].remove());
          marker.remove();
        });
      }

      props.locationData.forEach((marker) => {
        const trailName = marker.tags.name ? marker.tags.name : 'None Provided';
        // console.log(marker);

        // 1: Set the HTML to place inside the popup
        const innerHtmlContent = `
          <div>
            <h2>Trail Details</h2>
            <container>
              <p><span>Name:</span> ${trailName}</p>
            </container>
          </div>
        `;

        // 2: create the HTMl container and the button
        const divElement = document.createElement('div');
        const assignBtn = document.createElement('div');
        assignBtn.innerHTML = `<button>Display Trail</button>`;
        divElement.innerHTML = innerHtmlContent;
        divElement.appendChild(assignBtn);

        // 3: create the button event listener
        assignBtn.addEventListener('click', (e) => {
          console.log('== Clicked Marker ==');
          // console.log(e.target);
          // console.log(marker);
          const trailPath = marker.geometry.map((step, idx) => {
            // if (idx !== 0 && idx !== marker.geometry[marker.geometry.length - 1]) {
            console.log(step);
            return [step.lon, step.lat];
            // }
          });
          trailPath.shift();
          trailPath.pop();

          if (map.current.getLayer('line')) {
            map.current.removeLayer('line');
            map.current.removeSource('line');
          }

          map.current.addSource('line', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [
                  [marker.geometry[0].lon, marker.geometry[0].lat], // start coordinates [lng, lat]
                  ...trailPath, // additional point
                  [marker.geometry[marker.geometry.length - 1].lon, marker.geometry[marker.geometry.length - 1].lat], // end coordinates [lng, lat]
                  // [-122.4293, 37.7699], // additional point
                ],
              },
            },
          });

          console.log(map.current.getSource('line'));

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

        // console.log(marker.geometry[0].lon);
        // console.log(marker.geometry[0].lat);
        // console.log(marker.lng);
        // console.log(marker.lat);

        // add new markers
        console.log('creating new markers');
        const newMarker = new mapboxgl.Marker()
          .setLngLat([marker.geometry[0].lon, marker.geometry[0].lat])
          .setPopup(new mapboxgl.Popup().setDOMContent(divElement))
          .addTo(map.current);
        currentMarkers.current.push(newMarker);
        // dispatch({ type: 'ADD_MARKER', payload: newMarker });
        // setCurrentMarkers([...currentMarkers, newMarker]);
        // console.log(currentMarkers);
      });
      // console.log('currentMarkers:');
      // console.log(currentMarkers);
    }
    //step three: updater for long and lat and zoom states
    // console.log('is there a map.current?');
    if (map.current) {
      // console.log('map.current exists!');
      map.current.on('move', () => {
        props.setLng(map.current.getCenter().lng.toFixed(4));
        props.setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        // console.log('were fucking moving!!!!');
      });
    }
  }, [props.locationData]);

  // Functions

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
