export type DangerLevel = "Низкий" | "Средний" | "Высокий";

type ServiceCategory =
  | "Ремонт ДВС"
  | "Ремонт ходовой части"
  | "Ремонт тормозной системы"
  | "Ремонт системы охлаждения"
  | "Техническое обслуживание"
  | "Ремонт автокондиционеров"
  | "Замена масла";

export interface DiagnosticInput {
  symptoms: string;
  brand?: string;
  model?: string;
}

export interface DiagnosticHypothesis {
  probableIssue: string;
  affectedSystem: string;
  confidence: number;
  dangerLevel: DangerLevel;
  suggestedServiceCategory: ServiceCategory;
  evidence: string[];
}

export interface DiagnosticExplanation {
  summary: string;
  evidence: string[];
  scoringFactors: string[];
}

export interface DiagnosticResult {
  probableIssue: string;
  possibleCauses: string[];
  dangerLevel: DangerLevel;
  recommendations: string[];
  suggestedServiceCategory: ServiceCategory;
  confidence: number;
  affectedSystem: string;
  matchedSymptoms: string[];
  secondaryHypotheses: DiagnosticHypothesis[];
  explanation: DiagnosticExplanation;
  urgencyAdvice: string;
}

interface KeywordRule {
  term: string;
  weight: number;
}

interface CombinationRule {
  terms: string[];
  boost: number;
  finding: string;
}

interface DiagnosticRule {
  id: string;
  affectedSystem: string;
  probableIssue: string;
  possibleCauses: string[];
  recommendations: string[];
  suggestedServiceCategory: ServiceCategory;
  dangerBase: number;
  urgencyAdvice: string;
  keywords: KeywordRule[];
  combinations?: CombinationRule[];
}

interface ScoredRule {
  rule: DiagnosticRule;
  score: number;
  maxScore: number;
  matchedSymptoms: string[];
  comboFindings: string[];
}

