export function contarPalabras(contenido: string): number {
    if (typeof contenido !== 'string' || !contenido) {
        return 0; // Devuelve 0 si el contenido no es una cadena válida
    }
    return contenido.trim().split(/\s+/).filter(Boolean).length;
  }
  
 