export default function CopyButton({ children, onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className='flex border-2 border-slate-500 font-bold  px-3 py-1 text-slate-400 rounded-lg hover:bg-white stroke-gray-500  hover:text-black hover:stroke-black'
      >
        <svg
          width='25'
          height='25'
          viewBox='0 0 24 24'
          strokeWidth='2'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2' />
          <path d='M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z' />
        </svg>
        {children}
      </button>
    </>
  )
}
