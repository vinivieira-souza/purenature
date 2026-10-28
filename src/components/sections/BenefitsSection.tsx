import {
  FocusIcon,
  HeartIcon,
  MindIcon,
  ShieldIcon,
} from "@/components/icons/Icons";

const benefits = [
  {
    title: "Foco & Concentração Sustentável",
    description:
      "Elimine a névoa mental e mantenha a atenção plena nas suas tarefas diárias, sem picos de ansiedade ou quedas bruscas de energia.",
    Icon: FocusIcon,
  },
  {
    title: "Defesa & Imunidade Fortalecida",
    description:
      "Nutrientes essenciais que blindam o sistema imunológico contra o desgaste físico e fatores oxidativos do cotidiano.",
    Icon: ShieldIcon,
  },
  {
    title: "Clareza Mental & Memória",
    description:
      "Estimula as conexões neurais e auxilia na retenção de memória e agilidade de raciocínio a longo prazo.",
    Icon: MindIcon,
  },
  {
    title: "Bem-estar sem Efeito Rebote",
    description:
      "Redução do estresse diário com equilíbrio emocional, promovendo noites mais restauradoras e dias mais dispostos.",
    Icon: HeartIcon,
  },
];

export function BenefitsSection() {
  return (
    <section
      id="beneficios"
      aria-labelledby="beneficios-title"
      className="relative flex flex-col z-20 mx-auto mt-0 w-full max-w-[1680px] rounded-b-[28px] bg-foreground px-4 py-6 text-surface lg:flex-row lg:gap-16 md:px-12 md:py-12 lg:-mt-20 lg:rounded-4xl lg:px-[3%] lg:pt-16 lg:pb-19"
    >
      <h2
        id="beneficios-title"
        className="max-w-70 w-full font-bold leading-tight lg:max-w-80 text-[clamp(20px,1.8vw,32px)]"
      >
        Tudo o que seu corpo precisa, na medida certa.
      </h2>
      <div className="grid grid-cols-1 gap-6 my-10 lg:grid-cols-4 lg:my-0">
        {benefits.map(({ title, description, Icon }) => (
          <article
            key={title}
            className="flex flex-col lg:items-center lg:text-center"
          >
            <div className="flex items-center gap-2 lg:flex-col lg:gap-3">
              <Icon className="h-8 w-8 shrink-0 stroke-3 lg:h-14 lg:w-14" />
              <h3 className="text-[clamp(16px,1.5vw,24px)] font-semibold leading-tight lg:w-full lg:max-w-61 lg:text-[clamp(14px,1.25vw,20px)]">
                {title}
              </h3>
            </div>
            <p className="mt-2 w-full max-w-70 text-[clamp(12px,1.25vw,16px)] leading-tight text-background lg:max-w-66 lg:mt-10 lg:text-[clamp(12px,0.8vw,16px)]">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
