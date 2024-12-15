"use client"

// app/components/QuizResult.tsx
import React from 'react';

type QuizResultProps = {
    score: number;
    totalQuestions: number;
    onReview: () => void;
    onRestart: () => void;
};

export const QuizResult: React.FC<QuizResultProps> = ({
    score,
    totalQuestions,
    onReview,
    onRestart
}) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
        <div className="animate-fade-in bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">クイズ終了！</h2>
            
            <div className="mb-8">
                <div className="text-5xl font-bold text-primary mb-2">
                    {score} / {totalQuestions}
                </div>
                <div className="text-2xl text-gray-600">
                    正答率: {percentage}%
                </div>
            </div>

            <div className="space-y-4">
                <button
                    onClick={onReview}
                    className="w-full bg-primary text-white text-lg font-medium py-3 px-6 rounded-lg
                        hover:bg-primary-hover transition-colors shadow-md"
                >
                    問題を復習する
                </button>
                
                <button
                    onClick={onRestart}
                    className="w-full bg-white text-primary text-lg font-medium py-3 px-6 rounded-lg
                        border-2 border-primary hover:bg-primary hover:text-white
                        transition-colors shadow-md"
                >
                    もう一度チャレンジ
                </button>
            </div>

            {percentage === 100 && (
                <div className="mt-6 text-xl font-bold text-success">
                    🎉 完璧です！おめでとうございます！
                </div>
            )}
            
            {percentage < 100 && percentage >= 70 && (
                <div className="mt-6 text-xl font-bold text-primary">
                    👍 よくできました！
                </div>
            )}
            
            {percentage < 70 && (
                <div className="mt-6 text-xl font-bold text-gray-600">
                    💪 もう一度挑戦してみましょう！
                </div>
            )}
        </div>
    );
};