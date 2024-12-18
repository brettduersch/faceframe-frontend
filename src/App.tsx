import './App.css'
import FaceFrame from './components/FaceFrame'
import { GCodeContextProvider } from "./context/context";

function App() {
  return (
    <>
      <GCodeContextProvider>
        <FaceFrame />
      </GCodeContextProvider>
    </>
  )
}

export default App
