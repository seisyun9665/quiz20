export type Score = {
    id?: string;
    playerName: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    timestamp: number;
  };

export type QuizState = {
    currentQuestionIndex: number;
    userAnswers: {
        question: string;
        answer: string;
        isCorrect: boolean;
    }[];
};