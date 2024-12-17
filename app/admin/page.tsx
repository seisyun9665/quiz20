"use client"
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { scoreService } from '../services/scoreService';

interface ScoreFormData {
  playerName: string;
  score: string;
  totalQuestions: string;
}

export default function AdminPage() {
  const { user, loading, isAuthorized, signInWithGoogle, logout } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ScoreFormData>({
    playerName: '',
    score: '',
    totalQuestions: '20'  // デフォルト値
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);
    
    try {
      const score = parseInt(formData.score);
      const totalQuestions = parseInt(formData.totalQuestions);
      
      if (isNaN(score) || score < 0 || score > totalQuestions) {
        throw new Error(`スコアは0から${totalQuestions}の間で入力してください`);
      }

      const percentage = Math.round((score / totalQuestions) * 100);

      await scoreService.addScore({
        playerName: formData.playerName.trim(),
        score,
        totalQuestions,
        percentage,
        timestamp: Date.now()
      });

      setStatus('success');
      setSuccessMessage(`${formData.playerName}のスコアを追加しました`);
      // フォームをリセット（totalQuestionsは保持）
      setFormData(prev => ({
        ...prev,
        playerName: '',
        score: ''
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      setStatus('idle');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  console.log('AdminPage render:', { user: user?.email, loading });

  const handleSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      setError('ログインに失敗しました。もう一度お試しください。');
      console.error('Sign in error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (!user || !isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6">開発者ページ</h1>
          {user && !isAuthorized && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
              このメールアドレスではアクセスできません
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          <button
            onClick={handleSignIn}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700
              flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Googleでログイン
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">スコア追加（開発用）</h1>
          <button
            onClick={logout}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            ログアウト
          </button>
        </div>

        <div className="text-sm text-gray-600 mb-6">
          ログイン中: {user.email}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              名前
            </label>
            <input
              type="text"
              name="playerName"
              value={formData.playerName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              スコア（0-20）
            </label>
            <input
              type="number"
              name="score"
              value={formData.score}
              onChange={handleChange}
              min="0"
              max="20"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {status === 'success' && (
            <div className="p-3 bg-green-50 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? '追加中...' : 'スコアを追加'}
          </button>
        </form>

        <div className="mt-8 text-sm text-gray-500">
          ※ このページは開発用です
        </div>
      </div>
    </div>
  );
}