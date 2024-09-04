import useModal from '../hooks/useModal'

export default function TailwindConfig({ children, name = 'test' }) {
  const [refModal, openModal, closeModal] = useModal()

  return (
    <>
      <button
        onClick={openModal}
        className='border-2 font-bold border-black hover:bg-black hover:text-white text-black px-3 rounded-lg py-1'
      >
        {children}
      </button>

      <dialog className='bg-black w-96 p-5 rounded-lg m-auto' ref={refModal}>
        <h1 className='text-slate-400 text-xl font-bold'>Tailwind Config</h1>
        <div className='text-slate-200 bg-slate-800 rounded-lg my-2 pl-5 flex flex-col'>
          <p>{`colors: {`}</p>
          <p className='pl-3'>{`${name}: {`}</p>
          <div className='pl-5'>
            <p>{`100: 'var(${name}-100)',`}</p>
            <p>{`200: 'var(${name}-200)',`}</p>
            <p>{`300: 'var(${name}-300)',`}</p>
            <p>{`400: 'var(${name}-400)',`}</p>
            <p>{`500: 'var(${name}-500)',`}</p>
            <p>{`600: 'var(${name}-600)',`}</p>
            <p>{`700: 'var(${name}-700)',`}</p>
            <p>{`800: 'var(${name}-800)',`}</p>
            <p>{`900: 'var(${name}-900)',`}</p>
            <p>{`},`}</p>
          </div>
          <p>{`}`}</p>
        </div>
        <button
          className='w-full bg-red-500 rounded-lg mt-2 text-white py-2'
          onClick={closeModal}
        >
          Close
        </button>
      </dialog>
    </>
  )
}
