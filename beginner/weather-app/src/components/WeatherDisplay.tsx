import type { WeatherResponse } from "@/types/weather"

type WeatherDisplayProps = {
    weatherInfo: WeatherResponse
}

const WeatherDisplay = ({
    weatherInfo
} : WeatherDisplayProps ) => {
    return (
        <section>
            Weather Info:
            <pre>{weatherInfo.location.country}</pre>
        </section>
    )
}

export default WeatherDisplay