const diagnosticRules: DiagnosticRule[] = [
  {
    id: "engine-misfire",
    affectedSystem: "Двигатель и система управления",
    probableIssue: "Признаки пропусков зажигания или нестабильной работы двигателя",
    possibleCauses: [
      "Износ свечей зажигания, катушек или высоковольтной части",
      "Нарушение топливоподачи: форсунки, давление топлива, фильтр",
      "Подсос воздуха, загрязнение дросселя или некорректные показания датчиков",
    ],
    dangerBase: 2,
    recommendations: [
      "Выполнить компьютерную диагностику и считать ошибки ЭБУ",
      "Проверить свечи, катушки, давление топлива и состояние дроссельного узла",
      "При мигающем Check Engine снизить нагрузку и не откладывать визит в сервис",
    ],
    suggestedServiceCategory: "Ремонт ДВС",
    urgencyAdvice: "Желательно провести диагностику в ближайшее время, чтобы не повредить катализатор и двигатель.",
    keywords: [
      { term: "троит", weight: 4 },
      { term: "плавают обороты", weight: 4 },
      { term: "обороты", weight: 2 },
      { term: "потеря тяги", weight: 3 },
      { term: "не тянет", weight: 3 },
      { term: "check", weight: 3 },
      { term: "чек", weight: 3 },
      { term: "вибрация двигателя", weight: 3 },
      { term: "двигатель", weight: 2 },
    ],
    combinations: [
      { terms: ["троит", "чек"], boost: 5, finding: "Связка «троит + Check Engine» усиливает вероятность пропусков зажигания" },
      { terms: ["не тянет", "обороты"], boost: 3, finding: "Потеря тяги вместе с нестабильными оборотами указывает на проблему смеси или зажигания" },
      { terms: ["троит", "вибрация"], boost: 4, finding: "Вибрация вместе с троением усиливает гипотезу по зажиганию или форсункам" },
      { terms: ["check", "потеря тяги"], boost: 4, finding: "Check Engine и потеря тяги требуют считывания ошибок двигателя" },
      { terms: ["дым", "троит"], boost: 3, finding: "Дым и нестабильная работа двигателя могут указывать на смесь, зажигание или компрессию" },
    ],
  },
  {
    id: "suspension-cv-joint",
    affectedSystem: "Подвеска и приводы",
    probableIssue: "Возможный износ ШРУСа, ступичного узла или элементов подвески",
    possibleCauses: [
      "Износ наружного или внутреннего ШРУСа",
      "Люфт в шаровых опорах, рулевых наконечниках или сайлентблоках",
      "Повреждение ступичного подшипника, приводного вала или крепежа подвески",
    ],
    dangerBase: 2,
    recommendations: [
      "Записаться на диагностику ходовой части и приводов",
      "Проверить пыльники ШРУСов, люфты, сайлентблоки и ступичные подшипники",
      "До проверки избегать резких ускорений, ударных нагрузок и активных поворотов",
    ],
    suggestedServiceCategory: "Ремонт ходовой части",
    urgencyAdvice: "Ездить можно осторожно, но затягивать нельзя: люфт в подвеске влияет на управляемость.",
    keywords: [
      { term: "стук", weight: 3 },
      { term: "хруст", weight: 4 },
      { term: "поворот", weight: 3 },
      { term: "разгон", weight: 2 },
      { term: "вибрация", weight: 2 },
      { term: "шрус", weight: 5 },
      { term: "подвес", weight: 3 },
      { term: "кочка", weight: 2 },
      { term: "ям", weight: 2 },
    ],
    combinations: [
      { terms: ["хруст", "поворот"], boost: 6, finding: "Хруст при повороте характерен для наружного ШРУСа" },
      { terms: ["вибрация", "разгон"], boost: 4, finding: "Вибрация при разгоне может указывать на внутренний ШРУС или привод" },
      { terms: ["стук", "кочка"], boost: 3, finding: "Стук на неровностях усиливает вероятность износа подвески" },
      { terms: ["стук", "поворот"], boost: 4, finding: "Стук при повороте требует проверки рулевых элементов и опор" },
      { terms: ["гул", "подшипник"], boost: 4, finding: "Гул вместе с признаком подшипника указывает на ступичный узел" },
    ],
  },
  {
    id: "brake-system",
    affectedSystem: "Тормозная система",
    probableIssue: "Вероятный износ или перегрев элементов тормозной системы",
    possibleCauses: [
      "Износ тормозных колодок или дисков",
      "Деформация тормозного диска, заклинивание суппорта или направляющих",
      "Низкий уровень тормозной жидкости или неисправность датчика ABS",
    ],
    dangerBase: 3,
    recommendations: [
      "Не откладывать диагностику тормозной системы",
      "Проверить колодки, диски, суппорты, направляющие и уровень тормозной жидкости",
      "При провале педали или увеличении тормозного пути прекратить эксплуатацию",
    ],
    suggestedServiceCategory: "Ремонт тормозной системы",
    urgencyAdvice: "Высокий приоритет: тормозная система напрямую влияет на безопасность движения.",
    keywords: [
      { term: "тормоз", weight: 5 },
      { term: "скрип", weight: 3 },
      { term: "педаль", weight: 3 },
      { term: "биение", weight: 4 },
      { term: "колод", weight: 4 },
      { term: "диск", weight: 3 },
      { term: "abs", weight: 4 },
      { term: "ручник", weight: 2 },
    ],
    combinations: [
      { terms: ["тормоз", "биение"], boost: 5, finding: "Биение при торможении часто связано с деформацией тормозных дисков" },
      { terms: ["педаль", "провал"], boost: 7, finding: "Провал педали требует немедленной проверки гидравлики" },
      { terms: ["abs", "тормоз"], boost: 4, finding: "Индикатор ABS указывает на необходимость компьютерной диагностики тормозной системы" },
      { terms: ["скрип", "колод"], boost: 4, finding: "Скрип и упоминание колодок указывают на износ фрикционных элементов" },
      { terms: ["тормоз", "уводит"], boost: 4, finding: "Увод при торможении может быть связан с суппортом или разной эффективностью тормозов" },
    ],
  },
  {
    id: "steering-system",
    affectedSystem: "Рулевое управление",
    probableIssue: "Возможная неисправность рулевого управления или усилителя руля",
    possibleCauses: [
      "Люфт рулевых тяг, наконечников или рейки",
      "Недостаток жидкости ГУР или неисправность насоса усилителя",
      "Износ опорных подшипников или нарушение углов установки колёс",
    ],
    dangerBase: 2,
    recommendations: [
      "Проверить рулевые тяги, наконечники, рейку и опорные подшипники",
      "Оценить уровень жидкости ГУР и наличие подтёков",
      "При сильном люфте или закусывании руля не продолжать движение",
    ],
    suggestedServiceCategory: "Ремонт ходовой части",
    urgencyAdvice: "Рекомендуется оперативная диагностика: рулевое управление влияет на контроль автомобиля.",
    keywords: [
      { term: "руль", weight: 4 },
      { term: "рейка", weight: 4 },
      { term: "гур", weight: 4 },
      { term: "тяжело крут", weight: 5 },
      { term: "люфт", weight: 4 },
      { term: "уводит", weight: 3 },
      { term: "тянет в сторону", weight: 3 },
      { term: "закусывает", weight: 5 },
    ],
    combinations: [
      { terms: ["руль", "люфт"], boost: 5, finding: "Люфт руля требует проверки рулевых наконечников и рейки" },
      { terms: ["руль", "тяжело"], boost: 4, finding: "Тяжёлый руль может указывать на неисправность усилителя" },
      { terms: ["руль", "закусывает"], boost: 7, finding: "Закусывание руля является критичным признаком рулевого управления" },
      { terms: ["уводит", "тянет в сторону"], boost: 3, finding: "Увод автомобиля требует проверки рулевого управления и углов установки колёс" },
    ],
  },
  {
    id: "transmission",
    affectedSystem: "Трансмиссия",
    probableIssue: "Признаки неисправности коробки передач или сцепления",
    possibleCauses: [
      "Недостаточный уровень или деградация масла в КПП/АКПП",
      "Износ сцепления, гидротрансформатора или соленоидов АКПП",
      "Неисправность опор двигателя/КПП, приводов или датчиков трансмиссии",
    ],
    dangerBase: 2,
    recommendations: [
      "Проверить уровень и состояние трансмиссионной жидкости",
      "Провести диагностику КПП/АКПП и считать ошибки блока управления",
      "Избегать резких стартов и пробуксовок до проверки",
    ],
    suggestedServiceCategory: "Техническое обслуживание",
    urgencyAdvice: "Диагностику лучше выполнить до появления пробуксовки или аварийного режима коробки.",
    keywords: [
      { term: "короб", weight: 4 },
      { term: "акпп", weight: 5 },
      { term: "мкпп", weight: 5 },
      { term: "передач", weight: 3 },
      { term: "пинается", weight: 5 },
      { term: "рывок", weight: 3 },
      { term: "сцеплен", weight: 4 },
      { term: "пробуксов", weight: 4 },
      { term: "не переключ", weight: 4 },
    ],
    combinations: [
      { terms: ["акпп", "пинается"], boost: 6, finding: "Пинки АКПП указывают на необходимость проверки жидкости и адаптаций" },
      { terms: ["передач", "не переключ"], boost: 5, finding: "Проблема переключения передач требует диагностики трансмиссии" },
      { terms: ["рывок", "переключ"], boost: 4, finding: "Рывки при переключении указывают на трансмиссионную адаптацию, масло или опоры" },
      { terms: ["сцеплен", "пробуксов"], boost: 5, finding: "Пробуксовка сцепления требует проверки диска и корзины сцепления" },
    ],
  },
  {
    id: "battery-electrical",
    affectedSystem: "Электрика и система заряда",
    probableIssue: "Возможная неисправность аккумулятора, генератора или цепей питания",
    possibleCauses: [
      "Разряженный или изношенный аккумулятор",
      "Недостаточный заряд генератора или неисправность регулятора напряжения",
      "Плохой контакт массы, клемм или силовой проводки",
    ],
    dangerBase: 2,
    recommendations: [
      "Проверить напряжение аккумулятора под нагрузкой и заряд генератора",
      "Осмотреть клеммы, массу и силовые соединения",
      "При мигании приборов или запахе гари прекратить эксплуатацию и обратиться в сервис",
    ],
    suggestedServiceCategory: "Техническое обслуживание",
    urgencyAdvice: "Своевременная проверка снизит риск внезапного отказа запуска или остановки автомобиля.",
    keywords: [
      { term: "аккумулятор", weight: 5 },
      { term: "генератор", weight: 5 },
      { term: "стартер", weight: 3 },
      { term: "не завод", weight: 3 },
      { term: "лампа аккумулятора", weight: 5 },
      { term: "заряд", weight: 4 },
      { term: "моргает", weight: 2 },
      { term: "электр", weight: 3 },
      { term: "прибор", weight: 2 },
    ],
    combinations: [
      { terms: ["лампа аккумулятора", "заряд"], boost: 6, finding: "Индикатор заряда часто связан с генератором или ремнём привода" },
      { terms: ["не завод", "аккумулятор"], boost: 4, finding: "Отказ запуска вместе с признаками АКБ указывает на систему питания стартера" },
      { terms: ["моргает", "прибор"], boost: 3, finding: "Мерцание приборов часто связано с напряжением бортовой сети" },
      { terms: ["генератор", "заряд"], boost: 5, finding: "Генератор и заряд в симптомах усиливают электрическую гипотезу" },
    ],
  },
  {
    id: "cooling-overheat",
    affectedSystem: "Система охлаждения",
    probableIssue: "Нарушение работы системы охлаждения и риск перегрева двигателя",
    possibleCauses: [
      "Недостаточный уровень антифриза или утечка охлаждающей жидкости",
      "Неисправность термостата, вентилятора, помпы или датчика температуры",
      "Засор радиатора или воздушная пробка в системе охлаждения",
    ],
    dangerBase: 3,
    recommendations: [
      "Остановить автомобиль при росте температуры выше нормы",
      "Не открывать крышку расширительного бачка на горячем двигателе",
      "Проверить герметичность, работу вентилятора, термостата и циркуляцию антифриза",
    ],
    suggestedServiceCategory: "Ремонт системы охлаждения",
    urgencyAdvice: "Высокий приоритет: перегрев может привести к серьёзному ремонту двигателя.",
    keywords: [
      { term: "перегрев", weight: 6 },
      { term: "температура", weight: 4 },
      { term: "кипит", weight: 6 },
      { term: "антифриз", weight: 4 },
      { term: "охлажд", weight: 4 },
      { term: "вентилятор", weight: 3 },
      { term: "радиатор", weight: 3 },
      { term: "пар", weight: 4 },
    ],
    combinations: [
      { terms: ["перегрев", "антифриз"], boost: 5, finding: "Перегрев и потеря антифриза указывают на утечку или нарушение циркуляции" },
      { terms: ["температура", "вентилятор"], boost: 4, finding: "Рост температуры вместе с вентилятором требует проверки цепи охлаждения" },
      { terms: ["кипит", "пар"], boost: 7, finding: "Кипение и пар — критичный признак перегрева системы охлаждения" },
      { terms: ["радиатор", "антифриз"], boost: 4, finding: "Радиатор и антифриз в симптомах указывают на контур охлаждения" },
    ],
  },
  {
    id: "fuel-system",
    affectedSystem: "Топливная система",
    probableIssue: "Вероятное нарушение подачи топлива или смесеобразования",
    possibleCauses: [
      "Засор топливного фильтра, сетки бензонасоса или форсунок",
      "Недостаточное давление топлива",
      "Некорректные показания датчиков воздуха/кислорода или подсос воздуха",
    ],
    dangerBase: 2,
    recommendations: [
      "Проверить давление топлива и производительность насоса",
      "Оценить состояние фильтров, форсунок и датчиков смеси",
      "Не продолжать активную эксплуатацию при рывках и провалах тяги",
    ],
    suggestedServiceCategory: "Ремонт ДВС",
    urgencyAdvice: "Рекомендуется диагностика, чтобы избежать нестабильной работы двигателя и повышенного расхода топлива.",
    keywords: [
      { term: "топлив", weight: 5 },
      { term: "бензонасос", weight: 5 },
      { term: "форсунк", weight: 4 },
      { term: "провал", weight: 3 },
      { term: "рывки", weight: 3 },
      { term: "расход", weight: 3 },
      { term: "бедная смесь", weight: 5 },
      { term: "запах бенз", weight: 5 },
    ],
    combinations: [
      { terms: ["рывки", "провал"], boost: 4, finding: "Рывки и провалы под нагрузкой часто связаны с подачей топлива" },
      { terms: ["запах бенз", "расход"], boost: 4, finding: "Запах топлива и расход требуют проверки герметичности топливной системы" },
      { terms: ["бензонасос", "не завод"], boost: 5, finding: "Бензонасос и отказ запуска указывают на проверку давления топлива" },
      { terms: ["форсунк", "троит"], boost: 4, finding: "Форсунки и троение двигателя указывают на качество распыла и топливоподачу" },
    ],
  },
  {
    id: "exhaust-smoke",
    affectedSystem: "Выпускная система и состояние двигателя",
    probableIssue: "Необычный дым или запах выхлопа требует проверки двигателя и выпуска",
    possibleCauses: [
      "Синий дым: возможное попадание масла в камеры сгорания",
      "Белый густой дым: возможное попадание антифриза или конденсат при прогреве",
      "Чёрный дым: переобогащение смеси, форсунки или датчики",
    ],
    dangerBase: 2,
    recommendations: [
      "Определить цвет дыма, условия появления и уровень масла/антифриза",
      "Провести диагностику двигателя, системы впрыска и выпуска",
      "При густом дыме, запахе гари или падении уровня жидкостей не откладывать осмотр",
    ],
    suggestedServiceCategory: "Ремонт ДВС",
    urgencyAdvice: "При постоянном дыме лучше не затягивать: симптом может указывать на внутренний износ двигателя.",
    keywords: [
      { term: "дым", weight: 5 },
      { term: "выхлоп", weight: 4 },
      { term: "синий", weight: 4 },
      { term: "белый", weight: 3 },
      { term: "черный", weight: 4 },
      { term: "чёрный", weight: 4 },
      { term: "запах гари", weight: 5 },
      { term: "масло", weight: 3 },
      { term: "антифриз", weight: 3 },
    ],
    combinations: [
      { terms: ["дым", "масло"], boost: 5, finding: "Дым вместе с расходом масла усиливает вероятность износа двигателя" },
      { terms: ["белый", "антифриз"], boost: 6, finding: "Белый дым и уход антифриза требуют проверки герметичности двигателя" },
      { terms: ["черный", "расход"], boost: 4, finding: "Чёрный дым и расход топлива указывают на переобогащение смеси" },
      { terms: ["запах гари", "дым"], boost: 6, finding: "Запах гари и дым требуют срочного осмотра двигателя и выпуска" },
    ],
  },
  {
    id: "startup-problems",
    affectedSystem: "Система запуска",
    probableIssue: "Проблемы запуска двигателя: стартер, питание, топливо или зажигание",
    possibleCauses: [
      "Слабый аккумулятор, плохой контакт клемм или массы",
      "Неисправность стартера, реле или замка зажигания",
      "Недостаточная подача топлива или отсутствие искры",
    ],
    dangerBase: 2,
    recommendations: [
      "Проверить заряд аккумулятора, клеммы и массу",
      "Оценить работу стартера, реле и наличие ошибок иммобилайзера",
      "Если двигатель крутит, но не схватывает — проверить топливо и зажигание",
    ],
    suggestedServiceCategory: "Техническое обслуживание",
    urgencyAdvice: "Диагностика поможет избежать повторной ситуации, когда автомобиль не заведётся в неподходящий момент.",
    keywords: [
      { term: "не завод", weight: 5 },
      { term: "не запуска", weight: 5 },
      { term: "стартер", weight: 4 },
      { term: "щелкает", weight: 4 },
      { term: "крутит", weight: 3 },
      { term: "не схватывает", weight: 5 },
      { term: "утром", weight: 2 },
      { term: "иммобилайзер", weight: 4 },
    ],
    combinations: [
      { terms: ["щелкает", "не завод"], boost: 5, finding: "Щелчки при запуске часто связаны с АКБ, стартером или контактами" },
      { terms: ["крутит", "не схватывает"], boost: 5, finding: "Стартер крутит, но двигатель не запускается — нужно проверить топливо и искру" },
      { terms: ["утром", "не завод"], boost: 3, finding: "Проблемы утром часто связаны с АКБ, топливом или датчиками температуры" },
      { terms: ["иммобилайзер", "не запуска"], boost: 4, finding: "Иммобилайзер и отказ запуска требуют проверки доступа и ошибок блока" },
    ],
  },
  {
    id: "dashboard-warnings",
    affectedSystem: "Электронные системы и контрольные индикаторы",
    probableIssue: "На панели приборов активны предупреждения электронных систем",
    possibleCauses: [
      "Сохранённые ошибки в блоках управления двигателя, ABS, SRS или зарядки",
      "Неисправность датчика, проводки или исполнительного механизма",
      "Сбой после просадки напряжения или некорректной работы системы",
    ],
    dangerBase: 2,
    recommendations: [
      "Выполнить компьютерную диагностику и считать коды ошибок",
      "Не стирать ошибки без проверки причины их появления",
      "При красных индикаторах масла, температуры или тормозов прекратить движение",
    ],
    suggestedServiceCategory: "Техническое обслуживание",
    urgencyAdvice: "При жёлтых индикаторах можно доехать до сервиса осторожно, красные требуют немедленной остановки.",
    keywords: [
      { term: "горит", weight: 3 },
      { term: "панель", weight: 3 },
      { term: "ошибка", weight: 4 },
      { term: "индикатор", weight: 4 },
      { term: "check", weight: 4 },
      { term: "abs", weight: 4 },
      { term: "srs", weight: 4 },
      { term: "airbag", weight: 4 },
      { term: "масленка", weight: 5 },
      { term: "аккумулятор", weight: 3 },
    ],
    combinations: [
      { terms: ["горит", "abs"], boost: 4, finding: "Индикатор ABS требует проверки датчиков скорости колёс и блока ABS" },
      { terms: ["горит", "масленка"], boost: 8, finding: "Индикатор давления масла — критический симптом" },
      { terms: ["горит", "аккумулятор"], boost: 5, finding: "Индикатор АКБ часто связан с системой заряда" },
    ],
  },
  {
    id: "general-vibration-noise",
    affectedSystem: "Колёса, подвеска и силовой агрегат",
    probableIssue: "Комбинация вибраций и шумов требует проверки ходовой части, колёс и опор агрегатов",
    possibleCauses: [
      "Дисбаланс колёс, повреждение шины или деформация диска",
      "Износ ступичного подшипника, опор двигателя или элементов подвески",
      "Люфт приводов или креплений силового агрегата",
    ],
    dangerBase: 2,
    recommendations: [
      "Проверить колёса, шины, балансировку и состояние дисков",
      "Провести диагностику подвески, ступичных подшипников и опор двигателя",
      "Отследить скорость и режим, при которых появляется вибрация",
    ],
    suggestedServiceCategory: "Ремонт ходовой части",
    urgencyAdvice: "Рекомендуется диагностика: вибрации ускоряют износ подвески и шин.",
    keywords: [
      { term: "вибрация", weight: 4 },
      { term: "шум", weight: 3 },
      { term: "гул", weight: 4 },
      { term: "скорости", weight: 2 },
      { term: "разгон", weight: 2 },
      { term: "тряска", weight: 4 },
      { term: "колес", weight: 3 },
      { term: "резина", weight: 2 },
      { term: "подшипник", weight: 4 },
    ],
    combinations: [
      { terms: ["гул", "скорости"], boost: 5, finding: "Гул на скорости часто связан со ступичным подшипником или шинами" },
      { terms: ["вибрация", "колес"], boost: 4, finding: "Вибрация на скорости часто начинается с колёс и балансировки" },
    ],
  },
  {
    id: "oil-pressure-service",
    affectedSystem: "Смазочная система двигателя",
    probableIssue: "Возможная проблема с давлением масла или уровнем смазки двигателя",
    possibleCauses: [
      "Низкий уровень масла или неподходящая вязкость",
      "Неисправность датчика давления масла или масляного насоса",
      "Повышенный износ двигателя или утечка масла",
    ],
    dangerBase: 3,
    recommendations: [
      "Остановить двигатель при горящем индикаторе давления масла",
      "Проверить уровень масла и наличие подтёков",
      "Провести диагностику давления масла до дальнейшей эксплуатации",
    ],
    suggestedServiceCategory: "Замена масла",
    urgencyAdvice: "Критический приоритет: недостаток давления масла может быстро повредить двигатель.",
    keywords: [
      { term: "масло", weight: 4 },
      { term: "давление масла", weight: 6 },
      { term: "масленка", weight: 6 },
      { term: "лампа масла", weight: 6 },
      { term: "стук двигателя", weight: 5 },
      { term: "уровень масла", weight: 4 },
      { term: "течь масла", weight: 4 },
    ],
    combinations: [
      { terms: ["масленка", "стук"], boost: 8, finding: "Индикатор масла вместе со стуком двигателя — критическая комбинация" },
      { terms: ["давление масла", "двигатель"], boost: 6, finding: "Низкое давление масла требует немедленной проверки" },
    ],
  },
  {
    id: "ac-climate",
    affectedSystem: "Кондиционер и климатическая система",
    probableIssue: "Снижение эффективности системы кондиционирования или вентиляции салона",
    possibleCauses: [
      "Недостаток хладагента или утечка в системе кондиционирования",
      "Загрязнение радиатора кондиционера или салонного фильтра",
      "Неисправность компрессора, муфты, вентилятора или датчиков давления",
    ],
    dangerBase: 1,
    recommendations: [
      "Проверить герметичность системы кондиционирования",
      "Выполнить обслуживание и заправку автокондиционера",
      "Проверить салонный фильтр, вентилятор и качество обдува",
    ],
    suggestedServiceCategory: "Ремонт автокондиционеров",
    urgencyAdvice: "Низкий риск для движения, но обслуживание восстановит комфорт и предотвратит поломку компрессора.",
    keywords: [
      { term: "кондиционер", weight: 5 },
      { term: "кондей", weight: 5 },
      { term: "климат", weight: 4 },
      { term: "не холод", weight: 5 },
      { term: "фреон", weight: 4 },
      { term: "обдув", weight: 3 },
      { term: "запах", weight: 2 },
      { term: "печка", weight: 3 },
    ],
    combinations: [
      { terms: ["кондиционер", "не холод"], boost: 5, finding: "Отсутствие холода чаще всего связано с хладагентом или компрессором" },
      { terms: ["запах", "обдув"], boost: 3, finding: "Запах из дефлекторов указывает на обслуживание вентиляции и фильтра" },
    ],
  },
];

