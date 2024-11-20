export const handleCopy = (gradientColors) => {
  const textToCopy = Object.entries(gradientColors)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')

  navigator.clipboard
    .writeText(textToCopy)

    .catch((err) => {
      console.error('Error al copiar al portapapeles:', err)
    })
}
