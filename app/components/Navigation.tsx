import Link from 'next/link';

type NavigationProps = {
  currentPage: 'ranking' | 'needs-study' | 'questions' | 'quiz' | 'home';
};

export const Navigation: React.FC<NavigationProps> = ({ currentPage }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
      {currentPage !== 'ranking' && (
        <Link
          href="/ranking"
          className="px-4 sm:px-6 py-2 bg-yellow-50 text-yellow-600 rounded-full shadow-md
            hover:shadow-lg transition-all text-sm border border-yellow-200
            hover:bg-yellow-100"
        >
          成績優秀者 🏆
        </Link>
      )}
      
      {currentPage !== 'needs-study' && (
        <Link
          href="/needs-study"
          className="px-4 sm:px-6 py-2 bg-red-50 text-red-600 rounded-full shadow-md
            hover:shadow-lg transition-all text-sm border border-red-200
            hover:bg-red-100"
        >
          要復習者 👻
        </Link>
      )}
      
      {currentPage !== 'questions' && (
        <Link
          href="/questions"
          className="px-4 sm:px-6 py-2 bg-white text-gray-700 rounded-full shadow-md
            hover:shadow-lg transition-all text-sm"
        >
          問題一覧
        </Link>
      )}
      
      {currentPage !== 'quiz' && (
        <Link
          href="/quiz"
          className="px-4 sm:px-6 py-2 bg-white text-gray-700 rounded-full shadow-md
            hover:shadow-lg transition-all text-sm"
        >
          {currentPage === 'needs-study' ? 'もう一度挑戦' : 'クイズに挑戦'}
        </Link>
      )}
      
      {currentPage !== 'home' && (
        <Link
          href="/"
          className="px-4 sm:px-6 py-2 bg-white text-gray-700 rounded-full shadow-md
            hover:shadow-lg transition-all text-sm"
        >
          {currentPage === 'needs-study' ? 'こっそり帰る' : 'トップに戻る'}
        </Link>
      )}
    </div>
  );
};