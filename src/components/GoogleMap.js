import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MuiCard } from '../styles/Global';

const GoogleMap = () => {
    const { googleMaps, place } = useSelector(state => state.places);
    const [ map, setMap ] = useState(null); 
    const [ marker, setMarker ] = useState(null); 
    const googleMapRef = useRef(null);

    useEffect(() => {
        if(googleMaps && map && place.lat && place.lng){ 
            map.setCenter(place);
            if(marker) {
                marker.setPosition(place);
            } else {
                setMarker(new googleMaps.Marker({
                    map,
                    position: place,
                }));
            }
        }
    }, [googleMaps, map, marker, place])

    useEffect(() => {
        if(!googleMaps) return;
        setMap(new googleMaps.Map(googleMapRef.current, {
            center: { lat: 3.1473265, lng: 101.6988555 },
            zoom: 11,
        }));
    }, [googleMaps]);

    return (<MuiCard>
        <div ref={googleMapRef} style={{ height: '500px', width: 'calc(100vw - 40px)' }}></div>
    </MuiCard>);
};

export default GoogleMap;