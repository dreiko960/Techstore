import { Outlet } from 'react-router';
import { AdminSidebar } from '../components/admin/AdminSidebar';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] dark">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
