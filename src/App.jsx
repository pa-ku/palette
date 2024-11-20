import { useEffect, useState } from 'react'
import CopyButton from './components/CopyButton'
import { handleCopy } from './libs/handleCopy'
import { hexToHSL } from './libs/hexToHSL'
import { hslToHex } from './libs/hslToHex'
import TailwindConfig from './components/TailwindConfig'

const MIN_RANGE = 1
const MAX_RANGE = 12
function ColorGradient() {
  const [baseColor, setBaseColor] = useState('#42a4ff')
  const [colorName, setColorName] = useState('primary')
  const [range, setRange] = useState(7)
  const [mode, setMode] = useState(false)
  const [gradientColors, setGradientColors] = useState({})

  function generateGradientColors(baseHex) {
    const baseHSL = hexToHSL(baseHex)
    const colors = {}

    for (let i = MIN_RANGE; i <= MAX_RANGE; i++) {
      const step = (5 - i) * range // Ajustamos la luminosidad
      const newL = Math.max(0, Math.min(100, baseHSL[2] + step))
      colors[`${mode ? `--${colorName}-${i}00` : `${i}00`} `] = hslToHex(
        baseHSL[0],
        baseHSL[1],
        newL
      )
    }

    return colors
  }

  useEffect(() => {
    const gradientColor = generateGradientColors(baseColor)
    setGradientColors(gradientColor)
  }, [baseColor, mode, colorName, range])

  const [copied, setCopied] = useState(false)

  function handleCopyAll() {
    handleCopy(gradientColors)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  function copyColor(value) {
    navigator.clipboard.writeText(value)

    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <>
      <header className='py-20 relative bg-gray-800  text-white w-full h-full flex items-center flex-col'>
        <p
          className={`${
            copied && 'opacity-95 scale-95'
          }  top-0 absolute px-5 py-3 m-3 scale-0 duration-200 opacity-0 bg-black w-max rounded-xl items-center flex justify-center`}
        >
          Copiado!
        </p>

        <h1 className=' flex items-center justify-center text-6xl lg:text-8xl text-center  text-white pb-10 stroke-white fill-white font-thin'>
          <svg
            className='size-24 lg:size-32'
            viewBox='0 0 24 24'
            strokeWidth='0.4'
            fill='transparent'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M11.667 6c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 2 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968zm-4 6.5c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 1.975 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968z' />
          </svg>
          Palette
        </h1>
        <section className='w-80 space-y-4 '>
          <div className='w-80 color-picker-ctn '>
            <input
              type='text'
              style={{ background: baseColor }}
              className={`border-2 w-full border-gray-700 px-5 py-2 rounded-lg  outline-none`}
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
            />
            <input
              className='color-picker  hover:scale-110 duration-100'
              type='color'
              onChange={(e) => setBaseColor(e.target.value)}
              value={baseColor}
            />
          </div>
          <input
            className='border-2 border-gray-700 w-full py-2 bg-gray-900 text-white  px-4 rounded-lg'
            type='text'
            maxLength={13}
            placeholder='Nombre'
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
          />
          <div className='range-ctn w-full'>
            <input
              className='range'
              type='range'
              min={6}
              max={11}
              value={range}
              onChange={(e) => setRange(e.target.value)}
            />
            <p className='font-bold w-28 text-gray-600 '>Brightness</p>
          </div>

          <div className='flex gap-2'>
            <TailwindConfig name={colorName}>Tailwind Config</TailwindConfig>
          </div>
        </section>
      </header>
      <div className='  w-full flex-col flex items-center justify-center '>
        <div className=' w-full p-5 flex gap-5  items-center justify-center'>
          <CopyButton onClick={handleCopyAll}>Copiar</CopyButton>
          <div className=' flex flex-row gap-2 '>
            <div className=' relative flex w-fit items-center text-white justify-center'>
              <input
                name='mode'
                className='peer absolute h-full w-full cursor-pointer appearance-none'
                type='radio'
                onChange={() => setMode(false)}
                defaultChecked
              />
              <p className='pointer-events-none  border-2 border-white border-dashed px-4 py-1 font-bold peer-checked:bg-white  peer-checked:text-gray-800'>
                Tailwind
              </p>
            </div>
            <div className=' relative flex w-fit items-center justify-center text-white'>
              <input
                name='mode'
                className='peer absolute h-full w-full cursor-pointer appearance-none'
                type='radio'
                onChange={() => setMode(true)}
              />
              <p className='pointer-events-none border-2 border-white border-dashed px-4 py-1 font-bold peer-checked:bg-white peer-checked:text-gray-800'>
                Css
              </p>
            </div>
          </div>
        </div>
        <main className='w-full flex h-full pb-5 items-center gap-1 flex-wrap justify-center '>
          {Object.entries(gradientColors).map(([key, value]) => (
            <>
              <button
                className='flex flex-col w-36 gap-1 relative'
                onClick={() => copyColor(value)}
              >
                <div
                  className='flex w-full h-20 py-5  rounded-md  justify-start items-center'
                  key={key}
                  style={{ backgroundColor: value, borderColor: value + 5 }}
                ></div>
                <div className='flex flex-col items-start'>
                  <p
                    className={`${
                      key.includes('500') && 'font-bold '
                    }  text-white text-xs`}
                  >
                    {key}:
                  </p>
                  <p className='text-xs text-gray-400'>
                    {value}
                    {mode ? ';' : ','}
                  </p>
                </div>
              </button>
            </>
          ))}
        </main>
      </div>
    </>
  )
}

export default ColorGradient
