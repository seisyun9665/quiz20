import { db } from '../firebase/config';
import { collection, addDoc, query, orderBy, limit, getDocs, doc, updateDoc, getDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { Score } from '../types/score';

const COLLECTION_NAME = 'scores';

type FeedbackData = {
  ratings: {
    average: number;
    count: number;
    distribution: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
  };
  comments: {
    playerName: string;
    comment: string;
    rating: number;
    timestamp: number;
  }[];
};

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
  },

  async addFeedback(): Promise<void> {
    try {
      const feedbackRef = doc(db, 'feedback', 'stats');
      const feedbackDoc = await getDoc(feedbackRef);
      
      if (feedbackDoc.exists()) {
        await updateDoc(feedbackRef, {
          likes: (feedbackDoc.data().likes || 0) + 1,
          lastUpdated: Date.now()
        });
      } else {
        await setDoc(feedbackRef, {
          likes: 1,
          lastUpdated: Date.now()
        });
      }
    } catch (error) {
      console.error('フィードバックの追加に失敗:', error);
      throw new Error('フィードバックの保存中にエラーが発生しました');
    }
  },

  async getFeedbackStats(): Promise<{
    ratings: {
      average: number;
      count: number;
      distribution: { [key: number]: number };
    };
  }> {
    try {
      const feedbackRef = doc(db, 'feedback', 'stats');
      const feedbackDoc = await getDoc(feedbackRef);
      
      if (feedbackDoc.exists()) {
        const data = feedbackDoc.data();
        return {
          ratings: data.ratings || {
            average: 0,
            count: 0,
            distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
          }
        };
      }
      return {
        ratings: {
          average: 0,
          count: 0,
          distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        }
      };
    } catch (error) {
      console.error('フィードバック統計の取得に失敗:', error);
      throw new Error('フィードバック統計の取得中にエラーが発生しました');
    }
  },

  async addComment(comment: { playerName: string; comment: string }): Promise<void> {
    try {
      const feedbackRef = doc(db, 'feedback', 'stats');
      const feedbackDoc = await getDoc(feedbackRef);
      
      const newComment = {
        ...comment,
        timestamp: Date.now()
      };

      if (feedbackDoc.exists()) {
        await updateDoc(feedbackRef, {
          comments: arrayUnion(newComment)
        });
      } else {
        await setDoc(feedbackRef, {
          likes: 0,
          comments: [newComment]
        });
      }
    } catch (error) {
      console.error('感想の追加に失敗:', error);
      throw new Error('感想の保存中にエラーが発生しました');
    }
  },

  async addRating(rating: number): Promise<void> {
    try {
      const feedbackRef = doc(db, 'feedback', 'stats');
      const feedbackDoc = await getDoc(feedbackRef);
      
      if (feedbackDoc.exists()) {
        const data = feedbackDoc.data();
        const ratings = data.ratings || {
          average: 0,
          count: 0,
          distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        };
        
        const newCount = ratings.count + 1;
        const newAverage = ((ratings.average * ratings.count) + rating) / newCount;
        ratings.distribution[rating]++;
        
        await updateDoc(feedbackRef, {
          ratings: {
            average: newAverage,
            count: newCount,
            distribution: ratings.distribution
          }
        });
      } else {
        await setDoc(feedbackRef, {
          ratings: {
            average: rating,
            count: 1,
            distribution: {
              1: rating === 1 ? 1 : 0,
              2: rating === 2 ? 1 : 0,
              3: rating === 3 ? 1 : 0,
              4: rating === 4 ? 1 : 0,
              5: rating === 5 ? 1 : 0
            }
          }
        });
      }
    } catch (error) {
      console.error('評価の追加に失敗:', error);
      throw new Error('評価の保存中にエラーが発生しました');
    }
  }
};