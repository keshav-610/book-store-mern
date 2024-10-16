import bannerimg from "../assets/banner.png";

const Banner = () => {
    return (
      <div className="flex flex-col md:flex-row justify-center items-center ">
        <div className="w-full md:w-3/5 ">
          <h1 className="text-6xl font-semibold">New Releases this Week</h1>
          <p className="my-5 text-xl leading-8 sm:leading-10">
            It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone.
          </p>
          <button className="font-semibold text-lg bg-yellow-300 px-5 py-3 text-black rounded-xl border-none hover:bg-black hover:text-yellow-300 transition-colors duration-300 ease-in-out transform hover:border-yellow-300">
            Subscribe
          </button>
        </div>
        <div className="mt-5 md:mt-0">
          <img src={bannerimg} alt="Banner" className="w-full h-auto" />
        </div>
      </div>
    );
  };
  

export default Banner;
