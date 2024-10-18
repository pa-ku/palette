export default function Title({ children }) {
  return (
    <>
      <h1 className=' flex items-center justify-center text-6xl lg:text-8xl text-center py-5 text-white stroke-white fill-white '>

        {children}
      </h1>
    </>
  )
}
