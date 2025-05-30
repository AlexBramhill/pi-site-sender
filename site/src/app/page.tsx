import styles from "./page.module.css";
import TubeStatusOverlay from "./components/tube-status";
import PicoGrid from "./components/pico-grid";
import WeatherImage from "./components/weather-image";
import DigitalClock from "./components/clocks/digital-clock";

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PicoGrid>
          <WeatherImage />
          <DigitalClock />
          <TubeStatusOverlay />
        </PicoGrid>
      </main>
    </div>
  );
}
