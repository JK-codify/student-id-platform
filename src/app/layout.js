import Layout from '../../components/Layout'
import './globals.css'
import '../../styles/dashboard.css'


//const geistSans = Geist({
  //variable: "--font-geist-sans",
  //subsets: ["latin"],
//});

//const geistMono = Geist_Mono({
  //variable: "--font-geist-mono",
  //subsets: ["latin"],
//});

export const metadata = {
  title: 'Student ID Platform — PKFokam',
  description: "Developped by Group 3 for PKFokam's Student ID Platform project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
