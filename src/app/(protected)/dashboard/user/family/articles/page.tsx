import React from 'react';
import ArticlesFamille from '@/components/dashboard/vieFamille/articles-famille';
import { getArticles } from '@/actions/article';
import { Type } from '@prisma/client';

export default async function ArticleFamillePage() {
  const response = await getArticles(Type.FAMILY);

  return <ArticlesFamille articles={response.data} />;
}
