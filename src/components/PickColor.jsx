import { useState, useEffect } from 'react'

// Componente principal
export default function PickColor() {
  return (
    <>
      <PickColorPaste />
    </>
  )
}

// Componente para pegar imágenes
function PickColorPaste() {
  const [preview, setPreview] = useState(null)

  const handlePaste = (event) => {
    const clipboardItems = event.clipboardData.items
    for (const item of clipboardItems) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile()
        const fileURL = URL.createObjectURL(file)
        setPreview(fileURL)
        break
      }
    }
  }

  useEffect(() => {
    // Liberar recursos al desmontar el componente
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div
      className='p-4 w-full md:w-[35em] flex items-center justify-center flex-col bg-gray-900 text-white'
      onPaste={handlePaste}
    >
      <h1 className='text-4xl'>Color Picker</h1>
      <p className='mt-2 text-sm text-gray-400'>
        Presioná <kbd>Ctrl</kbd> + <kbd>V</kbd> para pegar una captura de
        pantalla.
      </p>
      {preview && (
        <div className='mt-4'>
          <img
            src={preview}
            alt='Pasted Preview'
            className='w-[35em] max-h-64 object-cover rounded-lg'
          />
        </div>
      )}
    </div>
  )
}
