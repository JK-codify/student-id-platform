import { AuthProvider } from '@/context/AuthContext';
import { NotificationProvider } from '@/context/NotificationContext';
import Navbar from '@/components/Navbar';
import NotificationContainer from '@/components/NotificationContainer';
import '../styles/globals.css';

export const metadata = {
  title: 'Student ID Platform',
  description: 'A comprehensive web application for generating and managing student identification cards.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <AuthProvider>
          <NotificationProvider>
            <Navbar />
            {children}
            <NotificationContainer />
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
