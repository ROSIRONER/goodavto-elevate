import { Phone, Send, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface CTAButtonsProps {
  size?: "default" | "lg";
}

const CTAButtons = ({ size = "default" }: CTAButtonsProps) => {
  const isLg = size === "lg";

  return (
    <div className="flex flex-wrap gap-3">
      <motion.a
        href="tel:89831228588"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`btn-glow inline-flex items-center gap-2.5 rounded-lg bg-primary font-body font-semibold text-primary-foreground transition-shadow hover:shadow-[var(--shadow-glow)] ${
          isLg ? "px-7 py-4 text-base" : "px-5 py-3 text-sm"
        }`}
      >
        <Phone className={isLg ? "h-5 w-5" : "h-4 w-4"} />
        Позвонить
      </motion.a>
      <motion.a
        href="https://t.me/+79831228588"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`glass-surface glass-surface-hover inline-flex items-center gap-2.5 rounded-lg font-body font-medium text-foreground transition-all duration-300 hover:border-primary/20 ${
          isLg ? "px-7 py-4 text-base" : "px-5 py-3 text-sm"
        }`}
      >
        <Send className={isLg ? "h-5 w-5" : "h-4 w-4"} />
        Telegram
      </motion.a>
      <div
        className={`inline-flex select-none items-center gap-2.5 rounded-lg border border-border/70 bg-secondary/40 font-body font-medium text-muted-foreground ${
          isLg ? "px-7 py-4 text-base" : "px-5 py-3 text-sm"
        }`}
      >
        <MessageCircle className={isLg ? "h-5 w-5 text-primary" : "h-4 w-4 text-primary"} />
        Контакт в MAX
      </div>
    </div>
  );
};

export default CTAButtons;
