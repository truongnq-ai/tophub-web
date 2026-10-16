import React from "react";

interface ResponsiveDataTableProps {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export function ResponsiveDataTable({
  caption,
  headers,
  rows,
}: ResponsiveDataTableProps) {
  return (
    <div className="space-y-2">
      {caption && (
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 px-1">
          {caption}
        </p>
      )}
      <div className="w-full overflow-x-auto rounded-2xl border border-border/80 dark:border-amber-500/20 bg-card/70 shadow-sm">
        <table className="w-full min-w-[520px] border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border/80 bg-muted/50 dark:bg-amber-500/10">
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 font-heading font-bold text-foreground whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="hover:bg-amber-500/5 transition-colors"
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className={
                      cellIdx === 0
                        ? "px-4 py-3 font-semibold text-amber-600 dark:text-amber-400 whitespace-nowrap"
                        : "px-4 py-3 text-foreground/90 leading-relaxed"
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
