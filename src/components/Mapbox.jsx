import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import '../styles/mapbox.css';

mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOXTOKEN;

function Mapbox(props) {
  // console.log(props.locationData);
  //stores the dom element in the useRef
  const [locationData, setLocationData] = useState(props.locationData);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-111.8746681);
  const [lat, setLat] = useState(40.4194344);
  const [zoom, setZoom] = useState(12);
  // const { setBoundingBox } = props;
  console.log('locationData:');
  console.log(locationData);

  // UseEffect
  useEffect(() => {
    console.log('made it to useEffect!');
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: import.meta.env.VITE_REACT_APP_MAPBOX_STYLE,
      center: [lng, lat],
      zoom: zoom,
    });

    console.log('made it past the return statement');

    setLocationData(props.locationData);

    //step two: add markers to map---------------------------------------
    // TODO - create the popup stuff

    if (locationData.length > 0) {
      locationData.forEach((marker) => {
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
        const newMarker = new mapboxgl.Marker()
          .setLngLat([marker.geometry[0].lon, marker.geometry[0].lat])
          // .setPopup(new mapboxgl.Popup().setDOMContent(divElement))
          .addTo(map.current);
      });
    }
    //step three: updater for long and lat and zoom states
    // console.log('is there a map.current?');
    if (map.current) {
      // console.log('map.current exists!');
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        console.log('were fucking moving!!!!');
      });
    }
  }, [locationData]);

  // Functions

  return (
    <>
      <div className='map__sidebar'>
        longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className='map' />
    </>
  );
}
export default Mapbox;
