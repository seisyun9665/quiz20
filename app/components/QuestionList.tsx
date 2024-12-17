type QuestionListProps = {
    questions: {
        question: string;
        answer: string;
        explanation: string;
    }[];
    onStartFromQuestion: (index: number) => void;
    previousAnswers?: string[];
};

export const QuestionList: React.FC<QuestionListProps> = ({
    questions,
    onStartFromQuestion,
    previousAnswers = []
}) => {
    return (
        <div className="max-w-4xl mx-auto sm:px-4 py-6 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-gray-800">
                問題一覧
            </h2>

            <div className="space-y-6 sm:space-y-8">
                {questions.map((question, index) => (
                    <div key={index} className="bg-white p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-md border-2 border-gray-100">
                        <div className="space-y-3">
                            <div className="text-primary font-medium text-sm sm:text-base">
                                第{index + 1}問
                            </div>
                            <p className="font-medium text-gray-800 text-base sm:text-lg">
                                {question.question}
                            </p>
                        </div>

                        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            {previousAnswers[index] && (
                                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full 
                                    bg-yellow-50 text-yellow-600 text-xs sm:text-sm border border-yellow-200">
                                    <span>📝</span>
                                    <span>前回の回答あり</span>
                                </div>
                            )}
                            <button
                                onClick={() => onStartFromQuestion(index)}
                                className="w-full sm:w-auto px-4 py-3 sm:py-2 text-base sm:text-lg font-medium 
                                    bg-white text-primary border-2 border-primary rounded-lg sm:rounded-xl 
                                    hover:bg-primary/5 transition-all duration-200 
                                    flex items-center justify-center gap-2"
                            >
                                <span>この問題から始める</span>
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};