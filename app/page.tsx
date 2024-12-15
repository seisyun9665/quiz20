// pages/index.tsx
import React from 'react';
import Quiz from './components/Quiz';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-white py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold text-center mb-12 text-primary">クイズアプリ</h1>
                <div className="bg-white rounded-xl shadow-xl p-8">
                    <Quiz />
                </div>
            </div>
        </div>
    );
};

export default Home;
