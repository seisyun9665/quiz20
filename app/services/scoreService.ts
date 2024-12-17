import { db } from '../firebase/config';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Score } from '../types/score';

const COLLECTION_NAME = 'scores';

export const scoreService = {
  async addScore(scoreData: Omit<Score, 'id'>): Promise<string> {
    try {
      console.log('スコアの追加を開始:', scoreData);
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...scoreData,
        timestamp: Date.now()
      });
      console.log('スコアの追加に成功。ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('スコアの追加に失敗:', error);
      throw new Error('スコアの保存中にエラーが発生しました');
    }
  },

  async getTopScores(limitCount: number = 10): Promise<Score[]> {
    try {
      console.log('トップスコアの取得を開始. 制限数:', limitCount);
      
      const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('percentage', 'desc'),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);
      const scores = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Score));
      
      console.log(`${scores.length}件のスコアを取得:`, scores);
      return scores;
    } catch (error) {
      console.error('トップスコアの取得に失敗:', error);
      
      if (error instanceof Error && error.message.includes('index')) {
        console.log('インデックスの作成が必要です。以下のURLにアクセスしてインデックスを作成してください:');
        console.log(error.message.match(/https:\/\/.*$/)?.[0]);
      }
      
      throw new Error('スコアの取得中にエラーが発生しました');
    }
  }
};