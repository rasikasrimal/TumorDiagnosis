import { marked } from 'marked';
import type { NotebookCell, NotebookOutput } from '@/types/data';

interface RawNotebook {
  cells: Array<{
    cell_type: 'markdown' | 'code';
    source: string[] | string;
    id?: string;
    metadata?: Record<string, unknown>;
    outputs?: RawOutput[];
  }>;
  metadata?: {
    language_info?: {
      name?: string;
    };
  };
}

type RawOutput =
  | {
      output_type: 'stream';
      text?: string[] | string;
      name?: string;
    }
  | {
      output_type: 'error';
      traceback?: string[];
    }
  | {
      output_type: 'display_data' | 'execute_result';
      data?: Record<string, unknown>;
    };

export function parseNotebookFile(content: string): NotebookCell[] {
  const notebook = JSON.parse(content) as RawNotebook;
  const language = notebook.metadata?.language_info?.name;

  return notebook.cells.map((cell) => {
    const source = Array.isArray(cell.source) ? cell.source : [cell.source ?? ''];
    if (cell.cell_type === 'markdown') {
      return {
        id: cell.id,
        type: 'markdown' as const,
        source,
        html: marked.parse(source.join(''))
      } satisfies NotebookCell;
    }

    return {
      id: cell.id,
      type: 'code' as const,
      source,
      language,
      outputs: (cell.outputs ?? []).map(normalizeOutput)
    } satisfies NotebookCell;
  });
}

function normalizeOutput(output: RawOutput): NotebookOutput {
  if (output.output_type === 'stream') {
    const text = Array.isArray(output.text) ? output.text.join('') : output.text ?? '';
    return { type: 'stream', text };
  }

  if (output.output_type === 'error') {
    return { type: 'error', traceback: output.traceback ?? [] };
  }

  const data = output.data ?? {};
  const html = extractHtml(data);
  const text = typeof data['text/plain'] === 'string' ? (data['text/plain'] as string) : Array.isArray(data['text/plain']) ? (data['text/plain'] as string[]).join('') : undefined;

  return {
    type: output.output_type,
    html,
    text
  };
}

function extractHtml(data: Record<string, unknown>): string | undefined {
  if (typeof data['text/html'] === 'string') {
    return data['text/html'] as string;
  }
  if (Array.isArray(data['text/html'])) {
    return (data['text/html'] as string[]).join('');
  }
  if (typeof data['image/png'] === 'string') {
    const base64 = data['image/png'] as string;
    return `<img src="data:image/png;base64,${base64}" alt="Notebook output" class="max-h-96 rounded-md border border-border" />`;
  }
  return undefined;
}
