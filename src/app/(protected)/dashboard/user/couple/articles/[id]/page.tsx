import { IconUsers } from '@tabler/icons-react';
import React from 'react';
import { getUser } from '@/actions/users';
import NotFound from '@/app/[...not_found]/page';
import { EditUserForm } from '@/components/dashboard/forms/edit-user-form';
import { User } from '@prisma/client';
import TiptapViewer from '@/components/dashboard/tiptap/tiptap-viewer';
import Article from '@/components/dashboard/tiptap/article';
import { getArticleById } from '@/actions/article';
interface UserDetailsProps {
  params: { id: string };
}

export default async function ArticlePage({ params }: UserDetailsProps) {
  const res = await getArticleById(params.id);

  const data = res.error ? null : res.data;

  return <Article article={data} />;
}
