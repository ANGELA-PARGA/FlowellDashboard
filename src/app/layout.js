import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Flowell dashboard",
  description: "Dashboard for business management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>        
          {children}  
          <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={true}
          theme="dark"
        />       
      </body>      
    </html>
  );
}
