"use client"

// app/components/ReviewSection.tsx
import React from 'react';
import { quizData } from '../quizData';

type ReviewSectionProps = {
    quizData: typeof quizData;
    userAnswers: string[];
    onBack: () => void;
};

export const ReviewSection: React.FC<ReviewSectionProps> = ({
    quizData,
    userAnswers,
    onBack
}) => {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h3 className="text-2xl font-bold mb-6 text-center">問題の復習</h3>
            <div className="space-y-6">
                {quizData.map((question, index) => (
                    <div key={index} className="bg-white/5 p-4 rounded-lg shadow-lg">
                        <p className="font-semibold mb-2">問題 {index + 1}: {question.question}</p>
                        <div className="ml-4 space-y-2">
                            <p className="text-gray-300">あなたの回答: {userAnswers[index]}</p>
                            <p className="text-gray-300">正解: {question.answer}</p>
                            <p className={userAnswers[index] === question.answer ? 
                                "text-green-500 font-bold" : "text-red-500 font-bold"}>
                                {userAnswers[index] === question.answer ? "✅ 正解" : "❌ 不正解"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <button 
                onClick={onBack}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
                結果に戻る
            </button>
        </div>
    );
};