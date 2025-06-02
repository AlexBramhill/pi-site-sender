import styles from "./page.module.css";
import DigitalClock from "./components/clocks/digital-clock";

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="text-3xl font-bold underline">Everyone!</h1>
        {/* <PicoGrid>
          <WeatherImage /> */}
        <DigitalClock />
        {/* <TubeStatusOverlay />
        </PicoGrid> */}
      </main>
    </div>
  );
}
