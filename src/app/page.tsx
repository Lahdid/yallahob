'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative w-full">
      {/* Video Background */}
      {isClient && (
        <video autoPlay loop muted playsInline className="absolute inset-0 z-0 h-screen w-full object-cover">
          <source src="/video/ba.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-red-800 bg-opacity-10"></div>

      {/* Content */}
      <div className="relative z-10 pt-[4.1rem] text-foreground/90">
        <Navbar />
        <main className="text-center">
          {/* Hero Section */}
          <div className="flex h-[calc(100vh-4.1rem)] w-full items-center justify-center">
            <h1 className="text-6xl font-bold text-red-800">Bienvenue à YallaHob.Club</h1>
          </div>

          {/* Qui sommes-nous Section */}
          <section id="qui-sommes-nous" className="bg-gray-100 py-20">
            <div className="container mx-auto flex flex-col-reverse items-center gap-12 px-6 lg:flex-row lg:px-20">
              {/* Texte à gauche */}
              <div className="text-left lg:w-1/2">
                <h2 className="mb-6 text-4xl font-bold text-red-800">Qui sommes-nous ?</h2>
                <p className="mb-6 text-lg text-gray-800">
                  <strong>YallaHob.Club</strong> est né de <strong>YallaHob</strong>, un jeu de cartes pour couples
                  tunisiens, conçu pour encourager l’écoute, le dialogue et la complicité. Aujourd’hui, la plateforme
                  réunit toute la famille à travers des <strong>jeux</strong>, <strong>activités</strong> et{' '}
                  <strong>articles</strong> pensés pour créer des souvenirs inoubliables.
                </p>
                <a
                  href="https://yallahob.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-red-700 px-6 py-2 text-white shadow transition hover:bg-red-800">
                  Découvrir
                </a>
              </div>

              {/* Image à droite */}
              <div className="flex justify-center lg:w-1/2">
                <img
                  src="/img/img1.jpg" // remplace par le bon chemin si différent
                  alt="Qui sommes-nous"
                  className="w-full max-w-md rounded-lg shadow-lg"
                />
              </div>
            </div>
          </section>
          {/* Nos Produits Section */}
          <section id="nos-produits" className="bg-white py-20">
            <div className="container mx-auto px-6 lg:px-20">
              <h2 className="mb-12 text-center text-4xl font-bold text-red-800">Nos Produits</h2>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                {/* Produit 1 */}
                <div className="flex flex-col items-center rounded-lg p-4 text-center shadow-lg">
                  <img src="/img/img3.jpeg" alt="YallaHob" className="mb-4 h-64 w-full rounded-md object-cover" />
                  <h3 className="mb-2 text-xl font-semibold text-red-700">YallaHob</h3>
                  <a
                    href="https://yallahob.com/produit/jeu-de-couple-tunisie/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded bg-red-700 px-4 py-2 text-white transition hover:bg-red-800">
                    En savoir plus
                  </a>
                </div>

                {/* Produit 2 */}
                <div className="flex flex-col items-center rounded-lg p-4 text-center shadow-lg">
                  <img src="/img/chorba.png" alt="chorba brike" className="mb-4 h-64 w-full rounded-md object-cover" />
                  <h3 className="mb-2 text-xl font-semibold text-red-700">chorba brike</h3>
                  <a
                    href="https://yallahob.com/produit/chorba-brik-lablebi-kafteji-mlewi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded bg-red-700 px-4 py-2 text-white transition hover:bg-red-800">
                    En savoir plus
                  </a>
                </div>

                {/* Produit 3 */}
                <div className="flex flex-col items-center rounded-lg p-4 text-center shadow-lg">
                  <img
                    src="/img/produit3.jpg"
                    alt="Yalla Matchy"
                    className="mb-4 h-64 w-full rounded-md object-cover"
                  />
                  <h3 className="mb-2 text-xl font-semibold text-red-700">Yalla Matchy</h3>
                  <a href="/products" className="rounded bg-red-700 px-4 py-2 text-white transition hover:bg-red-800">
                    En savoir plus
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="bg-gray-100 py-16">
            <div className="mx-auto max-w-4xl px-4 text-center">
              <h2 className="mb-6 text-3xl font-bold text-red-800">Contact</h2>
              <p className="mb-4 text-gray-700">Une question, une idée ou juste envie de papoter ? Écris-nous !</p>
              <p className="mb-6 font-medium text-red-600">contact@yallahob.club</p>

              <div className="mb-6 flex justify-center gap-6">
                <a href="https://www.instagram.com/yalla_hob_/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-6 w-6 text-red-700 transition hover:text-red-500" />
                </a>
                <a
                  href="https://www.facebook.com/p/Yalla-Hob-61554785100299/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <Facebook className="h-6 w-6 text-red-700 transition hover:text-red-500" />
                </a>
              </div>

              <a
                href="mailto:contact@yallahob.club"
                className="mt-2 inline-block rounded-full border border-red-700 px-5 py-2 text-red-700 transition hover:bg-red-700 hover:text-white">
                Écrire un message
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
