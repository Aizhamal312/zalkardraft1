import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Stay } from './pages/Stay';
import { Tours } from './pages/Tours';
import { Contact } from './pages/Contact';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index.html" element={<Navigate to="/" replace />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/stay.html" element={<Navigate to="/stay" replace />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours.html" element={<Navigate to="/tours" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
