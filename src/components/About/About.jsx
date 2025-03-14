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
            Hi! I'm Pau Kuntong, a Full-Stack Software Engineer based in the Washington, DC area.
            <br />
            <br />
            My time at TripleTen was truly transformative, allowing me to develop strong skills in JavaScript, React, and Backend Development.
            It was an invaluable experience that helped shape my expertise in the field.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;