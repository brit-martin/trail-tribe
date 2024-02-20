import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "../styles/mapbox.css"

mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOXTOKEN



function Mapbox(props){
    //stores the dom element in the useRef
  const map = useRef(null)  
  const mapContainer = useRef(null)
  const [lng, setLng] = useState(-111.8746681)
  const [lat, setLat] = useState(40.4194344)
  const [zoom, setZoom] = useState(12)
  const [locationData, setLocationData] = useState(props.locationData)

useEffect(() => {
    //step one: initilaze map
    if(map.current) return
    //setting up the custom class from mapbox
    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: import.meta.env.VITE_REACT_APP_MAPBOX_STYLE,
        center: [lng, lat],
        zoom: zoom
    })
    //step two: add markers to map---------------------------------------

    // locationData.forEach(marker => {

    // })

    //step three: updater for long and lat and zoom states
    if(map.current){
        map.current.on("move", ()=> {
            setLng(map.current.getCenter().lng.toFixed(4))
            setLat(map.current.getCenter().lat.toFixed(4))
            setZoom(map.current.getZoom().toFixed(2))
        })
    }
}, [])




    return (
        <>
        <div ref={mapContainer} className="map"/>
        </>
    )
}
export default Mapbox