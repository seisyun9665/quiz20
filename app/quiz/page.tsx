// app/quiz/page.tsx
"use client"
import React, { Suspense } from 'react';
import Quiz from '../components/Quiz';
import { useSearchParams } from 'next/navigation';

// クイズコンポーネントをラップするコンポーネント
const QuizWithParams: React.FC = () => {
    const searchParams = useSearchParams();
    const startIndex = searchParams.get('start') ? parseInt(searchParams.get('start')!) : 0;

    return <Quiz initialQuestionIndex={startIndex} />;
};

// メインページコンポーネント
const QuizPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-xl p-8">
                    <Suspense fallback={
                        <div className="flex items-center justify-center min-h-[400px]">
                            <div className="text-gray-600">読み込み中...</div>
                        </div>
                    }>
                        <QuizWithParams />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default QuizPage;