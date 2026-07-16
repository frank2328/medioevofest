import { RankingTable } from "@/features/ranking";
import { festivalHighlights } from "../data/festival-highlights";
import styles from "./home-page.module.css";

export function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.kicker}>Cucuta, Colombia</p>
          <h1>Medioevofest</h1>
          <p className={styles.lead}>
            Una experiencia medieval para reunir musica, gastronomia, arte y
            comunidad en una nueva marca festivalera.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="/registro">
              Inscribirme
            </a>
            <a className={styles.primaryAction} href="#programacion">
              Ver programacion
            </a>
            <a className={styles.secondaryAction} href="#experiencia">
              Explorar experiencia
            </a>
          </div>
        </div>
      </section>

      <section className={styles.contentBand} id="experiencia">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Primeras bases</p>
          <h2>Una app lista para crecer por features</h2>
        </div>
        <div className={styles.grid}>
          {festivalHighlights.map((highlight) => (
            <article className={styles.card} key={highlight.title}>
              <span>{highlight.label}</span>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </article>
          ))}
        </div>
      </section>

      <RankingTable />
    </main>
  );
}