const fallbackResult: Omit<DiagnosticResult, "confidence" | "matchedSymptoms" | "secondaryHypotheses" | "explanation"> = {
  probableIssue: "Требуется первичная комплексная диагностика",
  affectedSystem: "Несколько систем автомобиля",
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
  urgencyAdvice: "Рекомендуется очная диагностика, чтобы точно определить источник симптомов.",
};

const criticalTerms = [
  "провал педали",
  "нет тормоз",
  "кипит",
  "перегрев",
  "масленка",
  "давление масла",
  "красный индикатор",
  "дым из под капота",
  "запах гари",
  "закусывает руль",
  "нет тормозов",
  "отказ тормозов",
  "педаль провалилась",
  "горит масло",
  "лампа масла",
  "сильный перегрев",
  "пожар",
  "едкий дым",
];

const normalize = (value: string) => value.toLowerCase().replace(/ё/g, "е").trim();

const unique = <T>(items: T[]) => Array.from(new Set(items));

const scoreRule = (text: string, rule: DiagnosticRule): ScoredRule => {
  const matchedKeywords = rule.keywords.filter(({ term }) => text.includes(normalize(term)));
  const keywordScore = matchedKeywords.reduce((score, { weight }) => score + weight, 0);
  const maxKeywordScore = rule.keywords.reduce((score, { weight }) => score + weight, 0);

  const matchedCombinations = (rule.combinations ?? []).filter(({ terms }) =>
    terms.every((term) => text.includes(normalize(term))),
  );
  const comboScore = matchedCombinations.reduce((score, { boost }) => score + boost, 0);

  return {
    rule,
    score: keywordScore + comboScore,
    maxScore: maxKeywordScore + (rule.combinations ?? []).reduce((score, { boost }) => score + boost, 0),
    matchedSymptoms: unique(matchedKeywords.map(({ term }) => term)),
    comboFindings: matchedCombinations.map(({ finding }) => finding),
  };
};

