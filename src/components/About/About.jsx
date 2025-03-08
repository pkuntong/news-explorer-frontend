import './About.css';
import authorProfile from '../../assets/author.jpg';
function About() {
  return (
    <section className='about'>
      <div className='about__container'>
        <div className='about__left'>
          <img
            src={authorProfile}
            alt='author_profile'
            className='about__profile'
          />
        </div>
        <div className='about__right'>
          <h2 className='about__header'>About the author</h2>
          <p className='about__text'>
            Hi! My name is Pau Kuntong and I am a Full-Stack
            Software Engineer based in Washington DC area.
            <br />
            <br />
            It was incredible experience time at TripleTen!
            I gained so many valuable skills in JavaScript, React, and Backend Development with TripleTen.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;