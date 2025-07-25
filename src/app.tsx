import { BrowserRouter, Route, Routes } from 'react-router';

import {
  AboutPage,
  SearchRequest,
  SearchLayout,
  SearchStateProvider,
} from './components';

import './app.css';

export default function App() {
  return (
    <>
      <SearchStateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchLayout />}>
              <Route path="/search" element={<SearchRequest />} />
            </Route>
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </BrowserRouter>
      </SearchStateProvider>
    </>
  );
}
