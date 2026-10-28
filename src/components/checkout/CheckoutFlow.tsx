"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import {
  ArrowIcon,
  CheckIcon,
  EmailIcon,
  LocationIcon,
  LockIcon,
  PersonIcon,
  PhoneIcon,
  HomeIcon,
} from "@/components/icons/Icons";

type Step = 0 | 1 | 2;
type PaymentMethod = "card" | "pix";
type ProductKind = "combo" | "single";

type CustomerDetails = {
  fullName: string;
  email: string;
  cep: string;
  address: string;
  neighborhood: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  phone: string;
};

type CardDetails = {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
  installments: string;
};

const emptyCustomer: CustomerDetails = {
  fullName: "",
  email: "",
  cep: "",
  address: "",
  neighborhood: "",
  number: "",
  complement: "",
  city: "",
  state: "",
  phone: "",
};

const emptyCard: CardDetails = {
  number: "",
  expiry: "",
  cvv: "",
  name: "",
  installments: "",
};

const products = {
  combo: {
    title: "Combo Concentran",
    subtitle: "Tratamento Recomendado",
    mobileTitle: "Concentran - Combo 3 Frascos",
    price: "R$ 179,90",
    imageAlt: "Combo Concentran com caixa, frasco e comprimidos",
    imageSrc: "/mockup-concentran-emb.webp",
  },
  single: {
    title: "Concentran",
    subtitle: "Tratamento Inicial",
    mobileTitle: "Concentran - 1 Frasco",
    price: "R$ 89,90",
    imageAlt: "Frasco do suplemento Concentran",
    imageSrc: "/concentran-product.webp",
  },
} satisfies Record<ProductKind, {
  title: string;
  subtitle: string;
  mobileTitle: string;
  price: string;
  imageAlt: string;
  imageSrc: string;
}>;

const steps = ["Informações\nPessoais", "Pagamento", "Confirmação de\nPedido"];

function onlyDigits(value: string, maxLength?: number) {
  const digits = value.replace(/\D/g, "");
  return maxLength ? digits.slice(0, maxLength) : digits;
}

