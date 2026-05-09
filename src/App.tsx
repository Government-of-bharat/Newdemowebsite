import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { CaseStudy } from './pages/CaseStudy';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-study/:id" element={<CaseStudy />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
