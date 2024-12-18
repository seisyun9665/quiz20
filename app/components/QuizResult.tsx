"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { scoreService } from '../services/scoreService';
import Link from 'next/link';
import { QuizFeedback } from './QuizFeedBack';

type QuizResultProps = {
  score: number;
  totalQuestions: number;
  onReview: () => void;
  onRetry: () => void;
};


// 星の図形コンポーネント
const StarShape: React.FC<{ filled?: boolean }> = ({ filled = false }) => (
  <svg 
    className={`w-8 h-8 transition-all duration-300 ${
      filled ? 'text-yellow-400 animate-[tada_1s_ease-in-out]' : 'text-blue-200'
    }`} 
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 2L9.1 8.6 2 9.5l5 4.8L5.8 22 12 18.6l6.2 3.4-1.2-7.7 5-4.8-7.1-0.9z"
    />
  </svg>
);

// FloatingStarアニメーションコンポーネント
const FloatingStar: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const randomRotation = Math.random() * 360;
  const randomScale = 0.5 + Math.random() * 0.5; // 0.5 ~ 1.0のランダムなサイズ

  return (
    <div
      className="floating-star absolute pointer-events-none"
      style={{
        ...style,
        transform: `translate(-50%, -50%) rotate(${randomRotation}deg) scale(${randomScale})`,
      }}
    >
      <StarShape filled />
    </div>
  );
};

export const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  onReview,
  onRetry
}) => {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);
  const [ratings, setRatings] = useState({ average: 0, count: 0, distribution: {} });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const stats = await scoreService.getFeedbackStats();
        setRatings(stats.ratings);
      } catch (error) {
        console.error('評価の取得に失敗:', error);
      }
    };
    fetchRatings();
  }, []);

  // スコアに基づくフィードバックを取得
  const getScoreFeedback = () => {
    if (score >= 15) {
      return {
        message: "大変優秀です！",
        emoji: "🎉",
        color: "text-red-500",
        bgColor: "bg-red-50",
        borderColor: "border-red-200"
      };
    }
    if (score >= 10) {
      return {
        message: "よく頑張りました！",
        emoji: "👏",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200"
      };
    }
    if (score <= 7) {
      return {
        message: "もう少し頑張りましょう",
        emoji: "💪",
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200"
      };
    }
    return {
      message: "がんばりました",
      emoji: "👍",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    };
  };

  const feedback = getScoreFeedback();

  const handleSaveScore = async () => {
    if (!playerName.trim() || isSubmitted) return;
    
    setIsSaving(true);
    try {
      await scoreService.addScore({
        playerName: playerName.trim(),
        score,
        totalQuestions,
        percentage,
        timestamp: Date.now()
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('スコアの保存に失敗しました:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
      {/* スコアと結果表示 */}
      <div className="text-center">
        <div className="text-7xl font-bold mb-2 flex items-center justify-center">
          <span className={`mr-2 ${feedback.color}`}>{score}</span>
          <span className="text-4xl text-gray-400">/ {totalQuestions}</span>
        </div>
        <div className="text-xl text-gray-600 mb-4">
          正答率: <span className="font-semibold">{percentage}%</span>
        </div>
        <div className={`text-2xl font-bold ${feedback.color} flex items-center justify-center gap-2`}>
          <span>{feedback.emoji}</span>
          <span>{feedback.message}</span>
        </div>
      </div>

      {/* 前入力と提出 */}
      <div className="mt-8 space-y-4">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="お名前を入力"
          className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg 
            focus:outline-none focus:border-primary"
        />
        {isSubmitted ? (
          <div className="w-full py-4 px-6 rounded-lg text-lg font-bold bg-green-50 text-green-600 border-2 border-green-200 text-center">
            <span className="flex items-center justify-center gap-2">
              <span>✅</span>
              <span>提出完了！</span>
            </span>
          </div>
        ) : (
          <button
            onClick={handleSaveScore}
            disabled={!playerName.trim() || isSaving}
            className={`w-full py-4 px-6 rounded-lg text-lg font-bold transition-all duration-200
              ${playerName.trim() 
                ? 'bg-gradient-to-r from-primary to-primary-hover text-white shadow-md ' +
                  'hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 ' +
                  'border-2 border-transparent hover:border-primary/20' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span> 送信中...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>テストを提出する</span>
                <span className="text-xl">→</span>
              </span>
            )}
          </button>
        )}
      </div>

      {/* アクションボタン */}
      <div className="mt-8 space-y-4">
        <button onClick={onReview} className="w-full p-4 text-lg font-medium bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary/5">
          回答・解説を見る
        </button>
        {/* <button onClick={onRetry} className="w-full p-4 text-lg font-medium bg-white text-gray-600 border-2 border-gray-300 rounded-lg hover:bg-gray-50">
          もう一回挑戦する
        </button> */}
        <Link href="/needs-study" className="block w-full">
          <button className="w-full p-4 text-lg font-medium bg-white text-red-500 border-2 border-red-200 rounded-lg hover:bg-red-50">
            要復習者一覧を見る
          </button>
        </Link>
      </div>

      {/* フィードバックセクション */}
      <QuizFeedback
        ratings={ratings}
        playerName={playerName}
        onPlayerNameChange={setPlayerName}
      />
    </div>
  );
};