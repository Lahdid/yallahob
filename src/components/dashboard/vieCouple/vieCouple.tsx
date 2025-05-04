'use client';
import { IconHeart, IconCalendarHeart, IconMessageHeart, IconCash, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';

export default function VieCouple() {
  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center">
        <div className="mr-3 h-8 w-1 rounded bg-gradient-to-b from-red-400 to-pink-600"></div>
        <h2 className="text-2xl font-bold text-gray-800">Vie de Couple</h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Image Banner */}
        <div className="relative h-48 w-full overflow-hidden md:h-64">
          <img
            src="/img/couple.jpg"
            alt="Couple à la plage au coucher du soleil"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent">
            <div className="max-w-2xl p-6 text-white">
              <h3 className="mb-2 text-xl font-bold drop-shadow-sm md:text-2xl">Enrichir votre relation</h3>
              <p className="text-sm drop-shadow-sm md:text-base">
                Renforcez votre relation grâce à nos activités, jeux et ressources spécialement conçues pour les couples
                tunisiens.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {[
            {
              href: '/dashboard/user/couple/jeu',
              icon: <IconMessageHeart className="h-6 w-6 text-red-600" stroke={1.5} />,
              title: 'Jeux de communication',
              text: 'Apprenez à mieux vous connaitre et renforcez votre complicité',
            },
            {
              href: '/dashboard/user/couple/activites',
              icon: <IconCalendarHeart className="h-6 w-6 text-red-600" stroke={1.5} />,
              title: 'Activités à deux',
              text: 'Des idées inspirantes pour raviver votre complicité au quotidien',
            },
            {
              href: '/dashboard/user/couple/articles',
              icon: <IconHeart className="h-6 w-6 text-red-600" stroke={1.5} />,
              title: 'Articles et Conseils',
              text: 'Des ressources pratiques pour construire un couple épanoui',
            },
            {
              href: '/dashboard/user/couple/budget',
              icon: <IconCash className="h-6 w-6 text-red-600" stroke={1.5} />,
              title: 'Planificateur de Budget',
              text: 'Organisez vos finances de manière transparente et efficace',
            },
          ].map(({ href, icon, title, text }) => (
            <Link href={href} key={title} className="block">
              <div className="h-full cursor-pointer p-6 transition-colors hover:bg-red-50">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-red-100 p-3">{icon}</div>
                  <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                  <p className="mb-4 text-sm text-gray-600">{text}</p>
                  <span className="mt-auto flex items-center text-sm font-medium text-red-600">
                    Découvrir <IconChevronRight className="ml-1 h-4 w-4" stroke={2} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
