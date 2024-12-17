"use client"

// app/components/ReviewSection.tsx
import React from 'react';
import { quizData } from '../quizData';

type ReviewSectionProps = {
    quizData: {
        question: string;
        answer: string;
        explanation: string;
    }[];
    userAnswers: string[];
    onBack: () => void;
};

export const ReviewSection: React.FC<ReviewSectionProps> = ({
    quizData,
    userAnswers,
    onBack
}) => {
    return (
        <div className="max-w-4xl mx-auto sm:px-4 py-6 sm:p-6">
            <button 
                onClick={onBack}
                className="mb-6 px-4 py-2 text-primary font-medium 
                    hover:bg-primary/5 rounded-lg transition-all duration-200 
                    flex items-center gap-2 text-sm sm:text-base"
            >
                <span>←</span>
                <span>結果に戻る</span>
            </button>

            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-gray-800">
                解答・解説
            </h3>

            <div className="space-y-6 sm:space-y-8">
                {quizData.map((question, index) => (
                    <div key={index} className="bg-white p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-md border-2 border-gray-100">
                        <div className="space-y-3">
                            <div className="text-primary font-medium text-sm sm:text-base">
                                第{index + 1}問
                            </div>
                            <p className="font-medium text-gray-800 text-base sm:text-lg">
                                {question.question}
                            </p>
                        </div>

                        <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
                            <div className="flex flex-col gap-2 sm:gap-3">
                                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                                    <span className="text-gray-500 w-24 sm:w-28 text-sm sm:text-base">あなたの回答:</span>
                                    <span className="text-gray-800 text-sm sm:text-base">
                                        {userAnswers[index] ? userAnswers[index] : 
                                            <span className="text-gray-400 italic">回答なし</span>
                                        }
                                    </span>
                                </div>
                                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                                    <span className="text-gray-500 w-24 sm:w-28 text-sm sm:text-base">正解:</span>
                                    <span className="text-gray-800 font-medium text-sm sm:text-base">{question.answer}</span>
                                </div>
                                <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm
                                    ${!userAnswers[index] ? "bg-gray-50 text-gray-500" :
                                      userAnswers[index] === question.answer 
                                        ? "bg-green-50 text-green-600" 
                                        : "bg-red-50 text-red-600"}`
                                }>
                                    <span>{!userAnswers[index] ? "⚪" : 
                                          userAnswers[index] === question.answer ? "✅" : "❌"}</span>
                                    <span>{!userAnswers[index] ? "未回答" :
                                          userAnswers[index] === question.answer ? "正解" : "不正解"}</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-100">
                                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                    <span className="text-primary font-medium block mb-2">解説</span>
                                    {question.explanation}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={onBack}
                className="mt-8 sm:mt-12 w-full max-w-2xl mx-auto p-3 sm:p-4 text-base sm:text-lg font-medium 
                    bg-white text-primary border-2 border-primary rounded-lg sm:rounded-xl 
                    hover:bg-primary/5 transition-all duration-200 
                    flex items-center justify-center gap-2"
            >
                <span>←</span>
                <span>結果に戻る</span>
            </button>
        </div>
    );
};