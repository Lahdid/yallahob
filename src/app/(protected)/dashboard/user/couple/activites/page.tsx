import React from 'react';
import dynamic from 'next/dynamic';
import ActivitesCouple from '@/components/dashboard/vieCouple/activites-couple';
import { getActivities } from '@/actions/activite';
import { Type } from '@prisma/client';

export const metadata = {
  title: 'Activités en Couple',
  description: "Découvrez des idées d'activités à faire en couple",
};

export default async function ActivitesPage() {
  const res = await getActivities(Type.COUPLE);
  const activities = res.data;

  return (
    <main>
      <ActivitesCouple activities={activities} />
    </main>
  );
}
