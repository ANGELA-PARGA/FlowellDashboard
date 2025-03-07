
import styles from "./page.module.css"
import SidebarMenu from "@/components/sidebarMenu/SidebarMenu";

export default function InnerLayout({ children }) {
  return (
    <main className={styles.dashboard_container}>
      <SidebarMenu />     
      <section className={styles.dashboard_info}>
        {children}
      </section>
    </main>
  );
}
