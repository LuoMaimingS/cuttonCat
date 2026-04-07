import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Activities from './components/Activities';
import StudentManagement from './components/StudentManagement';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-orange-50 font-sans text-gray-800 antialiased selection:bg-orange-200 selection:text-orange-900">
      <Navbar />
      
      <main>
        <Hero />
        <Gallery />
        <Activities />
        <StudentManagement />
      </main>

      <Footer />
    </div>
  );
}

export default App;
