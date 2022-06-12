import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header /> 
        <Routes>
          <Route exact path='/Crypto-Tracker' element={<Homepage />} />
          <Route path='/Crypto-Tracker/coins/:id' element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
