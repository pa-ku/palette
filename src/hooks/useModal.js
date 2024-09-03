import { useRef } from 'react'

export default function useModal() {
  const refModal = useRef(null)

  function openModal() {
    refModal.current.showModal()
  }
  function closeModal() {
    refModal.current.close()
  }

  return [refModal, openModal, closeModal]
}
