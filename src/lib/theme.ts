export const themeTokens = {
  light: {
    background: "rgb(var(--bg))",
    foreground: "rgb(var(--fg))",
    muted: "rgb(var(--muted))",
    border: "rgb(var(--border))",
    accent: "rgb(var(--accent))",
    benign: "rgb(var(--benign))",
    malignant: "rgb(var(--malignant))"
  },
  dark: {
    background: "rgb(var(--bg))",
    foreground: "rgb(var(--fg))",
    muted: "rgb(var(--muted))",
    border: "rgb(var(--border))",
    accent: "rgb(var(--accent))",
    benign: "rgb(var(--benign))",
    malignant: "rgb(var(--malignant))"
  }
};

export const diagnosisColor = (diagnosis: "M" | "B") =>
  diagnosis === "M" ? themeTokens.light.malignant : themeTokens.light.benign;
