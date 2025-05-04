import React from 'react';
import CouplesArticlesPage from '@/components/dashboard/vieCouple/articles-couple';
import { Type } from '@prisma/client';
import { getArticles } from '@/actions/article';

export default async function ArticleCouplePage() {
  const response = await getArticles(Type.COUPLE);
  return <CouplesArticlesPage articles={response.data} />;
}
