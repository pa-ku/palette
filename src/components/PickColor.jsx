import { useState, useEffect, useRef } from 'react'

// Component for pasting images
export default function PickColor({ setBaseColor }) {
  const [preview, setPreview] = useState(null)
  const [pickedColor, setPickedColor] = useState(null)
  const [hoverColor, setHoverColor] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

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

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const fileURL = URL.createObjectURL(file)
      setPreview(fileURL)
    }
  }

  const handleCanvasClick = (event) => {
    if (!canvasRef.current || !preview) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Obtener las coordenadas del clic
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Obtener el color del píxel
    const pixel = ctx.getImageData(x, y, 1, 1).data

    // Convertir de rgb a hex
    const rgbToHex = (r, g, b) =>
      `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
    const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2])

    setPickedColor(hexColor)
    setBaseColor(hexColor)
  }

  const handleMouseMove = (event) => {
    if (!canvasRef.current || !preview) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Coordinates relative to the canvas
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Update mouse position relative to the canvas
    setMousePos({ x, y })

    // Get pixel color under the cursor
    const pixel = ctx.getImageData(x, y, 1, 1).data
    const rgbColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`
    setHoverColor(rgbColor)
  }

  const handleMouseLeave = () => {
    setHoverColor(null)
  }
  useEffect(() => {
    if (preview && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const image = new Image()
      image.src = preview

      image.onload = () => {
        const maxWidth = 700 // Máximo ancho
        const maxHeight = 600 // Máxima altura

        let width = image.width
        let height = image.height

        // Ajustar dimensiones si excede los límites
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = (maxWidth / width) * height
            width = maxWidth
          } else {
            width = (maxHeight / height) * width
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(image, 0, 0, width, height)
      }
    }

    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div
      className='p-4 gap-4 w-full md:w-[50em] flex items-center justify-center flex-col bg-gray-900 text-white'
      onPaste={handlePaste}
    >
      <h1 className='text-4xl'>Color Picker</h1>
      <p className='mt-2 text-sm text-gray-400'>
        Presioná{' '}
        <kbd className='px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg'>
          Ctrl
        </kbd>{' '}
        +{' '}
        <kbd className='px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg'>
          V
        </kbd>{' '}
        para pegar una captura de pantalla.
      </p>
      {preview && (
        <div className='mt-4 relative ' ref={containerRef}>
          <canvas
            ref={canvasRef}
            className='border relative  border-gray-500  rounded-lg'
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
          {hoverColor && (
            <div
              style={{
                position: 'absolute',
                top: `${mousePos.y - 25}px`,
                left: `${mousePos.x - 25}px`,
                width: '50px',
                height: '50px',
                backgroundColor: hoverColor,
                border: '2px solid white',
                borderRadius: '50%',
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
          {pickedColor && (
            
            <p
              className='mt-2 text-lg w-full text-center font-bold'
              style={{ color: pickedColor }}
            >
              {pickedColor}
            </p>
          )}
        </div>
      )}
      <label className='overflow-hidden relative flex cursor-pointer items-center gap-2 px-8 py-4 font-bold text-gray-500 hover:text-white'>
        <svg
          className='pointer-events-none'
          fill='none'
          height='32'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
          width='32'
        >
          <path d='M15 8h.01' />
          <path d='M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5' />
          <path d='M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4' />
          <path d='M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54' />
          <path d='M16 19h6' />
          <path d='M19 16v6' />
        </svg>
        Busca una imagen
        <input
          className='pointer-events-none absolute opacity-0'
          type='file'
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}
