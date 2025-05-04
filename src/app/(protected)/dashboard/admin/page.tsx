import AdminDashboardContent from '@/components/dashboard/admin/manage';
import { getStats } from '@/actions/stats';

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return <AdminDashboardContent stats={stats.data} />;
}
