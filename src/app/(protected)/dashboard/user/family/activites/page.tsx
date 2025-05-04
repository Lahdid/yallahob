import { Metadata } from 'next';
import ActivitesFamille from '@/components/dashboard/vieFamille/activites-famille';
import { getActivities } from '@/actions/activite';
import { Type } from '@prisma/client';

export const metadata: Metadata = {
  title: 'Activités en Famille | Vie Familiale',
  description: 'Découvrez des activités amusantes et enrichissantes à faire avec vos enfants partout en Tunisie',
};

export default async function ActivitesFamillePage() {
  const res = await getActivities(Type.FAMILY);

  const activities = res.data;

  return (
    <div className="w-full">
      <ActivitesFamille activities={activities} />
    </div>
  );
}
