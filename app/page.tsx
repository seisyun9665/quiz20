// app/page.tsx
import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-white py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold text-center mb-12 text-primary">一般常識クイズ</h1>
                <div className="bg-white rounded-xl shadow-xl p-8">
                    <div className="animate-fade-in text-center">
                        <p className="text-lg text-gray-600 mb-8">
                            時事問題から一般教養まで、幅広い分野の問題に挑戦しましょう！
                        </p>
                        <div className="space-y-4 mb-8">
                            <p className="text-gray-700">
                                • 全20問
                            </p>
                            <p className="text-gray-700">
                                • 制限時間なし
                            </p>
                            <p className="text-gray-700">
                                • いつでも中断可能
                            </p>
                        </div>
                        <div className="space-y-4">
                            <Link href="/quiz" 
                                className="block w-full p-4 text-lg font-medium bg-primary text-white rounded-lg 
                                    hover:bg-primary-hover hover:text-white shadow-md hover:shadow-lg transition-all"
                            >
                                最初から始める
                            </Link>
                            <Link href="/questions"
                                className="block w-full p-4 text-lg font-medium bg-white text-primary rounded-lg 
                                    border-2 border-primary hover:bg-primary/5 transition-all"
                            >
                                問題一覧から選ぶ
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-4 mt-8">
                    <Link
                        href="/ranking"
                        className="px-6 py-3 bg-yellow-100 text-yellow-700 rounded-full
                            hover:bg-yellow-200 transition-all border-2 border-yellow-300
                            font-medium shadow-sm hover:shadow-md"
                    >
                        成績優秀者一覧
                    </Link>
                    <Link
                        href="/needs-study"
                        className="px-6 py-3 bg-red-100 text-red-700 rounded-full
                            hover:bg-red-200 transition-all border-2 border-red-300
                            font-medium shadow-sm hover:shadow-md"
                    >
                        要復習者一覧
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;