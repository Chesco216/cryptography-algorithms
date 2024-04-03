import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ElGamal } from './ElGamal'
import { Header } from "./Header";
import { MD5 } from "./MD5";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <ElGamal/> }/>
          <Route path="/md5" element={ <MD5/> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
