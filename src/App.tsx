import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Teachers from './pages/Teachers';
import Schedule from './pages/Schedule';
import Admissions from './pages/Admissions';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import NewsDetail from './pages/NewsDetail'; // আপনার ফাইল পাথ অনুযায়ী
import ScrollToTop from './pages/ScrollToTop'; // Path thik kore niben


function App() {
  return (
  <DataProvider>
    <LanguageProvider>
      <Router>
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/news/:id" element={<NewsDetail />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  </DataProvider>
  );
}

export default App;
