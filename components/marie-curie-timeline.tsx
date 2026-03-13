"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineEvent {
  year: string
  title: string
  shortText: string
  expandedText: string
  image: string
}

const events: TimelineEvent[] = [
  {
    year: "1867",
    title: "Nascimento",
    shortText: "Marie Curie nasceu em Varsovia, na Polonia, em uma epoca em que mulheres tinham pouco acesso a educacao superior.",
    expandedText: "Desde jovem, demonstrou grande interesse pelo conhecimento e precisou enfrentar limitacoes sociais para seguir estudando.",
    image: "/images/marie-1867-nascimento.jpg"
  },
  {
    year: "1891",
    title: "Mudanca para Paris",
    shortText: "Mudou-se para Paris para estudar na Universidade de Paris.",
    expandedText: "A ida para Paris marcou o inicio de sua formacao academica e de sua trajetoria cientifica.",
    image: "/images/marie-1891-paris.jpg"
  },
  {
    year: "1895",
    title: "Parceria com Pierre Curie",
    shortText: "Conheceu Pierre Curie e iniciou uma importante parceria cientifica.",
    expandedText: "O casamento com Pierre tambem deu inicio a uma colaboracao que transformaria a historia da ciencia.",
    image: "/images/marie-1895-pierre.jpg"
  },
  {
    year: "1898",
    title: "Descoberta do Polonio e do Radio",
    shortText: "Marie Curie descobriu os elementos polonio e radio.",
    expandedText: "Essas descobertas ajudaram a consolidar o estudo da radioatividade e exigiram anos de trabalho intenso em laboratorio.",
    image: "/images/marie-1898-descoberta.jpg"
  },
  {
    year: "1903",
    title: "Nobel de Fisica",
    shortText: "Recebeu o Nobel de Fisica com Pierre Curie e Henri Becquerel.",
    expandedText: "Foi a primeira mulher a receber um Premio Nobel, tornando-se um marco na historia da ciencia.",
    image: "/images/marie-1903-nobel.jpg"
  },
  {
    year: "1911",
    title: "Nobel de Quimica",
    shortText: "Recebeu sozinha o Nobel de Quimica.",
    expandedText: "Tornou-se a primeira pessoa da historia a ganhar dois premios Nobel em areas cientificas diferentes.",
    image: "/images/marie-1911-quimica.jpg"
  },
  {
    year: "1914-1918",
    title: "Uso da Ciencia na Medicina",
    shortText: "Organizou unidades moveis de raio-X para tratar soldados feridos.",
    expandedText: "Seu trabalho ajudou a aplicar a ciencia diretamente no cuidado medico durante a guerra.",
    image: "/images/marie-1914-guerra.jpg"
  },
  {
    year: "Legado",
    title: "Impacto na Ciencia",
    shortText: "Seu legado influenciou a fisica, a quimica e a medicina.",
    expandedText: "Marie Curie se tornou simbolo de persistencia, inteligencia e contribuicao social da ciencia.",
    image: "/images/marie-legado.jpg"
  }
]

function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), index * 70)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <article
      ref={cardRef}
      className={cn(
        "relative flex gap-3 md:gap-6 transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
    >
      <div className="flex w-20 shrink-0 flex-col items-end md:w-28">
        <span className="border-2 border-double border-timeline-border bg-timeline-card px-2 py-1 font-display text-sm tracking-[0.14em] text-timeline-accent md:text-base">
          {event.year}
        </span>
        {index < events.length - 1 && <div className="mt-2 w-px min-h-14 flex-1 bg-timeline-border/80" />}
      </div>

      <button
        type="button"
        aria-expanded={isExpanded}
        className={cn(
          "newspaper-card group mb-10 w-full overflow-hidden border-[3px] border-double text-left transition-all duration-300",
          "border-timeline-border bg-timeline-card/95",
          isExpanded ? "shadow-[0_10px_24px_rgba(45,32,20,0.24)]" : "hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(45,32,20,0.17)]"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-timeline-border/80 bg-timeline-bg/65 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-timeline-muted md:px-6">
          <span>Caderno ciencia</span>
          <span>Arquivo #{String(index + 1).padStart(2, "0")}</span>
          <span>Correspondencia de Paris</span>
        </div>

        <div className="grid md:grid-cols-[36%_1fr]">
          <figure className="relative h-52 overflow-hidden border-b border-timeline-border/70 md:h-full md:min-h-60 md:border-b-0 md:border-r">
            <img
              src={event.image}
              alt={event.title}
              className={cn(
                "h-full w-full object-cover grayscale sepia contrast-[0.9] transition-transform duration-700",
                isExpanded ? "scale-[1.03]" : "group-hover:scale-[1.015]"
              )}
            />
            <figcaption className="absolute bottom-0 left-0 right-0 border-t border-zinc-200/45 bg-gradient-to-t from-black/65 to-transparent px-3 pb-2 pt-8 text-[10px] uppercase tracking-[0.15em] text-zinc-100">
              Arquivo historico da redacao
            </figcaption>
          </figure>

          <div className="p-4 md:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-timeline-muted">Paris, {event.year}</p>

            <h3 className="mt-2 border-b border-timeline-border/70 pb-3 font-display text-2xl uppercase leading-tight text-timeline-text md:text-4xl">
              {event.title}
            </h3>

            <p className="mt-4 border-l-2 border-timeline-border/70 pl-3 text-xs font-semibold uppercase tracking-[0.14em] text-timeline-muted md:text-[0.78rem]">
              Resumo da materia
            </p>

            <p className="mt-3 text-[1rem] leading-7 text-timeline-text md:text-[1.06rem] md:leading-8">
              {event.shortText}
            </p>

            <div
              className={cn(
                "overflow-hidden border-t border-dashed border-timeline-border/80 transition-all duration-500 ease-out",
                isExpanded ? "mt-4 max-h-72 pt-4 opacity-100" : "max-h-0 pt-0 opacity-0"
              )}
            >
              <p className="border-l-2 border-timeline-border/70 pl-3 text-xs font-semibold uppercase tracking-[0.14em] text-timeline-muted md:text-[0.78rem]">
                Texto completo
              </p>
              <p className="mt-3 text-[0.98rem] leading-7 text-timeline-muted md:text-[1.02rem] md:leading-8">{event.expandedText}</p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-timeline-border/70 pt-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-timeline-muted">
              <span>{isExpanded ? "Fim da materia" : "Clique para ler continuacao"}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-timeline-accent transition-transform duration-300",
                  isExpanded && "rotate-180"
                )}
              />
            </div>
          </div>
        </div>
      </button>
    </article>
  )
}

