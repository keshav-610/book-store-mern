import Banner from "../components/Banner";

const Home = ({ isDarkTheme }) => {
  return (
    <div className={`transition ${isDarkTheme ? "bg-zinc-950 text-white" : "bg-white text-black"}`}>
      <Banner isDarkTheme={isDarkTheme} />
    </div>
  );
};

export default Home;
