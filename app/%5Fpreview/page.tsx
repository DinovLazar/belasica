import type { Metadata } from "next";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PhotoFrame } from "@/components/site/photo-frame";
import { ResultsTable, type MatchResult } from "@/components/site/results-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Build artifact, not a public page: keep it out of search indexes.
export const metadata: Metadata = {
  title: "Преглед на компоненти — Belasica (интерно)",
  robots: { index: false, follow: false },
};

// Illustrative demo data ONLY — not real club results (content-truth rule).
const DEMO_RESULTS: MatchResult[] = [
  { round: 1, date: "15 Авг", opponent: "Противник А", venue: "Дома", goalsFor: 2, goalsAgainst: 1 },
  { round: 2, date: "22 Авг", opponent: "Противник Б", venue: "Гости", goalsFor: 0, goalsAgainst: 0 },
  { round: 3, date: "29 Авг", opponent: "Противник В", venue: "Дома", goalsFor: 3, goalsAgainst: 0 },
  { round: 4, date: "05 Сеп", opponent: "Противник Г", venue: "Гости", goalsFor: 1, goalsAgainst: 2 },
  { round: 5, date: "12 Сеп", opponent: "Противник Д", venue: "Дома", goalsFor: 1, goalsAgainst: 1 },
];

const MK_ALPHABET =
  "а б в г д ѓ е ж з ѕ и ј к л љ м н њ о п р с т ќ у ф х ц ч џ ш";
const MK_SPECIALS = "ѓ ќ ѕ џ љ њ   Ѓ Ќ Ѕ Џ Љ Њ";
const MK_PANGRAM = "Ѓорѓи ќе ѕвони џабе — љубов њежна, шчо жалам!";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-primary/15 py-14">
      <h2 className="type-label mb-8 uppercase text-secondary">{title}</h2>
      {children}
    </section>
  );
}

const COLOR_TOKENS: { name: string; className: string; dark?: boolean }[] = [
  { name: "primary", className: "bg-primary", dark: true },
  { name: "primary-container", className: "bg-primary-container", dark: true },
  { name: "secondary (accent)", className: "bg-secondary", dark: true },
  { name: "secondary-soft", className: "bg-secondary-soft" },
  { name: "surface (paper)", className: "bg-surface" },
  { name: "surface-card", className: "bg-surface-card" },
  { name: "surface-muted", className: "bg-surface-muted" },
  { name: "surface-container-highest", className: "bg-surface-container-highest" },
  { name: "on-surface (ink)", className: "bg-on-surface", dark: true },
  { name: "on-surface-variant", className: "bg-on-surface-variant", dark: true },
  { name: "outline-variant", className: "bg-outline-variant" },
  { name: "error", className: "bg-error", dark: true },
];

const WEIGHTS = [
  { label: "400", cls: "font-normal" },
  { label: "500", cls: "font-medium" },
  { label: "600", cls: "font-semibold" },
  { label: "700", cls: "font-bold" },
];

export default function PreviewPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader activeHref="/" />

      <main className="editorial-container flex-grow py-10">
        {/* Preview banner */}
        <div className="border border-secondary/40 bg-secondary-soft/20 p-4">
          <p className="type-label uppercase text-secondary">
            Интерен преглед · noindex · не е дел од јавната навигација
          </p>
          <p className="type-body mt-2 text-on-surface-variant">
            Преглед на дизајн-темелите и заедничките компоненти (Фаза 1.03–1.04). Податоците во
            табелите се демонстрациски — не се вистински резултати.
          </p>
        </div>

        {/* Typography scale */}
        <Section title="Типографска скала">
          <div className="space-y-6">
            <p className="type-display text-primary">Насловна · Ѓорѓи ќе ѕвони џабе</p>
            <p className="type-headline text-primary">Секција · Љубов њежна, шчо жалам</p>
            <p className="type-title text-primary">Поднаслов · Беласица низ децениите</p>
            <p className="type-body-lg text-on-surface">
              Вовед · Фудбалскиот клуб е дел од идентитетот на градот, симбол на спортскиот дух и
              издржливост.
            </p>
            <p className="type-body text-on-surface">
              Тело · Низ децениите клубот одгледува генерации таленти. Секое ѓ, ќ, ѕ, џ, љ и њ мора
              да се прикаже правилно.
            </p>
            <p className="type-label uppercase text-on-surface-variant">
              Ознака · Архива по сезони
            </p>
            <p className="type-table text-on-surface">Табеларни податоци · 28 настапи · 12 голови</p>
            <p className="type-caption uppercase text-on-surface-variant">
              Опис на фотографија · есен 2002
            </p>
          </div>
        </Section>

        {/* Colour tokens */}
        <Section title="Бои (токени)">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {COLOR_TOKENS.map((t) => (
              <div key={t.name} className="border border-outline-variant">
                <div className={`${t.className} h-16 w-full`} />
                <p className="type-caption border-t border-outline-variant px-3 py-2 text-on-surface-variant">
                  {t.name}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Macedonian Cyrillic gate */}
        <Section title="Кирилична проверка (Македонски)">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="type-label uppercase text-on-surface-variant">
                Source Serif 4 (сериф) — 400 / 600 / 700
              </p>
              {WEIGHTS.filter((w) => w.label !== "500").map((w) => (
                <p key={w.label} className={`font-serif ${w.cls} text-on-surface text-xl`}>
                  <span className="type-caption mr-3 uppercase text-on-surface-variant">{w.label}</span>
                  {MK_SPECIALS}
                </p>
              ))}
              <p className="font-serif text-on-surface">{MK_ALPHABET}</p>
              <p className="font-serif text-lg text-on-surface">{MK_PANGRAM}</p>
            </div>
            <div className="space-y-3">
              <p className="type-label uppercase text-on-surface-variant">
                Inter (санс) — 400 / 500 / 600 / 700
              </p>
              {WEIGHTS.map((w) => (
                <p key={w.label} className={`font-sans ${w.cls} text-on-surface text-xl`}>
                  <span className="type-caption mr-3 uppercase text-on-surface-variant">{w.label}</span>
                  {MK_SPECIALS}
                </p>
              ))}
              <p className="font-sans text-on-surface">{MK_ALPHABET}</p>
              <p className="font-sans text-lg text-on-surface">{MK_PANGRAM}</p>
            </div>
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Копчиња">
          <div className="flex flex-wrap items-center gap-4">
            <Button>Истражи архив</Button>
            <Button variant="outline">Повеќе детали</Button>
            <Button variant="secondary">Тековна сезона</Button>
            <Button variant="ghost">Прочитај</Button>
            <Button variant="link">Запознај →</Button>
          </div>
        </Section>

        {/* Results table */}
        <Section title="Табела со резултати">
          <ResultsTable
            results={DEMO_RESULTS}
            caption="Демонстрациски податоци — не се вистински резултати."
          />
        </Section>

        {/* Cards */}
        <Section title="Картички">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {["Архива по сезони", "Легенди", "Приказни"].map((t) => (
              <Card key={t}>
                <CardHeader>
                  <CardTitle>{t}</CardTitle>
                  <CardDescription>
                    Краток опис на секцијата. Ѓ, ќ, ѕ, џ, љ, њ — сите глифи се прикажуваат правилно.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="px-0">
                    Истражи →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* Photo frames */}
        <Section title="Рамка за фотографија (архивска обработка)">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <PhotoFrame caption="Почетен состав · есен 2002" aspect="video" />
            <PhotoFrame caption="Детаљ од натпревар" aspect="video" />
            <PhotoFrame caption="Навивачка поддршка" aspect="video" />
          </div>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}
