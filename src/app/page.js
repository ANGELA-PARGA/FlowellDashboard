
import styles from "./page.module.css";
import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";
import logo from "../../public/Logo.png";

export default function Login() {
  return (
    <main className={styles.page}>
      <section className={styles.main}>
        <div className={styles.logo_container}>
          <Image
            src={logo}
            alt="Dashboard Logo"
            width={200}
            height={120}
            priority
          />
          <h1>Flowell Dashboard</h1>
          <p>Management dashboard for Flowell E-commerce.</p>
        </div>
        <LoginForm />         
      </section>
    </main>
  );
}
