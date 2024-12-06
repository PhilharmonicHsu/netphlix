import { useState } from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [searchData, setSearchData] = useState([]);

  const handleUpdateValue = (newValue) => {
    setSearchData(newValue);
  }

  return (
    <>
      <Header updateValue={handleUpdateValue}/>
      <Main value={searchData}/>
      <Footer />
    </>
  )
}

export default App
