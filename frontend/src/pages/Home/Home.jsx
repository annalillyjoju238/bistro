import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './Home.css'
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {
  const [category, setCategory] = useState("All");
  const location = useLocation();

  useEffect(() => {
    const scrollToId = location.state?.scrollTo;
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div>
      <Header />
      <div id="explore-menu">
        <ExploreMenu category={category} setCategory={setCategory} />
      </div>
      <FoodDisplay category={category} />
      <div id="app-download">
        <AppDownload />
      </div>
      <div id="footer">
        <footer>
        </footer>
      </div>
    </div>
  );
}

export default Home;
