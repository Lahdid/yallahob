import { getCards } from '@/actions/cards';
import JeuFamille from '@/components/dashboard/vieFamille/jeux-famille';
import { Type } from '@prisma/client';
import { notFound } from 'next/navigation';

export default async function JeuxFamillePage() {
  const res = await getCards(Type.FAMILY);
  if (res.error) return notFound();

  const cards = res.data;
  return (
    <div className="p-4">
      <JeuFamille cards={cards} />
    </div>
  );
}
