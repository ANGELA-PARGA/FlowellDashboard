
import styles from "./page.module.css"
import SidebarMenu from "@/components/sidebarMenu/SidebarMenu";
import SidebarMenuPhone from "@/components/sidebarMenu/SidebarMenuPhone";

export default function InnerLayout({ children }) {
  return (
    <main className={styles.dashboard_container}>
      <SidebarMenu /> 
      <SidebarMenuPhone />    
      <section className={styles.dashboard_info}>
        {children}
      </section>
    </main>
  );
}
