export default function CopyButton({ children, onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className='flex group relative text-gray-400 overflow-hidden px-2 items-center justify-center py-1 font-bold  hover:text-white'
      >
        <svg
          className='size-6 relative z-10 group-hover:stroke-white stroke-gray-400'
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
        <p className='relative z-10 '>{children}</p>
      </button>
    </>
  )
}
