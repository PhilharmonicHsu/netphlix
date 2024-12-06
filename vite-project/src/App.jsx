import { useState } from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [searchData, setSearchData] = useState([]);
  const [isLightMode, setLightMode] = useState(false);

  const handleUpdateValue = (newValue) => {
    console.log('handleUpdateValue')
    setSearchData(newValue);
  }

  const handleChangeMode = (newValue) => {
    setLightMode(newValue)
  }

  return (
    <>
      <Header updateValue={handleUpdateValue} handleChangeMode={handleChangeMode} isLightMode={isLightMode}/>
      <Main value={searchData} isLightMode={isLightMode}/>
      <Footer isLightMode={isLightMode}/>
    </>
  )
}

export default App
