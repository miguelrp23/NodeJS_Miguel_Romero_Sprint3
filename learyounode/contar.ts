export function contarPalabras(contenido: string): number {
    if (typeof contenido !== 'string' || !contenido) {
        return 0; 
    }
    return contenido.trim().split(/\s+/).filter(Boolean).length;
  
}
  
 