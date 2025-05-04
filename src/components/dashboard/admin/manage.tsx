'use client';

import Link from 'next/link';
import {
  IconLayoutDashboard,
  IconCards,
  IconUserHeart,
  IconUsers,
  IconActivity,
  IconFileText,
} from '@tabler/icons-react';

const adminLinks = [
  {
    href: '/dashboard/admin/jeux-cartes',
    bgColor: 'bg-red-100 hover:bg-red-200',
    icon: <IconCards className="h-8 w-8 text-red-600" />,
    title: 'Gérer les Jeux de Cartes',
    description: 'Modifier, ajouter ou supprimer les cartes de couple',
  },
  {
    href: '/dashboard/admin/activites',
    bgColor: 'bg-pink-100 hover:bg-pink-200',
    icon: <IconUserHeart className="h-8 w-8 text-pink-600" />,
    title: 'Gérer les Activités',
    description: 'Ajouter, filtrer ou éditer les idées d’activités',
  },
  {
    href: '/dashboard/admin/articles',
    bgColor: 'bg-green-100 hover:bg-green-200',
    icon: <IconActivity className="h-8 w-8 text-green-600" />,
    title: 'Gérer les Articles',
    description: 'Modifier, ajouter ou supprimer les articles',
  },
  {
    href: '/dashboard/admin/users',
    bgColor: 'bg-blue-100 hover:bg-blue-200',
    icon: <IconUsers className="h-8 w-8 text-blue-600" />,
    title: 'Gérer les Utilisateurs',
    description: 'Voir ou modifier les rôles et accès des utilisateurs',
  },
];

interface AdminDashboardContentProps {
  stats: {
    users: number;
    questions: number;
    articles: number;
    activities: number;
  };
}

export default function AdminDashboardContent({ stats }: AdminDashboardContentProps) {
  return (
    <div className="flex h-full flex-col space-y-6 p-4 pt-6 lg:p-6">
      <div className="flex items-center space-x-2 text-3xl font-bold">
        <IconLayoutDashboard className="h-7 w-7 text-red-600" />
        <h2 className="tracking-tight">Tableau de bord Administrateur</h2>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <div className="flex h-24 w-full items-center justify-between space-x-2 rounded-md border border-border bg-white p-4">
          <div className="  flex items-center space-x-2">
            <div className="rounded-full border border-border p-3">
              <IconUsers className="h-5 w-5 " />
            </div>
            <p className="text-sm ">Utilisateurs</p>{' '}
          </div>

          <p className="ml-auto text-xl font-bold ">{stats.users}</p>
        </div>
        <div className="flex h-24 w-full items-center justify-between space-x-2 rounded-md border border-border bg-white p-4">
          <div className="  flex items-center space-x-2">
            <div className="rounded-full border border-border p-3">
              <IconActivity className="h-5 w-5 " />
            </div>
            <p className="text-sm ">Activités</p>{' '}
          </div>

          <p className="ml-auto text-xl font-bold ">{stats.activities}</p>
        </div>
        <div className="flex h-24 w-full items-center justify-between space-x-2 rounded-md border border-border bg-white p-4">
          <div className="  flex items-center space-x-2">
            <div className="rounded-full border border-border p-3">
              <IconCards className="h-5 w-5 " />
            </div>
            <p className="text-sm ">Cartes</p>{' '}
          </div>

          <p className="ml-auto text-xl font-bold ">{stats.questions}</p>
        </div>
        <div className="flex h-24 w-full items-center justify-between space-x-2 rounded-md border border-border bg-white p-4">
          <div className="  flex items-center space-x-2">
            <div className="rounded-full border border-border p-3">
              <IconFileText className="h-5 w-5 " />
            </div>
            <p className="text-sm ">Articles</p>{' '}
          </div>

          <p className="ml-auto text-xl font-bold ">{stats.articles}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {adminLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`${link.bgColor} flex h-48 items-center space-x-4 rounded-xl p-6 shadow-sm transition`}>
            {link.icon}
            <div>
              <h3 className="text-lg font-semibold">{link.title}</h3>
              <p className="text-sm text-gray-600">{link.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
