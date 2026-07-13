import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type MatchResult = {
  round: number | string;
  /** Pre-formatted match date, e.g. "15 Авг 2002". */
  date: string;
  opponent: string;
  /** "Дома" (home) or "Гости" (away). */
  venue: string;
  goalsFor: number;
  goalsAgainst: number;
};

function outcomeClass(gf: number, ga: number) {
  if (gf > ga) return "text-on-surface"; // win — ink
  if (gf === ga) return "text-secondary"; // draw — brick accent
  return "text-error"; // loss — error red
}

/**
 * Results table (shared) — scholarly, no zebra striping, hairline rows.
 * Data is supplied by the caller; the component never invents results.
 * The result cell is right-aligned, semibold, and coloured by outcome.
 */
export function ResultsTable({
  results,
  caption,
  className,
}: {
  results: MatchResult[];
  caption?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-outline-variant bg-surface-card shadow-sm",
        className,
      )}
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-surface/50 hover:bg-surface/50">
            <TableHead>Коло</TableHead>
            <TableHead>Датум</TableHead>
            <TableHead>Противник</TableHead>
            <TableHead>Место</TableHead>
            <TableHead className="text-right">Резултат</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((r, i) => (
            <TableRow key={`${r.round}-${i}`}>
              <TableCell>{r.round}</TableCell>
              <TableCell className="text-on-surface-variant">{r.date}</TableCell>
              <TableCell className="font-medium">{r.opponent}</TableCell>
              <TableCell>{r.venue}</TableCell>
              <TableCell
                className={cn(
                  "text-right font-semibold tabular-nums",
                  outcomeClass(r.goalsFor, r.goalsAgainst),
                )}
              >
                {r.goalsFor} : {r.goalsAgainst}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {caption ? (
        <p className="type-caption border-t border-primary/15 px-4 py-3 text-on-surface-variant">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
