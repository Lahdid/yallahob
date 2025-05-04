'use client';
import React from 'react';
import { Category, Type } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  category: Category;
  type: Type;
}

interface ArticlesFamilleProps {
  articles: Article[];
}

const CATEGORY_LABELS: Record<Category, string> = {
  [Category.FAMILY_COMMUNICATION]: 'Communication Familiale',
  [Category.BONDING]: 'Activités pour Renforcer les Liens',
  [Category.WELLBEING_AND_EVOLUTION]: 'Bien-être et Évolution',
  [Category.LOVE_COMMUNICATION]: 'Communication Amoureuse',
  [Category.PLEASURE_AND_ACTIVITIES]: 'Plaisir et Activités',
  [Category.COUPLE_ADVICE]: 'Conseils de Couple',
};

export default function ArticlesFamille({ articles }: ArticlesFamilleProps) {
  // Group articles by category
  const router = useRouter();

  const articlesByCategory = articles.reduce(
    (acc, article) => {
      if (!acc[article.category]) {
        acc[article.category] = [];
      }
      acc[article.category].push(article);
      return acc;
    },
    {} as Record<Category, Article[]>,
  );

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-6 py-10">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-[#047857]">Articles pour la famille 👨‍👩‍👧‍👦</h1>
        <p className="mt-2 text-lg text-gray-600">
          Des conseils et idées pour renforcer les relations parents-enfants avec amour et bienveillance.
        </p>
      </div>

      {Object.entries(articlesByCategory).map(([category, categoryArticles]) => (
        <section key={category}>
          <h2 className="mb-6 text-2xl font-bold text-[#047857]">{CATEGORY_LABELS[category as Category]}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {categoryArticles.map((article) => (
              <div key={article.id} className="overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg">
                <img src={article.image} alt={article.title} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#047857]">{article.title}</h3>
                  <button
                    onClick={() => router.push(`/dashboard/user/family/articles/${article.id}`)}
                    className="mt-4 rounded-full bg-[#34d399] px-4 py-2 text-sm text-white transition hover:bg-[#059669]">
                    Lire l'article
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
