/**
 * Categorías sugeridas. Sirven para que Yami pueda generar un acceso al
 * "Curso" aunque todavía no haya subido ninguna clase con esa categoría.
 * Se combinan con las que ya existen en los videos cargados.
 */
export const DEFAULT_CATEGORIES = [
  'Curso',
  'Tirada semanal',
  'Rituales',
  'Lecturas privadas',
] as const;

export function mergeCategories(existing: string[]): string[] {
  return Array.from(new Set([...DEFAULT_CATEGORIES, ...existing].filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, 'es'),
  );
}
