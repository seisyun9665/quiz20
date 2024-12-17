// sampleQuizData.ts
type QuizQuestion = {
  question: string;
  type: 'multiple-choice' | 'text';
  options?: string[];
  answer: string;
  explanation: string;
}

export const quizData: QuizQuestion[] = [
  {
    question: "日本の首相が国会で行う演説で、新年度の政策方針を示すものを何というか？",
    type: "text",
    answer: "施政方針演説",
    explanation: "毎年1月の通常国会開会時に、首相が行う重要な政策演説"
  },
  {
    question: "次の漢字の読み方を答えよ：「憂鬱」",
    type: "text",
    answer: "ゆううつ",
    explanation: "気分が晴れない、沈んだ気持ちを表す言葉"
  },
  {
    question: "地球の大気中で最も多い気体は何か？",
    type: "text",
    answer: "窒素",
    explanation: "大気中の約78%を占める気体（N2）"
  },
  {
    question: "1辺が6cmの立方体の体積は何cm³か？",
    type: "text",
    answer: "216",
    explanation: "計算：6 × 6 × 6 = 216"
  },
  {
    question: "「コペルニクス的転回」とは何を指す言葉か？",
    type: "text",
    answer: "物事の見方や考え方を根本的に変えることで、新しい局面を切り開くこと",
    explanation: "地動説への転換のように、従来の考え方を根本的に覆す変革を指す"
  },
  {
    question: "日本の四大公害病のうち、熊本県で発生したものは何か？",
    type: "text",
    answer: "水俣病",
    explanation: "チッソ株式会社による有機水銀汚染が原因"
  },
  {
    question: "次の英文を和訳せよ：「The early bird catches the worm.」",
    type: "text",
    answer: "早起きは三文の得",
    explanation: "直訳：「早起きの鳥は虫を捕まえる」という意味の英語の格言"
  },
  {
    question: "平安時代に書かれた「源氏物語」の作者は誰か？",
    type: "text",
    answer: "紫式部",
    explanation: "平安時代中期の女性作家。世界最古の長編小説とされる源氏物語を執筆"
  },
  {
    question: "人体の血液型で最も珍しいとされるのは何型か？",
    type: "text",
    answer: "AB型",
    explanation: "日本人の約10%程度、世界的にも最も珍しい血液型"
  },
  {
    question: "2024年に開催された夏季オリンピックの開催地はどこか？",
    type: "text",
    answer: "パリ",
    explanation: "2024年7月26日〜8月11日に開催予定のフランス・パリ大会"
  },
  {
    question: "2024年7月から発行された新紙幣の1万円札に描かれている人物は誰か？",
    type: "text",
    answer: "渋沢栄一",
    explanation: "渋沢栄一は明治時代の実業家で、新紙幣の1万円札に描かれている"
  },
  {
    question: "2024年1月に発生し、大きな被害をもたらした地震の震源地となった半島の名前は？",
    type: "text",
    answer: "能登半島",
    explanation: "2024年1月1日に発生した最大震度7の地震の震源地"
  },
  {
    question: "次の四字熟語の読み方を答えよ：「一石二鳥」",
    type: "text",
    answer: "いっせきにちょう",
    explanation: "一つのことで二つの利益を得るという意味"
  },
  {
    question: "日本の47都道府県のうち、最も面積が小さいのはどこか？",
    type: "text",
    answer: "香川県",
    explanation: "面積1,877km²で日本で最も小さい都道府県"
  },
  {
    question: "2024年に世界文化遺産に登録された、新潟県にある金鉱山跡の名称は？",
    type: "text",
    answer: "佐渡金山",
    explanation: "2024年に世界文化遺産に登録された金鉱山跡"
  },
  {
    question: "2024年の日本の出生数が過去最低を記録したが、この現象を表す言葉は何か？",
    type: "text",
    answer: "少子化",
    explanation: "出生数の急激な減少を指す現象"
  },
  {
    question: "次の英文を和訳せよ：「Actions speak louder than words.」",
    type: "text",
    answer: "行動は言葉よりも雄弁だ",
    explanation: "実際の行動の方が言葉より重要であることを表す格言"
  },
  {
    question: "日本で最も高い山は富士山ですが、2番目に高い山は何か？",
    type: "text",
    answer: "北岳",
    explanation: "富士山に次いで日本で2番目に高い山（3,193m）"
  },
  {
    question: "2024年10月に就任した日本の新しい首相の名前は？",
    type: "text",
    answer: "岸田文雄",
    explanation: "2024年も引き続き首相を務めている"
  },
  {
    question: "東海道新幹線が開通してから2024年で何年になったか？",
    type: "text",
    answer: "60",
    explanation: "1964年に開通し、2024年で60年目"
  }
];