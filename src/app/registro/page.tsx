import Link from "next/link";
import { RegistrationForm } from "@/features/registration/components/registration-form";
import styles from "./registration-page.module.css";

export const metadata = {
  title: "Registro",
  description: "Inscríbete como jugador.",
};

export default function RegistrationPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* <Link className={styles.back} href="/">← Volver al festival</Link> */}
        <header className={styles.header}>
          {/* <p>El llamado del reino</p> */}
          <h1>Listo para participar</h1>
          {/* <span>Inscríbete para participar en los desafíos de Medioevofest y ocupar tu lugar en el ranking.</span> */}
        </header>
        <div className={styles.ornament} aria-hidden="true"><i /></div>
        <RegistrationForm />
      </div>
    </main>
  );
}
