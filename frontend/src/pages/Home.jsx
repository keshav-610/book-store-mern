import Banner from "../components/Banner";
import Recommend from "../components/Recommend";
import TopSellers from "../components/TopSellers";

const Home = () => {
  return (
    <div className="p-8">
      <Banner />
      <TopSellers />
      <Recommend/>
    </div>
  );
};

export default Home;
