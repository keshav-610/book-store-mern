import Banner from "../components/Banner";
import Recommend from "../components/Recommend";
import TopSellers from "../components/TopSellers";
import News from "../components/News";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="p-8">
      <Banner />
      <TopSellers />
      <Recommend/>
      <News/>
      <Footer/>
    </div>
  );
};

export default Home;
