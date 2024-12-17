"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { scoreService } from '../services/scoreService';
import Link from 'next/link';

type QuizResultProps = {
  score: number;
  totalQuestions: number;
  onReview: () => void;
  onRetry: () => void;
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
    if (!playerName.trim()) return;
    
    setIsSaving(true);
    try {
      await scoreService.addScore({
        playerName: playerName.trim(),
        score,
        totalQuestions,
        percentage,
        timestamp: Date.now()
      });
      router.push('/ranking');
    } catch (error) {
      console.error('スコアの保存に失敗しました:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        クイズ終了！
      </h2>
      
      {/* スコア表示部分 */}
      <div className={`relative mb-8 ${feedback.bgColor} rounded-2xl border-2 ${feedback.borderColor} p-6`}>
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
      </div>

      {/* 名前入力とスコア保存 */}
      <div className="space-y-4 mb-8">
        <div>
          <input
            type="text"
            placeholder="あなたの名前を入力"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full p-4 border-2 rounded-xl text-gray-700 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              transition-all duration-200"
          />
          <button
            onClick={handleSaveScore}
            disabled={isSaving || !playerName.trim()}
            className={`w-full mt-2 px-4 py-2 
              bg-primary text-white rounded-lg hover:bg-primary-dark
              transition-all duration-200
              ${!playerName.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'}`}
          >
            {isSaving ? '保存中...' : '先生にテストを提出'}
          </button>
        </div>
      </div>

      {/* アクション部分 */}
      <div className="space-y-3">
        <button
          onClick={onReview}
          className="w-full p-4 bg-white text-primary border-2 border-primary 
            rounded-xl font-semibold hover:bg-primary/5 transition-all duration-200
            flex items-center justify-center gap-2"
        >
          <span>解答・解説</span>
        </button>

        <button
          onClick={onRetry}
          className="w-full p-4 bg-white text-primary border-2 border-primary 
            rounded-xl font-semibold hover:bg-primary/5 transition-all duration-200
            flex items-center justify-center gap-2"
        >
          <span>もう一度挑戦する</span>
        </button>

        {score >= 10 ? (
          <Link href="/ranking" className="block">
            <button className="w-full p-4 bg-white text-primary border-2 border-primary
              rounded-xl font-semibold hover:bg-primary/5 transition-all duration-200
              flex items-center justify-center gap-2">
              <span>成績優秀者一覧へ</span>
            </button>
          </Link>
        ) : (
          <Link href="/needs-study" className="block">
            <button className="w-full p-4 bg-gradient-to-r from-blue-400 to-blue-500 
              text-white rounded-xl font-semibold hover:from-blue-500 hover:to-blue-600 
              transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              <span>要復習者一覧へ</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};