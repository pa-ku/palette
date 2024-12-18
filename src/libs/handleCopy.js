export const handleCopy = (gradientColors, mode, colorName) => {
  const textToCopy = Object.entries(gradientColors)
    .map(([key, value]) => mode ? `${key}: ${value};` : `${key}: '${value}',`)
    .join('\n')

  mode ? navigator.clipboard
    .writeText(textToCopy) : navigator.clipboard
      .writeText(`${colorName}: {${textToCopy}}`)


      .catch((err) => {
        console.error('Error al copiar al portapapeles:', err)
      })
}

