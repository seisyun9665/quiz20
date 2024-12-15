// app/components/QuizQuestion.tsx
import React from 'react';

type QuizQuestionProps = {
    question: string;
    options: string[];
    showFeedback: boolean;
    isCorrect: boolean;
    onAnswer: (option: string) => void;
};

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
    question,
    options,
    onAnswer,
    showFeedback,
    isCorrect
}) => {
    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">{question}</h2>
            <div className="space-y-4">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(option)}
                        className={`w-full p-4 text-lg font-medium rounded-lg transition-all
                            ${showFeedback 
                                ? isCorrect 
                                    ? 'bg-success text-white'
                                    : 'bg-error text-white'
                                : 'bg-white text-gray-800 hover:bg-primary hover:text-white'}
                            border-2 border-gray-300 hover:border-transparent
                            shadow-md hover:shadow-lg`}
                        disabled={showFeedback}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {showFeedback && (
                <div className={`mt-6 text-xl font-bold text-center ${isCorrect ? 'text-success' : 'text-error'}`}>
                    {isCorrect ? '正解！' : '不正解...'}
                </div>
            )}
        </div>
    );
};