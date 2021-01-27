import Search from "../components/Search";
import Card from "../components/Card";

const Home = () => {
  return (
    <>
      <Search />
      <section className="home container grid grid__home">
        <Card />

        <div className="home__cta">
          <button className="btn btn__load">Load More</button>
        </div>
      </section>
    </>
  );
};

export default Home;
