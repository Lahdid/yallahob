'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FlippableCardProps {
  question: string;
  image?: string;
  backImage?: string;
  backColor?: string;

  // Mode 2 : emoji/text-based
  icon?: string;
  frontLabel?: string;
  styleType?: 'challenge' | 'family' | 'creativity' | 'reflection';
  ageSuitability?: 'all' | 'kids' | 'teens' | 'parents';
}

const styleMap: Record<string, string> = {
  challenge: 'bg-yellow-100 text-yellow-800',
  family: 'bg-green-100 text-green-800',
  creativity: 'bg-purple-100 text-purple-800',
  reflection: 'bg-blue-100 text-blue-800',
};

export function FlippableCard({
  question,
  image,
  backImage,
  backColor = '',
  icon,
  frontLabel,
  styleType = 'reflection',
}: FlippableCardProps) {
  const [flipped, setFlipped] = useState(false);

  const isImageMode = image && backImage;

  return (
    <div onClick={() => setFlipped(!flipped)} className="perspective-1000 relative h-[280px] w-[200px] cursor-pointer">
      <div
        className={cn(
          'transform-style-preserve-3d relative h-full w-full transition-transform duration-500',
          flipped ? 'rotateY-180' : '',
        )}>
        {/* FRONT */}
        <div className="backface-hidden absolute h-full w-full overflow-hidden rounded-xl shadow-lg">
          {isImageMode ? (
            <Image src={image!} alt="front" fill className="object-cover" />
          ) : (
            <div
              className={cn(
                'flex h-full w-full flex-col items-center justify-center p-4 text-center',
                styleMap[styleType],
              )}>
              <div className="text-4xl">{icon}</div>
              <div className="mt-4 text-lg font-bold">{frontLabel}</div>
            </div>
          )}
        </div>

        {/* BACK */}
        <div
          className={cn(
            'backface-hidden rotateY-180 absolute flex h-full w-full items-center justify-center overflow-hidden rounded-xl shadow-lg',
            isImageMode ? backColor : 'bg-white',
          )}
          style={
            isImageMode
              ? {
                  backgroundImage: `url(${backImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'white',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                }
              : {}
          }>
          <p className="z-10 px-4 text-center text-sm">{question}</p>
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .rotateY-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
