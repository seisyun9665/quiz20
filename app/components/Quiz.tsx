// app/components/Quiz.tsx
"use client"
import React, { useState } from 'react';
import { quizData } from '../quizData';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';
import { ReviewSection } from './ReviewSection';

const Quiz: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);

    const handleAnswer = (option: string) => {
        const correct = option === quizData[currentQuestionIndex].answer;
        setIsCorrect(correct);
        setShowFeedback(true);
        
        if (correct) {
            setScore(score + 1);
        }

        setUserAnswers([...userAnswers, option]);

        setTimeout(() => {
            setShowFeedback(false);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }, 1000);
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers([]);
        setShowReview(false);
    };

    if (currentQuestionIndex >= quizData.length) {
        return showReview ? (
            <ReviewSection 
                quizData={quizData}
                userAnswers={userAnswers}
                onBack={() => setShowReview(false)}
            />
        ) : (
            <QuizResult 
                score={score}
                totalQuestions={quizData.length}
                onReview={() => setShowReview(true)}
                onRestart={handleRestart}
            />
        );
    }

    return (
        <QuizQuestion 
            question={quizData[currentQuestionIndex].question}
            options={quizData[currentQuestionIndex].options}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            onAnswer={handleAnswer}
        />
    );
};

export default Quiz;