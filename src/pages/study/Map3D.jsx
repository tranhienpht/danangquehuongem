import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map3D.css';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle "Locate Me" functionality
function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMap();

    const handleLocateMe = () => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        });
    };

    return (
        <>
            <button className="locate-btn" onClick={handleLocateMe}>
                📍 Vị trí của em
            </button>
            {position === null ? null : (
                <Marker position={position}>
                    <Popup>Em đang ở đây!</Popup>
                </Marker>
            )}
        </>
    );
}

const Map3D = () => {
    // Da Nang coordinates
    const daNangPosition = [16.0544, 108.2022];

    const keyLocations = [
        { id: 1, name: "Cầu Rồng", position: [16.0610, 108.2252], desc: "Biểu tượng rồng phun lửa của Đà Nẵng" },
        { id: 2, name: "Ngũ Hành Sơn", position: [16.0150, 108.2582], desc: "Danh thắng núi non hùng vĩ" },
        { id: 3, name: "Bà Nà Hills", position: [15.9961, 107.9944], desc: "Đường lên tiên cảnh" },
        { id: 4, name: "Phố cổ Hội An", position: [15.8801, 108.3380], desc: "Di sản văn hóa thế giới (Quảng Nam)" },
        { id: 5, name: "Thánh địa Mỹ Sơn", position: [15.7909, 108.1079], desc: "Di sản văn hóa Chăm Pa (Quảng Nam)" }
    ];

    return (
        <div className="map-page">
            <header className="map-header">
                <h1>Bản đồ số Đà Nẵng - Quảng Nam</h1>
                <p>Khám phá quê hương qua bản đồ trực tuyến</p>
            </header>

            <div className="map-container-wrapper">
                <MapContainer center={[15.7, 108.0]} zoom={9} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                    <TileLayer
                        attribution=''
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png"
                        opacity={0.7}
                    />

                    {keyLocations.map(loc => (
                        <Marker key={loc.id} position={loc.position}>
                            <Popup>
                                <strong>{loc.name}</strong> <br /> {loc.desc}
                            </Popup>
                        </Marker>
                    ))}

                    <LocationMarker />
                </MapContainer>
            </div>

            <div className="map-instructions">
                <p>💡 <strong>Hướng dẫn:</strong> Nhấn nút "📍 Vị trí của em" để xem vị trí hiện tại của mình. Dùng chuột để di chuyển và phóng to bản đồ.</p>
            </div>
        </div>
    );
};

export default Map3D;
