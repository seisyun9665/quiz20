"use client"

import React, { useEffect, useState } from 'react';
import { Score } from '../types/score';
import { scoreService } from '../services/scoreService';

export const ScoreRanking: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  const getAward = (rank: number) => {
    switch (rank) {
      case 1:
        return <span className="text-yellow-500 font-bold text-3xl">最優秀賞</span>;
      case 2:
        return <span className="text-gray-600 font-bold text-2xl">優秀賞</span>;
      case 3:
        return <span className="text-amber-700 font-bold text-xl">努力賞</span>;
      default:
        return null;
    }
  };

  const getScoreComment = (score: number) => {
    if (score >= 15) return <span className="text-red-500">（大変優秀です！）</span>;
    if (score >= 10) return <span className="text-blue-600">（よく頑張りました）</span>;
    if (score <= 7) return <span className="text-gray-600">（もう少し頑張りましょう）</span>;
    return null;
  };

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const topScores = await scoreService.getTopScores();
        setScores(topScores);
      } catch (error) {
        console.error('スコアの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) {
    return <div className="text-center p-4 text-gray-600">採点中...</div>;
  }

  const topScores = scores.slice(0, 3);
  const otherScores = scores.slice(3);

  return (
    <div className="max-w-4xl sm:max-w-5xl mx-auto px-2 sm:px-6">
      {/* 成績優秀者セクション */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">成績優秀者</h2>
        <div className="text-xs sm:text-sm text-gray-600">令和5年度 一般常識テスト</div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {topScores.map((score, index) => (
          <div 
            key={score.id} 
            className={`p-6 sm:p-8 rounded-lg border-2 ${
              index === 0 ? 'border-yellow-200 bg-yellow-50' :
              index === 1 ? 'border-gray-200 bg-gray-50' :
              'border-amber-100 bg-amber-50'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <div className="w-full sm:w-48 flex-shrink-0">{getAward(index + 1)}</div>
                <div className="text-lg sm:text-2xl font-bold text-gray-700">
                  {score.playerName} さん
                </div>
              </div>
              <div className="text-base sm:text-xl text-gray-700">
                {score.score}問正解
                {getScoreComment(score.score)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* その他の受験者セクション */}
      {otherScores.length > 0 && (
        <div className="border-t-2 border-gray-200 pt-6 sm:pt-8 mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-4">その他の受験者</h3>
          <div className="bg-white rounded-lg border border-gray-200">
            {otherScores.map((score, index) => (
              <div 
                key={score.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 
                  ${index !== otherScores.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="flex items-center gap-3 sm:gap-4 text-gray-700">
                  <div className="w-16 sm:w-20 text-gray-500 text-right">{index + 4}位</div>
                  <div className="font-medium sm:min-w-[200px]">{score.playerName} さん</div>
                </div>
                <div className="text-gray-600 mt-1 sm:mt-0 ml-20 sm:ml-0">
                  {score.score}問正解
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 sm:mt-8 text-right text-xs sm:text-sm text-gray-600">
        採点者：クイズマスター清野
      </div>
    </div>
  );
};