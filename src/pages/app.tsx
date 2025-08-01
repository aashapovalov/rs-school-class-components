import { BrowserRouter, Route, Routes } from 'react-router';

import {
  AboutPage,
  SearchRequest,
  SearchLayout,
  NotFoundPage,
  ThemeProvider,
} from '../components';

import './app.css';

export default function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchLayout />}>
              <Route index element={<SearchRequest />} />
            </Route>

            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
