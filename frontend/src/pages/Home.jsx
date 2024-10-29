import Banner from "../components/Banner";
import Recommend from "../components/Recommend";
import TopSellers from "../components/TopSellers";
import News from "../components/News";

const Home = () => {
  return (
    <div className="p-8">
      <Banner />
      <TopSellers />
      <Recommend/>
      <News/>
    </div>
  );
};

export default Home;
