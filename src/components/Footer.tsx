import { Phone, Send, MessageCircle } from "lucide-react";

const legalLinks = [
  { label: "Политика конфиденциальности", href: "https://teletype.in/@mgrstate/goodavtopolicy" },
  { label: "Политика cookies", href: "https://teletype.in/@mgrstate/coockiegoodavto" },
  { label: "Публичная оферта", href: "https://teletype.in/@mgrstate/ofertagoodavto" },
  { label: "Пользовательское соглашение", href: "https://teletype.in/@mgrstate/polzgoodavto" },
];

const Footer = () => (
  <footer className="relative border-t border-border py-14 overflow-hidden">
    <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 600px 400px at 95% 80%, hsl(0 78% 50% / 0.06), transparent)' }} />
    <div className="container mx-auto px-6">
      <div className="grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="font-display text-2xl font-bold tracking-wide">
            Good<span className="text-gradient-red">Avto</span> Service
          </div>
          <p className="mt-3 font-body text-sm text-muted-foreground">
            Автосервис полного цикла в Новосибирске.
            <br />
            Ежедневно с 10:00 до 20:00
          </p>
          <div className="mt-4 flex gap-3">
            <a href="tel:89831228588" className="rounded-lg bg-primary/10 p-2 transition-colors hover:bg-primary/20">
              <Phone className="h-4 w-4 text-primary" />
            </a>
            <a href="https://t.me/+79831228588" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-primary/10 p-2 transition-colors hover:bg-primary/20">
              <Send className="h-4 w-4 text-primary" />
            </a>
            <a href="https://max.me/+79831228588" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-primary/10 p-2 transition-colors hover:bg-primary/20">
              <MessageCircle className="h-4 w-4 text-primary" />
            </a>
          </div>
        </div>

        {/* Nav */}
        <div>
          <div className="mb-3 font-display text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Навигация
          </div>
          <nav className="flex flex-col gap-2">
            {["О нас", "Услуги", "Преимущества", "Отзывы", "Контакты"].map((item) => (
              <a
                key={item}
                href={`#${item === "О нас" ? "about" : item === "Услуги" ? "services" : item === "Преимущества" ? "advantages" : item === "Отзывы" ? "reviews" : "contacts"}`}
                className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Legal */}
        <div>
          <div className="mb-3 font-display text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Документы
          </div>
          <nav className="flex flex-col gap-2">
            {legalLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-3 border-t border-border pt-8 text-center">
        <div className="font-body text-xs text-muted-foreground">
          © {new Date().getFullYear()} GoodAvto Service. Все права защищены.
        </div>
        <a
          href="https://voidstudiorus.ru/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Created by Void Studio
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
