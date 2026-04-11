interface BrandNameProps {
  className?: string;
}

const BrandName = ({ className = "" }: BrandNameProps) => (
  <span
    className={`font-logo inline-block italic font-bold uppercase leading-[0.9] tracking-[0.015em] ${className}`}
    style={{ transform: "skewX(-12deg)" }}
  >
    <span className="text-primary">Good</span>
    <span className="text-foreground">Avto</span>
    <span className="text-foreground"> Service</span>
  </span>
);

export default BrandName;
