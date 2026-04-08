import AnimatedSection from "./AnimatedSection";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: React.ReactNode;
}

const SectionHeading = ({ label, title, subtitle }: SectionHeadingProps) => (
  <AnimatedSection className="mb-16 text-center">
    <span className="mb-4 inline-block font-section-label text-xs font-semibold uppercase leading-none tracking-[0.15em] text-primary md:text-sm">
      {label}
    </span>
    <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
      {title}
    </h2>
    {subtitle && (
      <p className="mx-auto mt-4 max-w-2xl font-body text-base text-muted-foreground">
        {subtitle}
      </p>
    )}
  </AnimatedSection>
);

export default SectionHeading;
