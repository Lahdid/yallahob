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

interface CouplesArticlesPageProps {
  articles: Article[];
}

const CATEGORY_LABELS: Record<Category, string> = {
  [Category.LOVE_COMMUNICATION]: 'Amour & Communication',
  [Category.PLEASURE_AND_ACTIVITIES]: 'Plaisir & Activités',
  [Category.COUPLE_ADVICE]: 'Conseils Relationnels',
  [Category.WELLBEING_AND_EVOLUTION]: 'Bien-être & Évolution',
  [Category.FAMILY_COMMUNICATION]: 'Communication Familiale',
  [Category.BONDING]: 'Activités pour Renforcer les Liens',
};

export default function CouplesArticlesPage({ articles }: CouplesArticlesPageProps) {
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
    <div className="mx-auto max-w-7xl space-y-16 px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-[#b91c1c]">Articles pour les couples ❤️</h1>
        <p className="mt-4 text-lg text-gray-600">
          Découvrez des conseils utiles, de l'inspiration et des idées pour nourrir votre relation.
        </p>
      </div>

      {Object.entries(articlesByCategory).map(([category, categoryArticles]) => (
        <section key={category}>
          <h2 className="mb-6 text-2xl font-bold text-[#b91c1c]">{CATEGORY_LABELS[category as Category]}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {categoryArticles.map((article) => (
              <div
                key={article.id}
                className="overflow-hidden rounded-xl bg-white shadow transition duration-300 hover:shadow-lg">
                <img src={article.image} alt={article.title} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#b91c1c]">{article.title}</h3>
                  <button
                    onClick={() => router.push(`/dashboard/user/couple/articles/${article.id}`)}
                    className="mt-4 rounded-full bg-[#f87171] px-4 py-2 text-sm text-white transition hover:bg-[#dc2626]">
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
