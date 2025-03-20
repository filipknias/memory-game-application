import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from '@/views/Home/Home';
import Game from '@/views/Game/Game';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
