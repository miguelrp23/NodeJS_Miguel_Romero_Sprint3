function contarPalabras(contenido: string): number {
    // Contar las palabras en el contenido del archivo
    return contenido.split(/\s+/).filter(Boolean).length;
  }
  
  export default contarPalabras;
  
  