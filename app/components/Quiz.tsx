// app/components/Quiz.tsx
"use client"
import React, { useState } from 'react';
import { quizData } from '../quizData';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';
import { ReviewSection } from './ReviewSection';
import { QuestionList } from './QuestionList';
import { useRouter } from 'next/navigation';

type QuizProps = {
    initialQuestionIndex?: number;
};

const Quiz: React.FC<QuizProps> = ({ initialQuestionIndex = 0 }) => {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialQuestionIndex);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [userAnswers, setUserAnswers] = useState<{ answer: string, isCorrect: boolean }[]>([]);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showConfirmQuit, setShowConfirmQuit] = useState(false);
    const [isStarted, setIsStarted] = useState(true);
    const [showQuestionList, setShowQuestionList] = useState(false);

    const handleStartFromQuestion = (index: number) => {
        setCurrentQuestionIndex(index);
        setShowQuestionList(false);
        setIsStarted(true);
    };

    const handleSubmit = () => {
        setShowFeedback(true);
    };

    const handleAnswer = (answer: string, bool: boolean) => {
        setUserAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[currentQuestionIndex] = { answer, isCorrect: bool };
            return newAnswers;
        });
    };

    const handleNext = () => {
        setIsTransitioning(true);
        
        setTimeout(() => {
            setShowFeedback(false);
            setIsCorrect(false);
            setCurrentQuestionIndex(prev => prev + 1);
            setIsTransitioning(false);
        }, 50);
    };

    const handleQuit = () => {
        setShowConfirmQuit(true);
    };

    const handleConfirmQuit = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers([]);
        setShowReview(false);
        setShowFeedback(false);
        setIsCorrect(false);
        setShowConfirmQuit(false);
        setIsStarted(false);
        
        router.push('/');
    };

    if (showQuestionList) {
        return (
            <QuestionList
                questions={quizData}
                onStartFromQuestion={handleStartFromQuestion}
            />
        );
    }

    if (isTransitioning) {
        return <div className="animate-fade-in-fast min-h-[400px] flex items-center justify-center" />;
    }

    if (showReview) {
        return (
            <ReviewSection
                quizData={quizData}
                userAnswers={userAnswers}
                onBack={() => setShowReview(false)}
            />
        );
    }

    return (
        <div className="animate-fade-in-fast relative">
            {showConfirmQuit && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">
                            クイズを中断しますか？
                        </h3>
                        <p className="text-lg text-gray-700 mb-6">
                            進捗は保存されません。最初からやり直すことになります。
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowConfirmQuit(false)}
                                className="flex-1 p-3 text-lg font-medium text-gray-700 bg-gray-100 rounded-lg
                                    hover:bg-gray-200 transition-colors"
                            >
                                続ける
                            </button>
                            <button
                                onClick={handleConfirmQuit}
                                className="flex-1 p-3 text-lg font-medium text-white bg-error rounded-lg
                                    hover:bg-error/90 transition-colors"
                            >
                                中断する
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {currentQuestionIndex < quizData.length ? (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-lg font-medium text-gray-600">
                            問題 {currentQuestionIndex + 1} / {quizData.length}
                        </div>
                        <button
                            onClick={handleQuit}
                            className="px-4 py-2 text-error border border-error rounded-lg
                                hover:bg-error/5 transition-colors"
                        >
                            中断する
                        </button>
                    </div>
                    <QuizQuestion 
                        question={quizData[currentQuestionIndex].question}
                        type={quizData[currentQuestionIndex].type}
                        options={quizData[currentQuestionIndex].options}
                        showFeedback={showFeedback}
                        isCorrect={isCorrect}
                        onAnswer={handleAnswer}
                        onSubmit={handleSubmit}
                        onNext={handleNext}
                        correctAnswer={quizData[currentQuestionIndex].answer}
                        explanation={quizData[currentQuestionIndex].explanation}
                    />
                </>
            ) : (
                <QuizResult 
                    score={userAnswers.filter(answer => answer?.isCorrect ?? false).length}
                    totalQuestions={quizData.length}
                    onReview={() => setShowReview(true)}
                    onRetry={() => {
                        setCurrentQuestionIndex(0);
                        setScore(0);
                        setUserAnswers([]);
                        setShowReview(false);
                        setShowFeedback(false);
                        setIsCorrect(false);
                    }}
                />
            )}
        </div>
    );
};

export default Quiz;