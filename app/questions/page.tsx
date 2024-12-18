// app/questions/page.tsx
"use client"
import React from 'react';
import { QuestionList } from '../components/QuestionList';
import { quizData } from '../quizData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const QuestionsPage: React.FC = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">問題一覧</h1>
                    <Link href="/"
                        className="px-4 py-2 text-primary border border-primary rounded-lg
                            hover:bg-primary/5 transition-colors"
                    >
                        トップに戻る
                    </Link>
                </div>
                <div className="bg-white rounded-xl shadow-xl p-8">
                    <QuestionList
                        questions={quizData}
                        onStartFromQuestion={(index) => {
                            router.push(`/quiz?start=${index}`);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default QuestionsPage;