import styles from "./page.module.css";
import DigitalClock from "./components/digital-clock";
import TubeStatusOverlay from "./components/tube-status";
import PicoGrid from "./components/pico-grid";
import Image from "next/image";
import WeatherImage from "./components/weather-image";
import DigitalClockWithWeather from "./components/digital-clock-with-weather";

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PicoGrid>
          <WeatherImage />
          <DigitalClockWithWeather />
          <TubeStatusOverlay />
        </PicoGrid>
      </main>
    </div>
  );
}
