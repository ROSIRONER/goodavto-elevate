export type DangerLevel = "Низкий" | "Средний" | "Высокий";

export interface DiagnosticInput {
  symptoms: string;
  brand?: string;
  model?: string;
}

export interface DiagnosticResult {
  probableIssue: string;
  possibleCauses: string[];
  dangerLevel: DangerLevel;
  recommendations: string[];
  suggestedServiceCategory: string;
  confidence: number;
}

interface DiagnosticRule {
  keywords: string[];
  result: Omit<DiagnosticResult, "confidence">;
}

const diagnosticRules: DiagnosticRule[] = [
  {
    keywords: ["стук", "хруст", "поворот", "вибра", "разгон", "шрус", "руль"],
    result: {
      probableIssue: "Возможный износ ШРУСа или элементов подвески",
      possibleCauses: [
        "Износ наружного или внутреннего ШРУСа",
        "Люфт в шаровых опорах, рулевых наконечниках или сайлентблоках",
        "Дисбаланс колёс или повреждение приводного вала",
      ],
      dangerLevel: "Средний",
      recommendations: [
        "Записаться на диагностику ходовой части и приводов",
        "Избегать резких ускорений и активных поворотов до проверки",
        "Проверить пыльники ШРУСов и состояние крепежа подвески",
      ],
      suggestedServiceCategory: "Ремонт ходовой части",
    },
  },
  {
    keywords: ["перегрев", "температура", "кипит", "антифриз", "охлажд", "вентилятор"],
    result: {
      probableIssue: "Нарушение работы системы охлаждения",
      possibleCauses: [
        "Недостаточный уровень охлаждающей жидкости",
        "Неисправность термостата, вентилятора или датчика температуры",
        "Засор радиатора или утечка в системе охлаждения",
      ],
      dangerLevel: "Высокий",
      recommendations: [
        "Остановить автомобиль при росте температуры выше нормы",
        "Не открывать крышку расширительного бачка на горячем двигателе",
        "Провести диагностику системы охлаждения перед дальнейшей эксплуатацией",
      ],
      suggestedServiceCategory: "Ремонт системы охлаждения",
    },
  },
  {
    keywords: ["тормоз", "скрип", "педаль", "биение", "диск", "колод", "abs"],
    result: {
      probableIssue: "Вероятный износ элементов тормозной системы",
      possibleCauses: [
        "Износ тормозных колодок или дисков",
        "Попадание грязи, перегрев или деформация тормозного диска",
        "Проблемы с суппортом, направляющими или датчиком ABS",
      ],
      dangerLevel: "Высокий",
      recommendations: [
        "Не откладывать диагностику тормозной системы",
        "Избегать резкого торможения без необходимости",
        "Проверить колодки, диски, суппорты и уровень тормозной жидкости",
      ],
      suggestedServiceCategory: "Ремонт тормозной системы",
    },
  },
  {
    keywords: ["двигатель", "троит", "плавают", "обороты", "дым", "масло", "тяга", "чек"],
    result: {
      probableIssue: "Возможная неисправность двигателя или системы управления",
      possibleCauses: [
        "Пропуски зажигания, свечи, катушки или топливная система",
        "Подсос воздуха, загрязнение дросселя или датчиков",
        "Повышенный расход масла или проблемы с компрессией",
      ],
      dangerLevel: "Средний",
      recommendations: [
        "Провести компьютерную диагностику и проверку двигателя",
        "Не эксплуатировать автомобиль при сильной вибрации или мигающем Check Engine",
        "Проверить уровень масла и наличие посторонних шумов",
      ],
      suggestedServiceCategory: "Ремонт ДВС",
    },
  },
  {
    keywords: ["кондиционер", "кондей", "холод", "дует", "запах", "фреон", "климат"],
    result: {
      probableIssue: "Снижение эффективности системы кондиционирования",
      possibleCauses: [
        "Недостаток хладагента в системе",
        "Загрязнение радиатора кондиционера или салонного фильтра",
        "Неисправность компрессора, муфты или датчиков давления",
      ],
      dangerLevel: "Низкий",
      recommendations: [
        "Проверить герметичность системы кондиционирования",
        "Выполнить обслуживание и заправку автокондиционера",
        "Проверить салонный фильтр и качество обдува",
      ],
      suggestedServiceCategory: "Ремонт автокондиционеров",
    },
  },
];

const fallbackResult: Omit<DiagnosticResult, "confidence"> = {
  probableIssue: "Требуется первичная комплексная диагностика",
  possibleCauses: [
    "Симптомы могут относиться к нескольким системам автомобиля",
    "Нужна проверка фактического состояния узлов и электронных ошибок",
    "Возможна совокупность нескольких небольших неисправностей",
  ],
  dangerLevel: "Средний",
  recommendations: [
    "Опишите симптомы подробнее: когда проявляются, на какой скорости и при каких условиях",
    "Записаться на первичную диагностику для точного определения причины",
    "При усилении шума, запахе гари или потере управляемости прекратить эксплуатацию",
  ],
  suggestedServiceCategory: "Техническое обслуживание",
};

const normalize = (value: string) => value.toLowerCase().trim();

const calculateScore = (text: string, keywords: string[]) =>
  keywords.reduce((score, keyword) => (text.includes(keyword) ? score + 1 : score), 0);

export const analyzeVehicleSymptoms = async ({
  symptoms,
  brand,
  model,
}: DiagnosticInput): Promise<DiagnosticResult> => {
  const normalizedSymptoms = normalize(`${symptoms} ${brand ?? ""} ${model ?? ""}`);

  await new Promise((resolve) => setTimeout(resolve, 900));

  const rankedRules = diagnosticRules
    .map((rule) => ({ rule, score: calculateScore(normalizedSymptoms, rule.keywords) }))
    .sort((a, b) => b.score - a.score);

  const bestMatch = rankedRules[0];
  const selectedResult = bestMatch?.score > 0 ? bestMatch.rule.result : fallbackResult;
  const confidence = bestMatch?.score
    ? Math.min(92, 58 + bestMatch.score * 7)
    : 48;

  return {
    ...selectedResult,
    confidence,
  };
};
