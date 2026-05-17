import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function ClientLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] dark">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
