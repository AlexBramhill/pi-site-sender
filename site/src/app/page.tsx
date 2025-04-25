import Image from "next/image";
import styles from "./page.module.css";
import { getLineStatus } from "./api/tube/tube";
import { config } from "./config/config";
import DigitalClock from "./components/digitalClock";

export default async function Home() {
  const lineStatus = await getLineStatus(config.HOME_TUBE_LINE_NAME); // Replace "northern" with the desired line ID
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.overlay}>
          <h2>{lineStatus.name}</h2>
          {lineStatus.lineStatuses.map((status) => (
            <span key={status.statusSeverity}>
              {status.statusSeverityDescription}
            </span>
          ))}
        </div>
        <DigitalClock />
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
