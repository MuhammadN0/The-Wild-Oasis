import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext()

function DarkModeProvider ({children}) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,'dark-mode')
  useEffect(function(){
    if(isDarkMode){
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    } else{
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode')
    }
  },[isDarkMode])
  function toggleDarkMode () {
    setIsDarkMode(e=>!e)
  }

  return <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>{children}</DarkModeContext.Provider>
}

function useDarkMode(){
  const context = useContext(DarkModeContext)
  if (context === undefined) throw new Error('Context was used outside provider')
  return context 
}

export {useDarkMode, DarkModeProvider}