const toDangerLevel = (base: number, text: string, score: number): DangerLevel => {
  const hasCriticalTerm = criticalTerms.some((term) => text.includes(normalize(term)));
  const adjusted = Math.min(3, base + (hasCriticalTerm ? 1 : 0) + (score >= 16 ? 1 : 0));

  if (adjusted >= 3) return "Высокий";
  if (adjusted === 2) return "Средний";
  return "Низкий";
};

const calculateConfidence = (best: ScoredRule, second?: ScoredRule) => {
  const coverage = best.maxScore > 0 ? best.score / best.maxScore : 0;
  const separation = second ? Math.max(0, best.score - second.score) : best.score;
  const matchedSymptomFactor = Math.min(18, best.matchedSymptoms.length * 3);
  const combinationFactor = Math.min(20, best.comboFindings.length * 6);
  const importanceFactor = Math.min(14, best.score * 0.8);
  const separationFactor = Math.min(16, separation * 2.2);
  const rawConfidence = 34 + coverage * 20 + matchedSymptomFactor + combinationFactor + importanceFactor + separationFactor;

  return Math.round(Math.max(42, Math.min(96, rawConfidence)));
};

const toHypothesis = (scoredRule: ScoredRule, second?: ScoredRule): DiagnosticHypothesis => ({
  probableIssue: scoredRule.rule.probableIssue,
  affectedSystem: scoredRule.rule.affectedSystem,
  confidence: calculateConfidence(scoredRule, second),
  dangerLevel: toDangerLevel(scoredRule.rule.dangerBase, "", scoredRule.score),
  suggestedServiceCategory: scoredRule.rule.suggestedServiceCategory,
  evidence: unique([...scoredRule.matchedSymptoms, ...scoredRule.comboFindings]).slice(0, 4),
});

