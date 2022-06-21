import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Header /> 
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/coins/:id' element={<CoinPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
