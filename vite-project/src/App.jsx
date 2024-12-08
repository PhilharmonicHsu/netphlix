import { useState } from 'react'
import './App.css'
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import About from "./components/About/About.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const [searchData, setSearchData] = useState([]);
  const [isLightMode, setLightMode] = useState(false);

  const handleUpdateValue = (newValue) => {
    console.log('handleUpdateValue')
    setSearchData(newValue);
  }

  const handleChangeMode = () => {
    setLightMode((prev) => ! prev)
  }

  return (
    <>
      <Router>
        <Header updateValue={handleUpdateValue} handleChangeMode={handleChangeMode} isLightMode={isLightMode}/>
        <Routes>
          <Route path="/" element={
            <>
              <Main value={searchData} isLightMode={isLightMode}/>
              <Footer isLightMode={isLightMode}/>
            </>
            }
          />
          <Route path="/about" element={<About isLightMode={isLightMode} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
