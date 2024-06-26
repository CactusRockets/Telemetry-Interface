type MapProps = {
    latitude: number
    longitude: number
}

const Map = ({ latitude, longitude }: MapProps) => {
    return (
        <iframe
            width="450"
            height="230"
            style={{"border": 0}}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_API_KEY}
                &q=${latitude},${longitude}`}>
        </iframe>
    )
}

export default Map;