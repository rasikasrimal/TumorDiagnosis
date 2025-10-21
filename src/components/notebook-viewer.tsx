'use client';

import { Fragment } from 'react';
import Highlight, { defaultProps, themes } from 'prism-react-renderer';
import type { NotebookCell } from '@/types/data';

interface NotebookViewerProps {
  title: string;
  cells: NotebookCell[];
}

export function NotebookViewer({ title, cells }: NotebookViewerProps) {
  return (
    <article className="space-y-4 rounded-xl border border-border bg-background/60 p-5">
      <header>
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">Review executed notebook cells with preserved output.</p>
      </header>
      <div className="space-y-6">
        {cells.map((cell, index) => (
          <section key={cell.id ?? index} className="space-y-3 rounded-lg border border-border bg-background p-4">
            {cell.type === 'markdown' ? (
              <div className="markdown text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: cell.html ?? '' }} />
            ) : null}
            {cell.type === 'code' ? (
              <div className="space-y-3">
                <Highlight
                  {...defaultProps}
                  theme={themes.github}
                  code={cell.source.join('')}
                  language={cell.language ?? 'python'}
                >
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={`${className} overflow-x-auto rounded-md border border-border bg-muted/40 p-3 text-xs`} style={style}>
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token, key })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
                {cell.outputs?.length ? (
                  <div className="space-y-2 rounded-md border border-dashed border-border bg-muted/40 p-3 text-xs">
                    {cell.outputs.map((output, outputIndex) => (
                      <Fragment key={outputIndex}>
                        {output.type === 'stream' ? (
                          <pre className="whitespace-pre-wrap text-foreground">{output.text}</pre>
                        ) : null}
                        {output.type === 'error' ? (
                          <pre className="whitespace-pre-wrap text-destructive">{output.traceback?.join('\n')}</pre>
                        ) : null}
                        {output.type === 'display_data' || output.type === 'execute_result' ? (
                          <div className="text-foreground" dangerouslySetInnerHTML={{ __html: output.html ?? '' }} />
                        ) : null}
                      </Fragment>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}
