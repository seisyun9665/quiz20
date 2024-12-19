'use server'

import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function checkAnswer(userAnswer: string, correctAnswer: string): Promise<{
  isCorrect: boolean;
  confidence: number;
  explanation: string;
}> {
  console.log('checkAnswer called with:', { userAnswer, correctAnswer });

  try {
    console.log('Calling Groq API...');
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `日本語の解答の正誤判定を行います。以下の基準で判定してください：

1. 表記の揺れは許容する
- ひらがな/カタカナ/漢字の表記揺れ（例：「ちっそ」「チッソ」「窒素」）
- 括弧書きの有無（例：「窒素」「窒素(N2)」）
- 送り仮名の違い（例：「行う」「おこなう」）
- スペースや句読点の有無
- 英数字の全角/半角

2. 同じ意味を表す別の表現も正解とする
- 同義語（例：「少子化」「出生数の減少」）
- 一般的な言い換え（例：「早起きは三文の得」「早起きは得をする」）

3. ただし、明らかに異なる意味や不正確な回答は不正解とする

判定は厳密に行い、確信度（confidence）も適切に設定してください。`
        },
        {
          role: 'user',
          content: `
正解: ${correctAnswer}
ユーザーの回答: ${userAnswer}

この回答が正解かどうか判定し、以下のJSON形式で返してください：
{
  "isCorrect": boolean,
  "confidence": number (0-1),
  "explanation": string
}
`
        }
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.1,
      response_format: { type: 'json_object' }
    });

    console.log('Groq API response:', completion.choices[0]?.message?.content);

    const result = JSON.parse(completion.choices[0]?.message?.content || '');
    console.log('Parsed result:', result);
    return result;
  } catch (error) {
    console.error('Groq API error:', error);
    return {
      isCorrect: false,
      confidence: 0,
      explanation: 'エラーが発生しました: ' + (error instanceof Error ? error.message : String(error))
    };
  }
} 