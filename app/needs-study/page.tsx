import Link from 'next/link';
import { NeedsStudyRanking } from '../components/NeedsStudyRanking';
import { Navigation } from '../components/Navigation';

export default function NeedsStudyPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Navigation currentPage="needs-study" />
        <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-gray-200">
          <NeedsStudyRanking />
        </div>
      </div>
    </div>
  );
}