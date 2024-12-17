import React, { useState, useEffect } from 'react';
import { StarShape } from './StarShape';

type StarRatingProps = {
  ratings: {
    average: number;
    count: number;
    distribution: { [key: number]: number };
  };
  onRate: (rating: number) => Promise<any>;
  isRating: boolean;
};

export const StarRating: React.FC<StarRatingProps> = ({ ratings, onRate, isRating: initialIsRating }) => {
  const [currentRating, setCurrentRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    setCurrentRating(0);
    setHasRated(false);
  }, []);

  const handleStarClick = (rating: number) => {
    if (hasRated) return;
    setCurrentRating(rating);
  };

  const handleSubmit = async () => {
    if (hasRated || initialIsRating || currentRating === 0) return;

    try {
      await onRate(currentRating);
      setHasRated(true);
      localStorage.setItem('quiz-has-rated', 'true');
      localStorage.setItem('quiz-rating', currentRating.toString());
    } catch (error) {
      console.error('Rating submission failed:', error);
      localStorage.removeItem('quiz-has-rated');
      localStorage.removeItem('quiz-rating');
    }
  };

  return (
    <div className="mt-8 text-center space-y-4">
      <p className="text-sm text-gray-500">
        このクイズの評価をお願いします！
      </p>
      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleStarClick(rating)}
              className={`transition-transform duration-200 relative 
                ${!hasRated ? 'hover:scale-110' : ''}`}
              disabled={hasRated}
            >
              <StarShape filled={rating <= currentRating} />
            </button>
          ))}
        </div>
        {!hasRated ? (
          <button
            onClick={handleSubmit}
            disabled={currentRating === 0 || initialIsRating}
            className={`px-6 py-2 rounded-lg text-white transition-all duration-200
              ${currentRating === 0 || initialIsRating
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary hover:bg-primary-hover'}`}
          >
            {initialIsRating ? '送信中...' : '評価を送信'}
          </button>
        ) : (
          <p className="text-green-600 font-medium">ありがとうございました！</p>
        )}
      </div>
      <div className="text-sm text-gray-600">
        {ratings.count > 0 && (
          <>平均評価: {ratings.average.toFixed(1)} ({ratings.count}件の評価)</>
        )}
      </div>
    </div>
  );
};