import { PersonIcon, StarIcon } from "@/components/icons/Icons";

type TestimonialCardProps = {
  name: string;
  age: number;
  quote: string;
};

export function TestimonialCard({ name, age, quote }: TestimonialCardProps) {
  return (
    <article className="flex h-full min-h-41 w-full flex-col gap-4 rounded-2xl bg-surface/60 p-4 text-foreground sm:min-h-65 sm:gap-6 sm:rounded-[22px] sm:p-6 lg:h-80 lg:min-h-0 lg:gap-8 lg:rounded-[25px] lg:p-6">
      <div className="flex w-full items-start gap-3 sm:gap-5 lg:gap-8">
        {/* Placeholder temporário até as fotos finais serem adicionadas ao /public. */}
        <div
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/15 text-primary sm:h-20 sm:w-20 lg:h-30 lg:w-30 lg:rounded-[20px]"
        >
          <PersonIcon className="h-7 w-7 stroke-[1.5] sm:h-10 sm:w-10 lg:h-14 lg:w-14" />
        </div>

        <div className="min-w-0 pt-0 sm:pt-1 lg:pt-2">
          <h3 className="text-[15px] font-medium leading-tight sm:text-xl lg:text-2xl lg:leading-7.5">
            {name}, {age} anos
          </h3>
          <div
            className="mt-1 flex items-center gap-0.5 text-primary sm:mt-1.5 sm:gap-0.5"
            role="img"
            aria-label="5 de 5 estrelas"
          >
            {Array.from({ length: 5 }, (_, index) => (
              <StarIcon
                key={index}
                className="h-3.5 w-3.5 fill-current stroke-[1.5] sm:h-5 sm:w-5 lg:h-6 lg:w-6"
              />
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs leading-[1.3] sm:text-base sm:leading-snug lg:text-xl lg:leading-6.25">
        &quot;{quote}&quot;
      </p>
    </article>
  );
}
