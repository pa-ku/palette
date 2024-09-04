import { useEffect, useState } from 'react'
import CopyButton from './components/CopyButton'
import { handleCopy } from './libs/handleCopy'
import { hexToHSL } from './libs/hexToHSL'
import { hslToHex } from './libs/hslToHex'
import TailwindConfig from './components/TailwindConfig'
import Title from './components/Title'

const MIN_RANGE = 1
const MAX_RANGE = 10
function ColorGradient() {
  const [baseColor, setBaseColor] = useState('#42a4ff')
  const [colorName, setColorName] = useState('primary')
  const [range, setRange] = useState(7)
  const [gradientColors, setGradientColors] = useState({})

  function generateGradientColors(baseHex) {
    const baseHSL = hexToHSL(baseHex)
    const colors = {}

    for (let i = MIN_RANGE; i <= MAX_RANGE; i++) {
      const step = (5 - i) * range // Ajustamos la luminosidad
      const newL = Math.max(0, Math.min(100, baseHSL[2] + step))
      colors[`--${colorName}-${i}00`] = hslToHex(baseHSL[0], baseHSL[1], newL)
    }

    return colors
  }

  useEffect(() => {
    const gradientColor = generateGradientColors(baseColor)
    setGradientColors(gradientColor)
  }, [baseColor, colorName, range])

  return (
    <>
      <header className='bg-gradient-to-t from-white text-white w-full h-full flex items-center flex-col py-5 gap-2'>
        <Title>Palete</Title>
        <section className='w-80 space-y-4 pb-6'>
          <div className='w-80 color-picker-ctn '>
            <input
              type='text'
              style={{ background: baseColor }}
              className={`border-4  w-full px-5 py-3 rounded-lg font-bold outline-none text-xl`}
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
            />
            <input
              className='color-picker hover:scale-110 duration-100'
              type='color'
              onChange={(e) => setBaseColor(e.target.value)}
              value={baseColor}
            />
          </div>
          <div className='range-ctn w-full'>
            <input
              className='range '
              type='range'
              min={4}
              max={13}
              value={range}
              onChange={(e) => setRange(e.target.value)}
            />
            <p className='font-bold w-28 text-black '>Brightness</p>
          </div>

          <input
            className='w-full py-3 bg-black text-white px-4 rounded-lg'
            type='text'
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
          />
          <div className='flex gap-2'>
            <CopyButton onClick={() => handleCopy(gradientColors)}>
              Copy Code
            </CopyButton>
            <TailwindConfig name={colorName}>Tailwind Config</TailwindConfig>
          </div>
        </section>
      </header>
      <main className=' border-gray-800  black color-wrapper'>
        {Object.entries(gradientColors).map(([key, value]) => (
          <div
            className={`  border-gray-800 flex h-full py-3  justify-start items-center`}
            key={key}
            style={{ backgroundColor: value }}
          >
            <p
              className={`${
                key.includes('500') && ' w-full font-bold'
              } color-row flex justify-start items-center bg-gray-800  w-60 rounded-r-xl `}
            >
              {key}: {value};
            </p>
          </div>
        ))}
      </main>
    </>
  )
}

export default ColorGradient
