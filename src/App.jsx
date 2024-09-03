import { useEffect, useState } from 'react'
import CopyButton from './components/CopyButton'
import { handleCopy } from './libs/handleCopy'
import { hexToHSL } from './libs/hexToHSL'
import { hslToHex } from './libs/hslToHex'
import TailwindConfig from './components/TailwindConfig'

const MIN_RANGE = 1
const MAX_RANGE = 10
function ColorGradient() {
  const [baseColor, setBaseColor] = useState('#42a4ff')
  const [colorName, setColorName] = useState('--primary')
  const [range, setRange] = useState(7)
  const [gradientColors, setGradientColors] = useState({})

  function generateGradientColors(baseHex) {
    const baseHSL = hexToHSL(baseHex)
    const colors = {}

    for (let i = MIN_RANGE; i <= MAX_RANGE; i++) {
      const step = (5 - i) * range // Ajustamos la luminosidad
      const newL = Math.max(0, Math.min(100, baseHSL[2] + step))
      colors[`${colorName}-${i}00`] = hslToHex(baseHSL[0], baseHSL[1], newL)
    }

    return colors
  }

  useEffect(() => {
    setGradientColors(generateGradientColors(baseColor))
  }, [baseColor, colorName, range])

  return (
    <>
      <header
        className={`   text-white  w-full h-full flex items-center flex-col py-5 gap-2`}
      >
        <h1 className=' flex items-center justify-center text-8xl text-center  py-5 font-bold text-blue-500 stroke-blue-500 fill-blue-500 '>
          <svg
            className='w-32 h-32'
            viewBox='0 0 24 24'
            strokeWidth='0.6'
            fill='transparent'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M11.667 6c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 2 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968zm-4 6.5c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 1.975 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968z' />
          </svg>
          <img className='w-0' src='/public/favicon.webp' alt='' />
          Palete
        </h1>
        <section className='w-80 space-y-3'>
          <div className='w-80 color-picker-ctn '>
            <input
              type='text'
              style={{ background: baseColor }}
              className={`border-4  w-full px-5 py-3 rounded-lg font-bold outline-none text-xl`}
              value={baseColor}
              onChange={(e) => setBaseColor(`${e.target.value}`)}
            />
            <input
              className='color-picker hover:scale-110 duration-100'
              type='color'
              onChange={(e) => setBaseColor(`${e.target.value}`)}
              value={baseColor}
            />
          </div>
          <div className='range-ctn w-full'>
            <input
              className='range '
              type='range'
              style={{
                backgroundImage: `linear-gradient(to right, #ffffff, ${baseColor})`,
              }}
              min={1}
              max={10}
              value={range}
              onChange={(e) => setRange(e.target.value)}
            />
            <p className='font-bold w-24 text-black '>Range {range}</p>
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
      <main className='color-wrapper'>
        {Object.entries(gradientColors).map(([key, value]) => (
          <p className='color-row' key={key} style={{ backgroundColor: value }}>
            {key}: {value};
          </p>
        ))}
      </main>
    </>
  )
}

export default ColorGradient
