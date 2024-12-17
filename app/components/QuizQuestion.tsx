// app/components/QuizQuestion.tsx
import React, { useState } from 'react';

type QuizQuestionProps = {
    question: string;
    type: 'multiple-choice' | 'text';
    options?: string[];
    showFeedback: boolean;
    isCorrect: boolean;
    onAnswer: (answer: string) => void;
    correctAnswer: string;
    explanation: string;
    onNext: () => void;
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
    onNext
}) => {
    const [textAnswer, setTextAnswer] = useState('');
    const [selfJudgment, setSelfJudgment] = useState<boolean | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAnswer(textAnswer);
    };

    return (
        <div className="animate-fade-in-fast">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">{question}</h2>
            
            {type === 'text' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={textAnswer}
                        onChange={(e) => setTextAnswer(e.target.value)}
                        className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg 
                            focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                            bg-white text-gray-800"
                        placeholder="答えを入力してください"
                        disabled={showFeedback}
                    />
                    <button
                        type="submit"
                        disabled={showFeedback || !textAnswer.trim()}
                        className="w-full py-3 px-4 sm:py-4 sm:px-6 text-base sm:text-lg font-medium bg-primary text-white rounded-lg 
                            hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed
                            shadow-md hover:shadow-lg transition-all"
                    >
                        回答する
                    </button>
                </form>
            )}

            {showFeedback && selfJudgment === null && (
                <div className="mt-6 space-y-4">
                    <div className="text-xl font-bold text-center text-gray-800">
                        正解を確認してください
                    </div>
                    <div className="text-lg text-center text-gray-800">
                        <span className="font-medium">正解: </span>
                        <span className="text-primary">{correctAnswer}</span>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setSelfJudgment(true)}
                            className="flex-1 p-4 text-lg font-medium bg-success text-white rounded-lg 
                                hover:bg-success/90 shadow-md hover:shadow-lg transition-all"
                        >
                            正解！
                        </button>
                        <button
                            onClick={() => setSelfJudgment(false)}
                            className="flex-1 p-4 text-lg font-medium bg-error text-white rounded-lg 
                                hover:bg-error/90 shadow-md hover:shadow-lg transition-all"
                        >
                            不正解...
                        </button>
                    </div>
                </div>
            )}

            {showFeedback && selfJudgment !== null && (
                <div className="mt-6 space-y-4">
                    <div className={`text-xl font-bold text-center ${selfJudgment ? 'text-success' : 'text-error'}`}>
                        {selfJudgment ? '正解！' : '不正解...'}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700">
                            <span className="font-medium">解説: </span>
                            {explanation}
                        </p>
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