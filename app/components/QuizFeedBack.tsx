import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { scoreService } from '../services/scoreService';

type QuizFeedbackProps = {
  ratings: {
    average: number;
    count: number;
    distribution: { [key: number]: number };
  };
  playerName: string;
  onPlayerNameChange: (name: string) => void;
};

export const QuizFeedback: React.FC<QuizFeedbackProps> = ({
  ratings,
  playerName,
  onPlayerNameChange,
}) => {
  const [isRating, setIsRating] = useState(false);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  const handleRate = async (rating: number) => {
    if (isRating) return;
    
    setIsRating(true);
    try {
      await scoreService.addRating(rating);
      const newStats = await scoreService.getFeedbackStats();
      return newStats.ratings;
    } catch (error) {
      console.error('評価の追加に失敗:', error);
      localStorage.removeItem('quiz-rated');
    } finally {
      setIsRating(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    try {
      await scoreService.addComment({
        comment: comment.trim(),
        playerName: playerName.trim()
      });
      setComment('');
      setShowThanks(true);
      setTimeout(() => setShowThanks(false), 3000); // 3秒後に非表示
    } catch (error) {
      console.error('感想の送信に失敗しました:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 pt-8 border-t-2 border-gray-100">
      <StarRating 
        ratings={ratings}
        onRate={handleRate}
        isRating={isRating}
      />
      <div className="mt-6">
        <div className="mb-3 flex items-center gap-2">
          <input
            type="text"
            placeholder="名前（匿名も可）"
            value={playerName || ''}
            onChange={(e) => onPlayerNameChange(e.target.value)}
            className="w-48 px-3 py-1.5 text-sm border-2 border-gray-200 rounded-lg 
              focus:outline-none focus:border-primary"
          />
        </div>
        <textarea
          placeholder="クイズの感想をお聞かせください（任意）"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg 
            focus:outline-none focus:border-primary min-h-[100px] resize-y"
          maxLength={100}
        />
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {comment.length}/100文字
          </span>
          <button
            onClick={handleCommentSubmit}
            disabled={!comment.trim() || isSubmitting}
            className={`px-4 py-2 rounded-lg transition-all duration-200
              ${comment.trim() && !isSubmitting
                ? 'bg-primary text-white hover:bg-primary-hover' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            {isSubmitting ? '送信中...' : '感想を送信'}
          </button>
        </div>
        {showThanks && (
          <div className="mt-4 text-center">
            <span className="text-primary text-lg font-medium animate-fade-in">
              ありがとうございました！
            </span>
          </div>
        )}
      </div>
    </div>
  );
};