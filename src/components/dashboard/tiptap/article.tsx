'use client';

import React from 'react';
import TiptapViewer from './tiptap-viewer';
import { Category, Type } from '@prisma/client';

interface ArticleProps {
  article: {
    title: string;
    description: string;
    category: Category;
    type: Type;
    image: string;
  };
}

const CATEGORY_LABELS: Record<Category, string> = {
  FAMILY_COMMUNICATION: 'Communication Familiale',
  BONDING: 'Activités pour Renforcer les Liens',
  WELLBEING_AND_EVOLUTION: 'Bien-être et Évolution',
  LOVE_COMMUNICATION: 'Communication Amoureuse',
  PLEASURE_AND_ACTIVITIES: 'Plaisir et Activités',
  COUPLE_ADVICE: 'Conseils de Couple',
};

const TYPE_LABELS: Record<Type, string> = {
  COUPLE: 'Couple',
  FAMILY: 'Famille',
};

const Article = ({ article }: ArticleProps) => {
  return (
    <div className="w-full space-y-6 p-4 pt-6 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{article.title}</h1>
        <div className="flex gap-2 text-sm">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">
            {CATEGORY_LABELS[article.category]}
          </span>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-800">{TYPE_LABELS[article.type]}</span>
        </div>
      </div>

      <img src={article.image} alt={article.title} className="max-h-[400px] w-full rounded-lg object-cover" />

      <TiptapViewer content={article.description} />
    </div>
  );
};

export default Article;