function StepProgress({
  current,
  onStepClick,
}: {
  current: Step;
  onStepClick: (step: Step) => void;
}) {
  return (
    <ol className="grid grid-cols-3 items-start" aria-label="Etapas do checkout">
      {steps.map((label, index) => {
        const completed = index < current;
        const active = index === current;
        return (
          <li key={label} className="relative flex min-w-0 flex-col items-center text-center">
            {index !== 0 && (
              <span
                aria-hidden="true"
                className={`absolute right-1/2 top-3.75 h-px w-full ${completed || active ? "bg-foreground" : "bg-[#87945f]"}`}
              />
            )}
            {index !== 2 && (
              <span
                aria-hidden="true"
                className={`absolute left-1/2 top-3.75 h-px w-full ${index < current ? "bg-foreground" : "bg-[#87945f]"}`}
              />
            )}
            <button
              type="button"
              onClick={() => onStepClick(index as Step)}
              disabled={index > current}
              aria-current={active ? "step" : undefined}
              aria-label={`Ir para etapa ${index + 1}: ${label.replace("\n", " ")}`}
              className={`relative z-10 flex size-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed ${
                completed
                  ? "border-foreground bg-foreground text-background"
                  : active
                    ? "border-foreground bg-background text-foreground"
                    : "border-foreground bg-background text-foreground"
              } ${index < current ? "cursor-pointer hover:ring-2 hover:ring-primary/40" : ""}`}
            >
              {completed ? <CheckIcon className="size-4" strokeWidth={2.5} /> : index + 1}
            </button>
            <span className="mt-1 whitespace-pre-line text-[9px] leading-[1.15] text-foreground sm:text-[10px]">
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function BackHome() {
  return (
    <Link
      href="/"
      className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <ArrowIcon aria-hidden="true" className="size-4 rotate-90 stroke-3" />
      Voltar ao Início
    </Link>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  numeric = false,
  maxLength,
  icon,
  className = "",
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  numeric?: boolean;
  maxLength?: number;
  icon?: ReactNode;
  className?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    onChange(numeric ? onlyDigits(next, maxLength) : next);
  };

  return (
    <label className={`flex min-w-0 items-center gap-2 rounded-lg border border-[#a0a77b] bg-transparent px-3 text-foreground focus-within:border-primary focus-within:ring-1 focus-within:ring-primary ${className}`}>
      {icon ? <span className="shrink-0 text-[#87945f]">{icon}</span> : null}
      <span className="sr-only">{label}</span>
      <input
        aria-label={label}
        autoComplete={autoComplete}
        className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7d8b61]"
        inputMode={numeric ? "numeric" : undefined}
        maxLength={maxLength}
        onChange={handleChange}
        placeholder={placeholder ?? label}
        type={type}
        value={value}
      />
    </label>
  );
}

function ProductSummary({ product }: { product: ProductKind }) {
  const details = products[product];
  return (
    <>
      <aside className="relative hidden min-h-dvh overflow-hidden bg-foreground text-background md:flex md:flex-col md:items-center md:pt-[7vh]">
        <Image
          src="/pure-icon-quad.svg"
          alt=""
          aria-hidden="true"
          fill
          priority
          className="pointer-events-none scale-110 rotate-12 object-cover brightness-0 invert opacity-5"
        />
        <div className="relative z-10 flex flex-col items-center px-8 text-center">
          <h2 className="text-2xl font-bold">{details.title}</h2>
          <p className="text-sm font-medium">{details.subtitle}</p>
          <Image
            src={details.imageSrc}
            alt={details.imageAlt}
            width={620}
            height={620}
            priority
            className="mt-14 h-[min(58vh,620px)] w-full max-w-155 object-contain"
          />
        </div>
      </aside>
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 rounded-t-2xl bg-foreground px-5 py-3 text-background shadow-[0_-8px_24px_rgba(0,0,0,0.12)] md:hidden">
        <Image
          src={details.imageSrc}
          alt=""
          width={92}
          height={76}
          className="h-16 w-22 shrink-0 object-contain"
        />
        <div className="min-w-0 text-sm leading-5">
          <p className="font-bold">{details.mobileTitle}</p>
          <p>{details.price}</p>
        </div>
      </div>
    </>
  );
}

export function CheckoutFlow() {
  const [step, setStep] = useState<Step>(0);
  const [product, setProduct] = useState<ProductKind>("combo");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [customer, setCustomer] = useState<CustomerDetails>(emptyCustomer);
  const [card, setCard] = useState<CardDetails>(emptyCard);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setProduct(params.get("product") === "single" ? "single" : "combo");
  }, []);

  const updateCustomer = (key: keyof CustomerDetails, value: string) => {
    setCustomer((current) => ({ ...current, [key]: value }));
  };

  const updateCard = (key: keyof CardDetails, value: string) => {
    setCard((current) => ({ ...current, [key]: value }));
  };

  const handleContinue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep(1);
  };

  const handleConfirm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep(2);
  };

  return (
    <main className="min-h-dvh bg-background font-(--font-rem) text-foreground md:grid md:min-h-dvh md:grid-cols-[1.03fr_1fr]">
      <section className="relative flex min-h-dvh flex-col px-6 pb-32 pt-6 sm:px-10 md:min-h-dvh md:px-[clamp(32px,6.3vw,112px)] md:pb-12 md:pt-10">
        <div className="mx-auto flex w-full max-w-155 flex-1 flex-col">
          <BackHome />
          <div className="mt-8 sm:mt-10 md:mt-12">
            <StepProgress current={step} onStepClick={setStep} />
          </div>

          {step === 0 && (
            <form onSubmit={handleContinue} className="mt-12 flex flex-1 flex-col">
              <h1 className="mb-4 text-lg font-bold sm:text-xl">Informações para Entrega</h1>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Nome Completo" value={customer.fullName} onChange={(v) => updateCustomer("fullName", v)} icon={<PersonIcon className="size-4" />} className="col-span-2 h-11 md:col-span-1 md:h-10" autoComplete="name" />
                <Field label="Email" type="email" value={customer.email} onChange={(v) => updateCustomer("email", v)} icon={<EmailIcon className="size-4" />} className="col-span-2 h-11 md:col-span-1 md:h-10" autoComplete="email" />
                <Field label="CEP" value={customer.cep} onChange={(v) => updateCustomer("cep", v)} numeric maxLength={8} icon={<LocationIcon className="size-4" />} className="h-11 md:h-10" autoComplete="postal-code" />
                <Field label="Número" value={customer.number} onChange={(v) => updateCustomer("number", v)} numeric maxLength={8} className="h-11 md:h-10" />
                <Field label="Endereço" value={customer.address} onChange={(v) => updateCustomer("address", v)} className="col-span-2 h-11 md:col-span-1 md:h-10" autoComplete="street-address" />
                <Field label="Bairro" value={customer.neighborhood} onChange={(v) => updateCustomer("neighborhood", v)} className="h-11 md:h-10" />
                <Field label="Complemento (Opcional)" value={customer.complement} onChange={(v) => updateCustomer("complement", v)} className="col-span-2 h-11 md:h-10" />
                <Field label="Cidade" value={customer.city} onChange={(v) => updateCustomer("city", v)} className="h-11 md:h-10" autoComplete="address-level2" />
                <Field label="Estado" value={customer.state} onChange={(v) => updateCustomer("state", v)} className="h-11 md:h-10" maxLength={2} autoComplete="address-level1" />
                <Field label="Telefone" value={customer.phone} onChange={(v) => updateCustomer("phone", v)} numeric maxLength={13} icon={<PhoneIcon className="size-4" />} className="col-span-2 h-11 md:h-10" autoComplete="tel" />
              </div>
              <button type="submit" className="mt-6 inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border border-primary bg-primary px-5 text-sm font-bold text-background shadow-sm transition-colors hover:bg-background hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:mt-auto md:h-11 md:w-fit md:min-w-65 md:self-center md:translate-y-8">
                Seguir para Pagamento <ArrowIcon aria-hidden="true" className="size-5 -rotate-90 stroke-3" />
              </button>
            </form>
          )}

          {step === 1 && (
            <form onSubmit={handleConfirm} className="mt-7 flex flex-1 flex-col">
              <h1 className="mb-4 text-lg font-bold sm:text-xl">Método de Pagamento</h1>
              <fieldset className="space-y-3">
                <legend className="sr-only">Escolha como deseja pagar</legend>
                <div className={`rounded-xl border p-4 ${paymentMethod === "card" ? "border-[#71824a] bg-[#d9ddbd]" : "border-[#a0a77b]"}`}>
                  <label className="flex cursor-pointer items-center gap-3 font-bold">
                    <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="size-4 accent-primary" />
                    Cartão de Crédito
                  </label>
                  {paymentMethod === "card" && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Field label="Número do Cartão" value={card.number} onChange={(v) => updateCard("number", v)} numeric maxLength={19} className="col-span-2 h-11 bg-background" />
                      <Field label="Validade (MMAA)" value={card.expiry} onChange={(v) => updateCard("expiry", v)} numeric maxLength={4} className="h-11 bg-background" />
                      <Field label="CVV" value={card.cvv} onChange={(v) => updateCard("cvv", v)} numeric maxLength={4} className="h-11 bg-background" icon={<LockIcon className="size-4" />} />
                      <Field label="Nome do Cartão" value={card.name} onChange={(v) => updateCard("name", v)} className="col-span-2 h-11 bg-background" />
                      <Field label="Número de Parcelas" value={card.installments} onChange={(v) => updateCard("installments", v)} numeric maxLength={2} className="col-span-2 h-11 bg-background" />
                    </div>
                  )}
                </div>
                <label className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 font-bold ${paymentMethod === "pix" ? "border-[#71824a] bg-[#d9ddbd]" : "border-[#a0a77b]"}`}>
                  <input type="radio" name="payment" value="pix" checked={paymentMethod === "pix"} onChange={() => setPaymentMethod("pix")} className="size-4 accent-primary" />
                  Pix
                </label>
              </fieldset>
              <button type="submit" className="mt-6 inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border border-primary bg-primary px-5 text-sm font-bold text-background transition-colors hover:bg-background hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:mt-auto md:h-11 md:w-fit md:min-w-65 md:self-center md:translate-y-8">
                Confirmar Pedido <ArrowIcon aria-hidden="true" className="size-5 -rotate-90 stroke-3" />
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="flex flex-1 flex-col items-center justify-center pb-6 pt-10 text-center">
              <span className="flex size-20 items-center justify-center rounded-full bg-primary text-background sm:size-24">
                <CheckIcon className="size-12 sm:size-14" strokeWidth={2.5} />
              </span>
              <h1 className="mt-5 max-w-sm text-2xl font-bold leading-tight text-primary sm:text-3xl">Seu Pedido está sendo separado!</h1>
              <p className="mt-3 max-w-sm text-sm leading-5 sm:text-base">Sua nota fiscal e quaisquer novas atualizações serão enviadas no email cadastrado.</p>
              <Link href="/" className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-primary bg-primary px-5 font-bold text-background transition-colors hover:bg-background hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:w-fit md:min-w-65">
                Voltar ao Início <HomeIcon className="size-6 stroke-2" />
              </Link>
            </div>
          )}
        </div>

      </section>

      <ProductSummary product={product} />
    </main>
  );
}
