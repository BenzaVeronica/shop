import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CompanyInfo from '../components/Home/CompanyInfo';

const AboutScreen = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <Header />
      <CompanyInfo />
      <Footer />
    </div>
  );
};

export default AboutScreen;
