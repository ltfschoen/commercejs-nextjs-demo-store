import React from 'react';
import Head from 'next/head';
import Root from '../components/common/Root';
import Footer from '../components/common/Footer';
import SocialMedia from '../components/common/SocialMedia';
import ExploreBanner from '../components/productAssets/ExploreBanner';
import HeroSection from '../components/homepage/HeroSection';
import HomeBanner from '../components/homepage/HomeBanner';
import CategoryBanner from '../components/homepage/CategoryBanner';
import ProductsBanner from '../components/homepage/ProductsBanner';
import TreatmentsBanner from '../components/homepage/TreatmentsBanner';

const Home = () => (
  <Root transparentHeader={true}>
    <Head>
      <title>Home | OTANÏ</title>
    </Head>

    <HeroSection />
    <HomeBanner />
    <CategoryBanner />
    <ProductsBanner />
    <TreatmentsBanner />
    <ExploreBanner />
    <SocialMedia />
    <Footer />
  </Root>
);

export default Home;
