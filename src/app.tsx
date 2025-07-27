import { BrowserRouter, Route, Routes } from 'react-router';

import {
  AboutPage,
  SearchRequest,
  SearchLayout,
  SearchStateProvider,
  NotFoundPage,
} from './components';

import './app.css';

export default function App() {
  return (
    <>
      <SearchStateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="search" element={<SearchLayout />}>
              <Route index element={<SearchRequest />} />
            </Route>

            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </SearchStateProvider>
    </>
  );
}
