import Header from "../components/Header";
import Footer from "../components/Footer";

import "./globals.css";
import { Maven_Pro } from "next/font/google";

const maven = Maven_Pro({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-maven'
});

export const metadata = {
  title: "In Victor We Trust",
  description: "Site sportif dédié à la NBA avec classements des équipes, joueurs, stats sur la saison, détails des matchs, recherche de joueur, sondage et plus encore...",
};

export default function RootLayout({ children }) {
  return (
    
      <html lang="fr" className="scroll-smooth">
        <body className={maven.variable}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    
  );
}
