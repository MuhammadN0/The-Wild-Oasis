import { useEffect, useRef } from "react"

export function useCloseModal (handler) {
  const ref = useRef()

  useEffect(function(){
    function handleClose (e) {

      if (ref.current && !ref.current.contains(e.target)) handler?.()
      return
    }

    document.addEventListener('click',handleClose,false)

    return () => document.removeEventListener('click',handleClose,false)
  },[handler])

  return ref
}