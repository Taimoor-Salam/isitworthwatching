import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="aboutPageContainer">
      <h1>How does this work?</h1>
      <p>The ratings are combined.</p>
      <p>Currently, IMDb carries <span className="watchingColor">60%</span> of the weight, while RottenTomatoes and Metacritic both carry <span className="watchingColor">20%</span> of the weight.</p>
      <p>The weights are slightly altered when there are movies with missing ratings.</p>
      <p>In order for a movie/series to be "worth it" <span className="watchingColor">they must reach a score of at least 70.</span></p>
      <p>Horror movies and comedy movies <span className="watchingColor">must reach the score of 65.</span></p>
      <p>Hit the top-left icon again to return.</p>
      <label>Designed by Taimoor Salam</label>
      <form action="https://taimoorsalam.com" target="_blank">
            <button type="submit" className="redirectButton">
            <ion-icon name="chevron-up-outline"></ion-icon> taimoorsalam.com
            </button>
            </form>
    </div>
  );
};

export default AboutPage;
