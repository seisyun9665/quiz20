"use client"

import React, { useEffect, useState } from 'react';
import { Score } from '../types/score';
import { scoreService } from '../services/scoreService';

export const NeedsStudyRanking: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  const getTeaseComment = (score: number) => {
    if (score <= 3) return <span className="text-red-500">（まさか寝てた...？）</span>;
    if (score <= 5) return <span className="text-orange-500">（目は開いてた？）</span>;
    if (score <= 7) return <span className="text-yellow-600">（なんとか及第点まであと一歩！）</span>;
    return null;
  };

  const getAward = (score: number) => {
    switch (true) {
      case score <= 3:
        return <span className="text-red-500 font-bold">🥱 お昼寝賞</span>;
      case score <= 5:
        return <span className="text-orange-500 font-bold">📱 スマホ没収賞</span>;
      case score <= 7:
        return <span className="text-yellow-600 font-bold">📚 要復習賞</span>;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const allScores = await scoreService.getTopScores(20); // より多くのスコアを取得
        // スコアの低い順にソート
        const lowScores = allScores
          .filter(score => score.score <= 7)
          .sort((a, b) => a.score - b.score);
        setScores(lowScores);
      } catch (error) {
        console.error('スコアの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) {
    return <div className="text-center p-4 text-gray-600">反省文を集計中...</div>;
  }

  return (
    <div className="max-w-4xl sm:max-w-5xl mx-auto px-2 sm:px-6">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">要復習者一覧</h2>
        <div className="text-xs sm:text-sm text-gray-600">～明日は我が身～</div>
      </div>

      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <div className="overflow-x-auto">
          <div className="min-w-full divide-y divide-gray-200">
            {scores.map((score, index) => (
              <div 
                key={score.id} 
                className="p-4 sm:p-8 rounded-lg border-2 border-gray-200 bg-gray-50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <div className="w-full sm:w-32 flex-shrink-0">{getAward(score.score)}</div>
                    <div className="text-lg sm:text-2xl font-bold text-gray-700">
                      {score.playerName} さん
                    </div>
                  </div>
                  <div className="text-base sm:text-xl text-gray-700"> 
                    {score.score}/20点
                    {getTeaseComment(score.score)}
                  </div>
                </div>
              </div>
            ))}
            {scores.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                おや？みんな優秀なようです...
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200">
        <h3 className="font-bold text-yellow-800 mb-2 text-sm sm:text-base">教員からのお知らせ</h3>
        <p className="text-yellow-700 text-sm sm:text-base">
          このページに名前が載った方は、次回のテストまでに必ず復習をお願いします。
          スマートフォンの使用時間を減らすことをお勧めします。
        </p>
      </div>

      <div className="mt-6 sm:mt-8 text-right text-xs sm:text-sm text-gray-600">
        担当教員：厳しい先生
      </div>
    </div>
  );
};