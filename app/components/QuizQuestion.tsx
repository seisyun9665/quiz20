// app/components/QuizQuestion.tsx
'use client'

import React, { useState } from 'react';
import { checkAnswer } from '../lib/groq';

type QuizQuestionProps = {
    question: string;
    type: 'multiple-choice' | 'text';
    options?: string[];
    showFeedback: boolean;
    isCorrect: boolean;
    onAnswer: (answer: string, bool: boolean) => void;
    correctAnswer: string;
    explanation: string;
    onNext: () => void;
    onSubmit: () => void;
};

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
    question,
    type,
    options,
    onAnswer,
    showFeedback,
    isCorrect,
    correctAnswer,
    explanation,
    onNext,
    onSubmit
}) => {
    const [textAnswer, setTextAnswer] = useState('');
    const [selfJudgment, setSelfJudgment] = useState<boolean | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!textAnswer.trim()) return;
        
        setIsChecking(true);
        
        try {
            console.log('Calling checkAnswer...');
            const result = await checkAnswer(textAnswer, correctAnswer);
            console.log('checkAnswer result:', result);
            
            onAnswer(textAnswer, result.isCorrect);
            setSelfJudgment(result.isCorrect);
            onSubmit();
        } catch (error) {
            console.error('Answer check failed:', error);
            const isCorrect = textAnswer.trim() === correctAnswer.trim();
            console.log('Fallback check result:', { isCorrect });
            
            onAnswer(textAnswer, isCorrect);
            setSelfJudgment(isCorrect);
            onSubmit();
        } finally {
            setIsChecking(false);
        }
    };

    const handleAnswer = (bool: boolean) => {
        onAnswer(textAnswer, bool);
        setSelfJudgment(bool);
    };

    return (
        <div className={`animate-fade-in-fast rounded-xl p-6 transition-colors duration-300 ${
            showFeedback && selfJudgment !== null 
                ? selfJudgment 
                    ? 'bg-success/10' 
                    : 'bg-error/10'
                : ''
        }`}>
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">{question}</h2>
            
            {type === 'text' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={textAnswer}
                        onChange={(e) => setTextAnswer(e.target.value)}
                        className={`w-full p-4 text-lg border-2 rounded-lg 
                            focus:outline-none focus:ring-2
                            bg-white text-gray-800 transition-colors duration-300 ${
                                showFeedback && selfJudgment !== null
                                    ? selfJudgment
                                        ? 'border-success focus:border-success focus:ring-success/20'
                                        : 'border-error focus:border-error focus:ring-error/20'
                                    : 'border-gray-300 focus:border-primary focus:ring-primary/20'
                            }`}
                        placeholder="答えを入力してください"
                        disabled={showFeedback || isChecking}
                    />
                    {isChecking ? (
                        <div className="flex items-center justify-center gap-3 py-3 px-4 text-base sm:text-lg font-medium bg-gray-100 text-gray-600 rounded-lg">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2.5 h-2.5 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2.5 h-2.5 bg-gray-600 rounded-full animate-bounce"></div>
                            </div>
                            <span>答え合わせ中...</span>
                        </div>
                    ) : (
                        <button
                            type="submit"
                            disabled={showFeedback || !textAnswer.trim()}
                            className="w-full py-3 px-4 sm:py-4 sm:px-6 text-base sm:text-lg font-medium bg-primary text-white rounded-lg 
                                hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed
                                shadow-md hover:shadow-lg transition-all"
                        >
                            回答する
                        </button>
                    )}
                </form>
            )}

            {showFeedback && (
                <>
                    {selfJudgment === null && (
                        <div className="text-xl font-bold text-center text-gray-800">
                            正解を確認してください
                        </div>
                    )}
                    <div className="mt-6 space-y-4">
                        <div className="text-lg text-center text-gray-800">
                            <span className="font-medium">正解: </span>
                            <span className="text-primary">{correctAnswer}</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                                <span className="font-medium">解説: </span>
                                {explanation}
                            </p>
                        </div>

                        {selfJudgment === null && (
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleAnswer(true)}
                                    className="flex-1 p-4 text-lg font-medium bg-success text-white rounded-lg 
                                        hover:bg-success/90 shadow-md hover:shadow-lg transition-all"
                                >
                                    正解！
                                </button>
                                <button
                                    onClick={() => handleAnswer(false)}
                                    className="flex-1 p-4 text-lg font-medium bg-error text-white rounded-lg 
                                        hover:bg-error/90 shadow-md hover:shadow-lg transition-all"
                                >
                                    不正解...
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}

            {showFeedback && selfJudgment !== null && (
                <div className="mt-6 space-y-4">
                    <div className={`text-xl font-bold text-center ${selfJudgment ? 'text-success' : 'text-error'}`}>
                        {selfJudgment ? '正解！' : '不正解...'}
                    </div>
                    <button
                        onClick={onNext}
                        className="w-full p-4 text-lg font-medium bg-primary text-white rounded-lg 
                            hover:bg-primary-hover shadow-md hover:shadow-lg transition-all"
                    >
                        次の問題へ
                    </button>
                </div>
            )}
        </div>
    );
};