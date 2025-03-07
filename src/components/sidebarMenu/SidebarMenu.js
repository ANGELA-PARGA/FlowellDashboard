'use client'

import Link from 'next/link'
import styles from './components.module.css'
import clsx from 'clsx';
import { HomeIcon, UsersIcon, OrdersIcon, ProductsIcon, ReportsIcon, DashboardIcon} from "../../../public/svgIcons";
import { usePathname } from 'next/navigation';

const SidebarMenu = () => {
  const pathname = usePathname();
  return (
    <nav className={styles.side_nav}>
        <div className={styles.logo_dashboard}>
          <DashboardIcon width={24} height={24} weight={2} />  
          <p>Flowell</p>
          <p>Dashboard</p>
        </div>
        <ul className={styles.nav_links}>
          <li className={clsx({[styles.active]: pathname === '/admin_panel'})}><Link href={'/admin_panel'}><HomeIcon width={20} height={20} weight={2} />Home</Link></li>
          <li className={clsx({[styles.active]: pathname === '/admin_panel/customers'})}><Link href={'/admin_panel/customers'}><UsersIcon width={20} height={20} weight={2} />Customers</Link></li>
          <li className={clsx({[styles.active]: pathname === '/admin_panel/orders'})}><Link href={'/admin_panel/orders'}><OrdersIcon width={20} height={20} weight={2} />Orders</Link></li>
          <li className={clsx({[styles.active]: pathname === '/admin_panel/products'})}><Link href={'/admin_panel/products'}><ProductsIcon width={20} height={20} weight={2} />Products</Link></li>
          <li className={clsx({[styles.active]: pathname === '/admin_panel/reports'})}><Link href={'/admin_panel/reports'}><ReportsIcon width={20} height={20} weight={2} />Reports</Link></li>                
        </ul>          
      </nav>
  )
}

export default SidebarMenu