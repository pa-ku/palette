import { useEffect, useState } from 'react'
import CopyButton from './components/CopyButton'
import { handleCopy } from './libs/handleCopy'
import { hexToHSL } from './libs/hexToHSL'
import { hslToHex } from './libs/hslToHex'
import TailwindConfig from './components/TailwindConfig'
import PickColor from './components/PickColor'

const MIN_RANGE = 1
const MAX_RANGE = 9
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
      const cssMode = `--${colorName}-${i}00`
      const tailwindMode = `${i}00`

      const step = (5 - i) * range // Ajustamos la luminosidad
      const newL = Math.max(0, Math.min(100, baseHSL[2] + step))
      colors[`${mode ? cssMode : tailwindMode}`] = hslToHex(
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
    handleCopy(gradientColors, mode, colorName)
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
      <div
        className={`${copied && 'opacity-95 scale-95'
          } w-full flex fixed h-max top-0 duration-200 z-50 items-center justify-center scale-0  opacity-0`}
      >
        <p className=' px-5 py-3 m-3 text-white duration-200  bg-black w-max rounded-xl'>
          Copied!
        </p>
      </div>

      <div className='space-y-12 py-20'>
        <header className=' relative bg-gray-800  text-white w-full h-full flex items-center flex-col'>
          <h1 className=' flex items-center justify-center text-6xl lg:text-8xl text-center  text-white pb-10 stroke-white fill-white font-thin'>
            <svg
              className='size-24 lg:size-28'
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
              <p className='font-bold w-28 text-gray-600 '>Rango</p>
            </div>

            <div className='flex gap-2'>
              <TailwindConfig name={colorName}>Tailwind Config</TailwindConfig>
            </div>
          </section>
        </header>

        <main className='space-y-3'>
          <div className='w-full flex gap-5  items-center justify-center'>
            <CopyButton onClick={handleCopyAll}>Copy</CopyButton>

            <section className='flex  w-48 h-10 bg-gray-700 rounded-full  '>
              <button
                onClick={() => setMode(true)}
                className={`peer/es es w-24 h-full py-0.5  font-bold  duration-500 ${mode ? 'text-black z-20 ' : 'text-white'}`}

              >
                Css
              </button>
              <button
                onClick={() => setMode(false)}
                className={`peer w-24 duration-500 font-bold  py-0.5 h-full relative z-10  ${!mode ? 'text-black ' : ' text-white '}`}
              >
                Tailwind
              </button>
              <div
                className={`  bg-black dark:bg-white -10 h-10 rounded-full w-24 absolute duration-500 ${mode ? 'translate-x-0 peer-hover:translate-x-1' : ' peer-hover/es:translate-x-[calc(100%-0.25rem)] translate-x-full'
                  }`}
              ></div>
            </section>


          </div>
          <div className='w-full flex h-full  items-center  flex-wrap justify-center '>
            {Object.entries(gradientColors).map(([key, value]) => (
              <>
                <button
                  className='flex flex-col hover:outline-1 hover:bg-gray-700 p-1  rounded-xl duration-200 w-36 gap-1 relative'
                  onClick={() => copyColor(value)}
                >
                  <div
                    className='flex w-full h-20 py-5  rounded-md  justify-start items-center'
                    key={key}
                    style={{ backgroundColor: value, borderColor: value + 5 }}
                  ></div>
                  <div className='flex flex-col items-start'>
                    <p
                      className={`${key.includes('500') && 'font-bold '
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
          </div>
        </main>

        <div className='flex items-center justify-center flex-col'></div>
        <div className='w-full flex items-center justify-center'>
          <PickColor setBaseColor={setBaseColor}></PickColor>
        </div>
      </div>
    </>
  )
}

export default ColorGradient