export function MarieCurieTimeline() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    setHeaderVisible(true)

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="paper-surface relative min-h-screen overflow-hidden bg-timeline-bg text-timeline-text">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-35"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(84, 63, 45, 0.045) 0, rgba(84, 63, 45, 0.045) 1px, transparent 1px, transparent 185px)"
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: "radial-gradient(circle at center, transparent 45%, rgba(58, 38, 22, 0.22) 100%)" }}
      />

      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-timeline-border/45">
        <div className="h-full bg-timeline-accent transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>

      <header
        className={cn(
          "relative z-10 px-4 pb-10 pt-12 text-center transition-all duration-1000 md:pb-12 md:pt-16",
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        )}
      >
        <div className="mx-auto max-w-6xl border-y-[3px] border-double border-timeline-accent/70 bg-timeline-card/90 px-4 py-6 md:px-8 md:py-8">
          <div className="mb-4 flex items-center justify-center">
            <img
              src="/images/logo_apromsnet_navbar_fixed.png"
              alt="Logo Apromsnet"
              className="h-10 w-auto border border-timeline-border/70 bg-timeline-card px-2 py-1 grayscale sepia contrast-[0.9] md:h-12"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-y border-timeline-border px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-timeline-muted">
            <span>Edicao especial</span>
            <span>Sexta-feira, 8 de novembro de 1911</span>
            <span>Preco: 20 centavos</span>
          </div>

          <h1 className="mt-4 font-display text-5xl uppercase leading-none tracking-wide text-timeline-text md:text-7xl">
            Gazeta da Aproms
          </h1>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-y border-timeline-border py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-timeline-muted md:text-xs">
            <span>Paris</span>
            <span>Numero 27</span>
            <span>Ano de 1911</span>
          </div>

          <h2 className="mt-5 font-display text-3xl leading-tight text-timeline-text md:text-5xl">
            Marie Curie e a cronica da radioatividade
          </h2>

          <div className="mt-6 grid items-center gap-5 md:grid-cols-[1fr_180px]">
            <p className="text-base leading-7 text-timeline-muted md:columns-2 md:gap-8 md:text-lg">
              Linha do tempo em formato de recortes historicos sobre a cientista que redefiniu a Fisica, a Quimica e a Medicina.
            </p>

            <div className="mx-auto w-36 border-2 border-timeline-border bg-timeline-card p-1 md:mx-0">
              <img
                src="/images/marie-portrait.jpg"
                alt="Marie Curie"
                className="h-44 w-full object-cover grayscale sepia contrast-[0.92]"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <div className="mb-8 border-y-2 border-double border-timeline-border py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-timeline-muted md:mb-10">
          Cronica completa da trajetoria
        </div>

        {events.map((event, index) => (
          <TimelineCard key={event.year} event={event} index={index} />
        ))}

        <section className="mt-2 border-2 border-double border-timeline-border bg-timeline-card/95 p-6 md:p-8">
          <blockquote className="text-center">
            <p className="font-display text-3xl italic leading-relaxed text-timeline-text md:text-4xl">
              "Nada na vida deve ser temido, apenas compreendido. Agora e hora de compreender mais para temer menos."
            </p>
            <footer className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-timeline-accent md:text-sm">
              Marie Curie
            </footer>
          </blockquote>
        </section>
      </main>
    </div>
  )
}
