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
        // console.log(marker);

        // 1: Set the HTML to place inside the popup
        //     const innerHtmlContent = `
        //   <div>
        //     <h2>Job Details</h2>
        //     <container>
        //       <p><span>Job Type:</span> you</p>
        //       <p><span>Size:</span>are</p>
        //       <p><span>Address:</span>lame</p>
        //       <p>test</p>
        //       <p>test</p>
        //       <p><span>Rating:</span>*****</p>
        //     </container>
        //   </div>
        // `;

        // 2: create the HTMl container and the button
        // const divElement = document.createElement('div');
        // const assignBtn = document.createElement('div');
        // assignBtn.innerHTML = `<button>Request Job</button>`;
        // divElement.innerHTML = innerHtmlContent;
        // divElement.appendChild(assignBtn);

        // 3: create the button event listener
        // assignBtn.addEventListener('click', (e) => {
        //   console.log('Send Request Job Alert');
        //   console.log(marker);
        // });

        // console.log(marker.geometry[0].lon);
        // console.log(marker.geometry[0].lat);
        // console.log(marker.lng);
        // console.log(marker.lat);

        // add new markers
        console.log('creating new markers');
        const newMarker = new mapboxgl.Marker()
          .setLngLat([marker.geometry[0].lon, marker.geometry[0].lat])
          // .setPopup(new mapboxgl.Popup().setDOMContent(divElement))
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
