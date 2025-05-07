import styles from "./page.module.css";
import { config } from "./config/config";
import DigitalClock from "./components/digital-clock";
import TubeStatusOverlay from "./components/tube-status";
import PicoGrid from "./components/pico-grid";
import WeatherToday from "./components/weather-today";

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PicoGrid>
          <DigitalClock />
          <TubeStatusOverlay lineId={config.HOME_TUBE_LINE_NAME} />
          <WeatherToday />
        </PicoGrid>
      </main>
    </div>
  );
}
