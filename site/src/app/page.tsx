import styles from "./page.module.css";
import { config } from "./config/config";
import DigitalClock from "./components/digital-clock";
import TubeStatusOverlay from "./components/tube-status";

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <DigitalClock />
        <TubeStatusOverlay lineId={config.HOME_TUBE_LINE_NAME} />
        {/* <Image
          className={styles.image}
          src="/img/1992_Stock_at_East_Acton.jpg"
          alt="1992 Sock at East Acton"
          layout="fill"
          objectFit="cover"
        /> */}
      </main>
    </div>
  );
}
