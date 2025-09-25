import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
const Home = lazy(() => import('./pages/Home'));
const Properties = lazy(() => import('./pages/Properties'));
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'));
const Property3D = lazy(() => import('./pages/Property3D'));
const About = lazy(() => import('./pages/About'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div className="container min-h-screen py-12">Loading…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              <Route path="/property-3d" element={<Property3D />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path='*' element={<NotFound/>} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;