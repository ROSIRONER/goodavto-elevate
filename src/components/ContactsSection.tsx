import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import CTAButtons from "./CTAButtons";
import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";

const ContactsSection = () => (
  <section id="contacts" className="relative py-28 overflow-hidden">
    <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 600px 400px at 10% 40%, hsl(0 78% 50% / 0.05), transparent), radial-gradient(ellipse 500px 500px at 85% 80%, hsl(0 78% 50% / 0.04), transparent)' }} />
    <div className="container mx-auto px-6">
      <SectionHeading
        label="Контакты"
        title="Как нас найти"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Info */}
        <AnimatedSection>
          <div className="glass-surface flex flex-col gap-8 rounded-2xl p-8 lg:p-10">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-body text-sm font-semibold">Адрес</div>
                  <div className="font-body text-sm text-muted-foreground">
                    Новосибирск, ул. Мира 62В
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-body text-sm font-semibold">Время работы</div>
                  <div className="font-body text-sm text-muted-foreground">
                    Ежедневно с 10:00 до 20:00
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-body text-sm font-semibold">Телефон</div>
                  <a
                    href="tel:89831228588"
                    className="font-body text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    8-983-122-85-88
                  </a>
                </div>
              </div>
            </div>

            <CTAButtons />

            <div className="flex flex-wrap gap-3 border-t border-border pt-6">
              <a
                href="https://yandex.ru/maps/?text=Новосибирск+ул+Мира+62В"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-surface glass-surface-hover inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-body text-xs font-medium transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Открыть в Яндекс.Картах
              </a>
              <a
                href="https://2gis.ru/novosibirsk/search/ул.+Мира+62В"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-surface glass-surface-hover inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-body text-xs font-medium transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Мы в 2ГИС
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Map */}
        <AnimatedSection delay={0.2}>
          <div className="h-full min-h-[400px] overflow-hidden rounded-2xl border border-border">
            <iframe
              title="GoodAvto Service на карте"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A&source=constructor&text=Новосибирск%2C+ул.+Мира+62В&z=16&l=map&pt=82.920430,55.030199,pm2rdm"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400, filter: "invert(0.9) hue-rotate(180deg) brightness(0.9) contrast(1.1)" }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default ContactsSection;
