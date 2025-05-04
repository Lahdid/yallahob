'use client';

import Link from 'next/link';
import { IconHeart, IconCalendarHeart, IconMessageHeart, IconChevronRight } from '@tabler/icons-react';

export function VieDeFamilleSection() {
  return (
    <section>
      <div className="mb-6 flex items-center">
        <div className="mr-3 h-8 w-1 rounded bg-gradient-to-b from-red-400 to-red-600"></div>
        <h2 className="text-2xl font-bold text-gray-800">Vie de Famille</h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Image Banner */}
        <div className="relative h-64 overflow-hidden rounded-lg shadow-lg">
          <img
            src="/img/family.jpg"
            alt="happy family"
            className="h-full w-full object-cover object-bottom transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent">
            <div className="max-w-2xl p-6 text-white">
              <h3 className="mb-2 text-xl font-bold drop-shadow-sm md:text-2xl">Moments en famille</h3>
              <p className="text-sm drop-shadow-sm md:text-base">
                Découvrez des ressources pour toute la famille, allant des conseils aux activités à réaliser ensemble.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {/* Card 1 */}
          <Link href="/dashboard/user/family/jeu" className="block">
            <div className="h-full cursor-pointer p-6 transition-colors hover:bg-red-50">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-red-100 p-3">
                  <IconHeart className="h-6 w-6 text-red-600" stroke={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Jeux de communication</h3>
                <h4 className="mb-2 text-sm text-red-600">#Version_Famille</h4>
                <p className="mb-4 text-sm text-gray-600">
                  Renforcez les liens familiaux avec nos activités interactives
                </p>
                <span className="mt-auto flex items-center text-sm font-medium text-red-600">
                  Découvrir
                  <IconChevronRight className="ml-1 h-4 w-4" stroke={2} />
                </span>
              </div>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/dashboard/user/family/activites" className="block">
            <div className="h-full cursor-pointer p-6 transition-colors hover:bg-red-50">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-red-100 p-3">
                  <IconCalendarHeart className="h-6 w-6 text-red-600" stroke={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Activités en famille</h3>
                <p className="mb-4 text-sm text-gray-600">Des idées pour créer des souvenirs inoubliables ensemble</p>
                <span className="mt-auto flex items-center text-sm font-medium text-red-600">
                  Découvrir
                  <IconChevronRight className="ml-1 h-4 w-4" stroke={2} />
                </span>
              </div>
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/dashboard/user/family/articles" className="block">
            <div className="h-full cursor-pointer p-6 transition-colors hover:bg-red-50">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-red-100 p-3">
                  <IconMessageHeart className="h-6 w-6 text-red-600" stroke={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Articles familiaux</h3>
                <p className="mb-4 text-sm text-gray-600">Des ressources pratiques et conseils pour toute la famille</p>
                <span className="mt-auto flex items-center text-sm font-medium text-red-600">
                  Découvrir
                  <IconChevronRight className="ml-1 h-4 w-4" stroke={2} />
                </span>
              </div>
            </div>
          </Link>
          <Link href="/dashboard/user/budget" className="block">
            <div className="h-full cursor-pointer p-6 transition-colors hover:bg-red-50">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-red-100 p-3">
                  <IconMessageHeart className="h-6 w-6 text-red-600" stroke={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Budget familial</h3>
                <p className="mb-4 text-sm text-gray-600">Organisez vos finances de manière transparente et efficace</p>
                <span className="mt-auto flex items-center text-sm font-medium text-red-600">
                  Découvrir
                  <IconChevronRight className="ml-1 h-4 w-4" stroke={2} />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
