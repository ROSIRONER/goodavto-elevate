interface BrandNameProps {
  className?: string;
}

const BrandName = ({ className = "" }: BrandNameProps) => (
  <span
    className={`font-brand inline-flex flex-col items-start font-black uppercase leading-[0.9] tracking-[0.01em] ${className}`}
    style={{ transform: "skewX(-10deg)" }}
  >
    <span>
      <span className="text-primary">Good</span>
      <span className="text-foreground">Avto</span>
    </span>
    <span className="text-foreground">Service</span>
  </span>
);

export default BrandName;
