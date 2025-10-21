# Insights Studio Dashboard

A deploy-ready Next.js analytics workspace that ingests CSV/JSON datasets and executed Jupyter notebooks, processes them on the server, and exposes interactive dashboards with charts, explorers, and notebook rendering. The project is optimised for deployment on Vercel and follows the UI conventions defined in `instructions.md`.

## Features

- **Dataset ingestion pipeline** – Upload CSV or JSON files; parsing and data cleaning happen in an API route before storing in an in-memory registry.
- **Notebook ingestion** – Upload `.ipynb` files, convert Markdown/code cells to HTML, and display outputs (including rich HTML and images) directly in the browser.
- **Responsive dashboard pages** – Overview KPIs, chart gallery (line, bar, scatter, heatmap, map), data explorer table, and notebook viewer.
- **Reusable hooks & utilities** – Shared hooks for fetching datasets/notebooks, data-cleaning utilities, and chart transformation helpers.
- **UI enhancements** – Tailwind CSS styling with light/dark themes, upload forms, empty states, skeleton loaders, and authentication placeholders ready for integration.
- **Server-side validation** – Robust error handling for uploads with helpful client feedback.

## Project structure

```
src/
  app/
    api/              # File upload & data retrieval routes
    (pages)/          # App Router pages (overview, charts, explorer, notebooks)
  components/        # UI components, charts, upload forms, notebooks renderer
  hooks/             # SWR-powered data fetching hooks
  lib/               # CSV/JSON parsing, KPI calculations, chart helpers
  stores/            # In-memory dataset/notebook registry
  types/             # Shared TypeScript models
```

## Getting started locally

1. **Install dependencies**
   ```bash
   npm install
   ```
   > Uses Next.js `15.5.2`, React `18.3.1`, Tailwind CSS `4.1.13`, and supporting libraries listed in `package.json`.

2. **Configure environment variables**

   Create a `.env.local` file (ignored by Git) and add any variables you need. Suggested placeholders:
   ```bash
   AUTH_SECRET=replace-with-your-auth-secret
   NEXT_PUBLIC_MAP_TOKEN=optional-map-provider-token
   ```
   These variables are not yet consumed directly but give you a scaffold when wiring authentication or external map tiles.

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to open the dashboard. Upload datasets/notebooks using the forms on the Overview and Notebooks pages.

4. **Linting & type checks** (optional but recommended)
   ```bash
   npm run lint
   npx tsc --noEmit
   ```

## Upload workflow

- CSV files are parsed with `csv-parse/sync`. Headers are normalised (lowercase, snake_case) and rows with only empty values are dropped.
- JSON files must contain an array of records. Values are coerced to numbers when possible.
- Notebook files are parsed using `marked` for Markdown and custom output rendering to keep code cells, stdout, and rich outputs.
- Uploaded assets are stored in-memory via `src/stores/data-store.ts`. Replace this with a database or blob store for production use.

## Adding new datasets programmatically

1. Extend `saveDataset` in `src/stores/data-store.ts` to persist data in your database.
2. Update `src/lib/chart-data.ts` if you need bespoke aggregations or want to surface additional chart types.
3. Adjust the frontend selectors (`ChartsClient`, `ExplorerClient`) to expose new metrics or dataset metadata fields.
4. Wire authentication in `AuthStatus` (e.g., NextAuth) to restrict uploads.

## Rendering additional notebook formats

- Enhance `parseNotebookFile` in `src/lib/notebook.ts` to support alternative mimetypes (e.g., `image/jpeg`, `application/vnd.plotly.v1+json`).
- Customise the `NotebookViewer` component to support cell collapsing, code execution metadata, or diffing between runs.

## Deployment (Vercel)

1. Push this repository to GitHub or GitLab.
2. Create a new Vercel project and import the repo.
3. Set environment variables under **Settings → Environment Variables** (mirror `.env.local`).
4. Vercel automatically runs `npm install` and `npm run build`. The build output uses the Next.js App Router.
5. After deployment, uploads remain in-memory per serverless function instance. For persistence, connect to external storage (e.g., Supabase, PlanetScale, Blob storage) and swap the store implementation.

## Authentication placeholders

`src/components/navigation/auth-status.tsx` mimics a logged-in user after a short delay. Replace its logic with your provider of choice. Keep the theme-toggle and upload components accessible by wrapping authenticated pages in your own guard.

## Integrating new visualisations

- The chart helpers (`src/lib/chart-data.ts`) generate data for the existing chart suite. Extend them to compute metrics for time-series decomposition, box plots, or custom ECharts configs.
- When adding new charts, follow the `chart` components pattern: create a reusable card, ensure responsive containers, and avoid any shadow-based styling.

## Troubleshooting

- **Uploads fail with 413**: Increase `bodySizeLimit` in `next.config.mjs` or chunk uploads.
- **Charts missing**: Confirm your dataset exposes the required columns (numeric for line/scatter, categorical for bar/heatmap, lat/lon for maps).
- **Notebook rendering issues**: Ensure the `.ipynb` file includes executed cells; otherwise outputs will be empty.

## License

This project inherits the repository’s original license (if any). Update this section when publishing publicly.
