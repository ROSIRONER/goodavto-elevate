interface BrandNameProps {
  className?: string;
  stacked?: boolean;
}

const BrandName = ({ className = "", stacked = false }: BrandNameProps) => (
  <span
    className={`font-brand inline-flex font-black tracking-[0.01em] ${stacked ? "flex-col items-start leading-[0.9]" : "items-center gap-1 leading-none whitespace-nowrap"} ${className}`}
  >
    <span>
      <span className="text-primary">Good</span>
      <span className="text-foreground">Avto</span>
    </span>
    <span className="text-foreground">Service</span>
  </span>
);

export default BrandName;
