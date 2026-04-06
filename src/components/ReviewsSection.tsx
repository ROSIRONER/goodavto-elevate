import { Star } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";

const reviews = [
  {
    name: "Наталья",
    text: "Рекомендую! Это отличный автосервис! Ещё раз благодарю за ремонт моей машины! Мастера знающие и опытные! Буду обращаться ещё!",
  },
  {
    name: "Ольга",
    text: "Отличный автосервис. Ребята молодцы! Всё объяснили, показали. Сделали всё очень быстро! Теперь будем обращаться только сюда. Рекомендую 👍",
  },
  {
    name: "Иван",
    text: "Отличный сервис! Без проблем поменяли моторное масло, фильтры и свечи зажигания в день обращения 👍 Всем рекомендую!",
  },
  {
    name: "Виталий",
    text: "Перегревался автомобиль, думал замена термостата. Обратился к ребятам, промыли радиаторы — проблема ушла. Лишних работ не навязали, всё объяснили. Сделали за 40 минут. Спасибо, советую!",
  },
];

const Stars = () => (
  <div className="mb-4 flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
    ))}
  </div>
);

const twoGisUrl = "https://2gis.ru/novosibirsk/firm/70000001059883316";

const ReviewsSection = () => (
  <section id="reviews" className="relative py-28 overflow-hidden">
    <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 500px 400px at 85% 40%, hsl(0 78% 50% / 0.04), transparent)' }} />
    <div className="container mx-auto px-6">
      <SectionHeading
        label="Отзывы"
        title="Нам доверяют"
        subtitle={
          <>
            Реальные отзывы наших клиентов с{" "}
            <a
              href={twoGisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
            >
              2ГИС
            </a>
          </>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((r, i) => (
          <AnimatedSection key={r.name} delay={i * 0.12}>
            <a
              href={twoGisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-surface glass-surface-hover flex h-full flex-col rounded-2xl p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.15)]"
            >
              <Stars />
              <p className="mb-6 flex-1 font-body text-sm leading-relaxed text-muted-foreground">
                «{r.text}»
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-body text-sm font-semibold">{r.name}</div>
                  <div className="font-body text-xs text-muted-foreground">2ГИС</div>
                </div>
              </div>
            </a>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
