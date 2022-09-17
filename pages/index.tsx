import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Simulateur Non-Officiel pour Bricks.co</h1>

        <div className={styles.grid}>
          <Link href="/simulator">
            <a className={styles.card}>
              <h2>Simulateur &rarr;</h2>
              <p>Simulez vos revenus selon les données de la propriété</p>
            </a>
          </Link>

          {/* <Link href="/code">
            <a className={styles.card}>
              <h2>Voir le code source du simulateur</h2>
            </a>
          </Link> */}
        </div>
      </main>
    </div>
  );
}
