import './styles/main.css';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';

export const metadata = {
  title: 'Stack Up - Personal Finance for Teens',
  description: 'Track your money and build healthy financial habits',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navigation />
          <main className="main-content">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
