import { Navigation } from '../components/Navigation';
import { ScoreRanking } from '../components/ScoreRanking';

export default function RankingPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Navigation currentPage="ranking" />
        <div className="bg-[#fffff5] rounded-xl shadow-xl p-8 border-2 border-gray-200">
          <ScoreRanking />
        </div>
      </div>
    </div>
  );
}