const buildExplanation = (best: ScoredRule, second?: ScoredRule): DiagnosticExplanation => ({
  summary: `Диагноз выбран как наиболее вероятный по системе «${best.rule.affectedSystem}»: совпало ${best.matchedSymptoms.length} симптомов и ${best.comboFindings.length} диагностических комбинаций.`,
  evidence: unique([...best.matchedSymptoms, ...best.comboFindings]).slice(0, 6),
  scoringFactors: [
    `Суммарный вес совпадений: ${best.score}`,
    `Важность совпавших симптомов учтена через весовые коэффициенты`,
    `Комбинационные признаки: ${best.comboFindings.length}`,
    second ? `Отрыв от ближайшей гипотезы: ${Math.max(0, best.score - second.score)} балл(ов)` : "Конкурирующих гипотез с близким весом не найдено",
  ],
});

export const analyzeVehicleSymptoms = async ({
  symptoms,
  brand,
  model,
}: DiagnosticInput): Promise<DiagnosticResult> => {
  const normalizedSymptoms = normalize(`${symptoms} ${brand ?? ""} ${model ?? ""}`);

  await new Promise((resolve) => setTimeout(resolve, 900));

  const rankedRules = diagnosticRules
    .map((rule) => scoreRule(normalizedSymptoms, rule))
    .sort((a, b) => b.score - a.score);

  const bestMatch = rankedRules[0];

  if (!bestMatch || bestMatch.score < 3) {
    return {
      ...fallbackResult,
      confidence: 42,
      matchedSymptoms: [],
      secondaryHypotheses: [],
      explanation: {
        summary: "Симптомов недостаточно для уверенного сопоставления с экспертными правилами.",
        evidence: [],
        scoringFactors: ["Недостаточное количество совпавших диагностических признаков"],
      },
    };
  }

  const secondaryHypotheses = rankedRules
    .slice(1, 4)
    .map((scoredRule, index, hypotheses) => toHypothesis(scoredRule, hypotheses[index + 1]));

  return {
    probableIssue: bestMatch.rule.probableIssue,
    affectedSystem: bestMatch.rule.affectedSystem,
    possibleCauses: bestMatch.rule.possibleCauses,
    dangerLevel: toDangerLevel(bestMatch.rule.dangerBase, normalizedSymptoms, bestMatch.score),
    recommendations: bestMatch.rule.recommendations,
    suggestedServiceCategory: bestMatch.rule.suggestedServiceCategory,
    urgencyAdvice: bestMatch.rule.urgencyAdvice,
    confidence: calculateConfidence(bestMatch, rankedRules[1]),
    matchedSymptoms: unique([...bestMatch.matchedSymptoms, ...bestMatch.comboFindings]).slice(0, 6),
    secondaryHypotheses,
    explanation: buildExplanation(bestMatch, rankedRules[1]),
  };
};
