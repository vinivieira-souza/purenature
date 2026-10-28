import Image from "next/image";
import {
  EmailIcon,
  InstagramIcon,
  WhatsappIcon,
} from "@/components/icons/Icons";
import { FAQAccordionItem } from "@/components/sections/FAQAccordionItem";

const questions = [
  {
    question: "Como devo tomar o Concentran?",
    answer:
      "Siga as orientações de uso indicadas no rótulo do produto. Em caso de dúvidas, consulte um profissional de saúde antes de iniciar o consumo.",
  },
  {
    question: "Em quanto tempo vejo os primeiros resultados?",
    answer:
      "A experiência pode variar de pessoa para pessoa, conforme a rotina e as características individuais. Use o produto conforme as instruções e mantenha hábitos saudáveis.",
  },
  {
    question: "O Concentran possui contraindicações ou químicos sintéticos?",
    answer:
      "Confira a lista de ingredientes e as advertências da embalagem antes de consumir. Se estiver grávida, amamentando, usar medicamentos ou tiver alguma condição de saúde, procure orientação profissional.",
  },
];

const institutionalLinks = [
  { label: "Termos de Uso", href: "#termos-de-uso" },
  { label: "Política de Privacidade", href: "#politica-de-privacidade" },
  { label: "Fale Conosco", href: "#contato" },
];

export function FooterSection() {
  return (
    <footer className="relative isolate overflow-hidden bg-foreground text-background">
      <div
        aria-hidden="true"
        className="footer-icon-quad pointer-events-none absolute z-0 bg-primary opacity-20"
        style={{
          maskImage: "url('/pure-icon-quad.svg')",
          WebkitMaskImage: "url('/pure-icon-quad.svg')",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      />
      <section
        id="faq"
        aria-labelledby="faq-title"
        className="relative isolate overflow-hidden border-b border-background/90 px-4 pt-8 pb-12 sm:px-12 sm:py-16 lg:min-h-137.5 lg:px-[6.25%] lg:py-19"
      >
        <div className="relative z-10 w-full lg:max-w-186.5">
          <h2
            id="faq-title"
            className="mb-6 text-xl font-bold leading-tight sm:mb-10 sm:text-3xl lg:mb-12 lg:text-[36px]"
          >
            Perguntas Frequentes
          </h2>
          <div className="flex flex-col">
            {questions.map(({ question, answer }) => (
              <FAQAccordionItem
                key={question}
                question={question}
                answer={answer}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="contato"
        className="relative isolate overflow-hidden bg-black/35 px-4 py-8 sm:px-12 sm:py-10 lg:min-h-70 lg:px-[3.3%] lg:py-14"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-0 hidden bg-primary opacity-20 lg:block"
          style={{
            width: "min(17.35vw, 286.96px)",
            aspectRatio: "574 / 640",
            left: "13.3%",
            top: "50%",
            transform: "translateY(calc(-40% - 20.19px)) rotate(-75deg)",
            maskImage: "url('/pure-icon-double.svg')",
            WebkitMaskImage: "url('/pure-icon-double.svg')",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
          }}
        />
        <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_1.2fr_0.8fr_1fr] lg:items-start lg:gap-8">
          <div className="flex items-end gap-8">
            <Image
              src="/logo2.svg"
              alt="Pure Nature"
              width={150}
              height={160}
              className="h-auto w-23 shrink-0 sm:w-27.5 lg:w-35"
            />
            <p className="max-w-62.5 text-sm font-semibold leading-snug text-surface sm:text-lg lg:text-lg">
              Saúde e bem-estar que te acompanham sempre
            </p>
          </div>

          <div className="order-last lg:order-0">
            <h2 className="mb-2 text-base font-bold sm:text-xl">Aviso Legal</h2>
            <p className="max-w-97.5 px-2 text-sm leading-[1.35] text-background/75 lg:px-0">
              As informações contidas neste site não substituem o aconselhamento
              médico individual. Este produto é um suplemento alimentar de base
              natural isento de registro conforme normas vigentes.
            </p>
          </div>

          <nav aria-label="Links institucionais">
            <h2 className="mb-2 text-base font-bold sm:text-xl">
              Links Institucionais
            </h2>
            <ul className="flex flex-col gap-1 px-2 text-sm text-background/75 sm:text-base lg:px-0">
              {institutionalLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="transition-colors hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-2 text-base font-bold sm:text-xl">
              Links de Contato
            </h2>
            <ul className="flex flex-col gap-1 px-2 text-sm text-background/75 sm:text-base lg:px-0">
              <li>
                <a
                  href="#contato"
                  className="flex items-center gap-2 transition-colors hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface"
                >
                  <EmailIcon className="h-5 w-5 shrink-0 stroke-2 sm:h-6 sm:w-6" />
                  <span className="break-all">contato@purenature.com.br</span>
                </a>
              </li>
              <li>
                <a
                  href="#instagram"
                  className="flex items-center gap-2 transition-colors hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface"
                >
                  <InstagramIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
                  <span>pure.nature</span>
                </a>
              </li>
              <li>
                <a
                  href="#whatsapp"
                  className="flex items-center gap-2 transition-colors hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface"
                >
                  <WhatsappIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
                  <span>65 992263484</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </footer>
  );
}
