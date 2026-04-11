interface BrandNameProps {
  className?: string;
}

const BrandName = ({ className = "" }: BrandNameProps) => (
  <span
    className={`font-brand inline-flex items-baseline gap-0.5 font-black uppercase leading-[0.85] tracking-[0.01em] ${className}`}
    style={{ transform: "skewX(-10deg)" }}
  >
    <span className="text-primary">Good</span>
    <span className="text-foreground">Avto</span>
    <span className="ml-1 inline-flex items-center gap-1 text-[0.62em] text-foreground">
      <span className="text-primary">-</span>
      <span>Service</span>
      <span className="text-primary">-</span>
    </span>
  </span>
);

export default BrandName;
