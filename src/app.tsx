import { BrowserRouter, Route, Routes } from 'react-router';

import { SearchRequest, SearchLayout } from './entities';
import { NotFoundPage, AboutPage } from './pages';
import { ThemeProvider } from './state/context';

import './app.css';

export function App() {
  return (
    <>
      <ThemeProvider>
        <div className="bg-[var(--Background-light)] text-[var(--Font-color-basic)] dark:bg-[var(--Background-dark)] dark:text-[var(--Font-color-basic-dark)] min-h-screen w-full">
          <div className="max-w-[102.4rem] mx-auto p-4">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<SearchLayout />}>
                  <Route index element={<SearchRequest />} />
                </Route>

                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
