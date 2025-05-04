'use client';

import { FlippableCard } from '@/components/cards/FlippableCard';
import { cardStyles } from '@/lib/constants';
import { ChevronDown } from 'lucide-react';
import { Question } from '@prisma/client';

interface JeuFamilleProps {
  cards: Question[];
}

export default function JeuFamille({ cards }: JeuFamilleProps) {
  return (
    <div className=" flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Jeux de Cartes Pour Famille</h1>
      {/* Aside Section */}
      <aside className=" rounded-lg border border-red-200 bg-gradient-to-r from-white via-red-50 to-white p-4 shadow-sm">
        <h3 className="mb-4 flex items-center text-2xl font-bold text-red-600">
          <span className="mr-2">💡</span>
          Le saviez-vous?
        </h3>
        <p className="text-gray-700">
          Les couples qui pratiquent régulièrement des jeux de communication comme celui-ci rapportent un niveau de
          satisfaction relationnelle plus élevé de 37% par rapport aux autres. Prenez le temps de vous redécouvrir!
        </p>
        <div className="mt-4 flex justify-end">
          <a
            href="/dashboard/user/couple/articles"
            className="flex items-center text-sm text-red-600 transition-colors duration-300 hover:text-red-700">
            Plus d'astuces
            <ChevronDown className="ml-1 h-4 w-4" />
          </a>
        </div>
      </aside>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => {
          const style = cardStyles[card.category];
          if (!style) return null;

          return (
            <FlippableCard
              key={card.id}
              question={card.question}
              image={style.image}
              backImage={style.backImage}
              backColor={style.backColor}
            />
          );
        })}
      </div>
    </div>
  );
}
