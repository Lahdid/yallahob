import { IconHeart, IconCalendarHeart, IconMessageHeart, IconCash, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { IconLayoutDashboard } from '@tabler/icons-react';
import Image from 'next/image';
import VieCouple from '@/components/dashboard/vieCouple/vieCouple';
import { VieDeFamilleSection } from '@/components/dashboard/vieFamille/vieFamille';
export default function UserHome() {
  return (
    <div className="flex-1 bg-gray-50 p-6 md:p-8">
      {/* Main Content */}
      <VieCouple />
      <VieDeFamilleSection />
    </div>
  );
}
