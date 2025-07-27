import { useNavigate } from 'react-router';

import appLogo from '../assets/app_logo.png';
import myCharacter from '../assets/my_character_portrait.png';
import carouselImg2 from '../assets/character_rick_morty2.png';
import reprogramming from '../assets/reprogramming_line.png';
import portal from '../assets/portal_background.png';
import wallCrack from '../assets/wall_crack.png';

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <section className="about-page">
      <img
        src={appLogo}
        className="logo"
        alt={'Rick and Morty logo'}
        onClick={() => navigate('/search')}
      />
      <h1 className={'about_author'}>About author</h1>
      <img
        className="wall-crack"
        src={wallCrack}
        alt="Wall crack page decoration"
      />
      <img className="portal" src={portal} alt="Portal page decoration" />
      <div className="about-text-grid">
        <div className="about-text">
          <img
            src={myCharacter}
            alt="My character portrait"
            className="my-character-portrait"
          />
          <p className="first-paragraph">
            Once upon a malfunctioning wormhole, I was born and lived an average
            life of a Sklarn-7 boy. Until I met Rick — in the middle of a
            malfunctioning vending machine dispute at a Galactic DMV — and it
            changed my life forever.
          </p>
          <p>
            I don’t know if it was the way I argued over expired credits or the
            fact that I didn’t flinch when the vending unit exploded, but Rick
            said I had “background character energy — the good kind.” Next thing
            I knew, he shoved a script into my hands, mumbled something about
            tax write-offs, and just like that, I landed a part as a background
            character on <b>Rick and Morty</b>. They gave me three full episodes
            to prove myself: <i>“Morty’s Midlife Crisis”</i>,{' '}
            <i>“The Portal Shakes Twice”</i>, and{' '}
            <i>“Rick’s Rehab Roulette.”</i>
          </p>
        </div>
      </div>
      <blockquote>
        <hr />
        <p className="quote">You’re too unstable for this multiverse</p>
        <hr />
      </blockquote>
      <div className="about-text-grid">
        <div className="about-text">
          <p>
            I spent weeks shooting scenes that were 90% improvised and 100%
            lethal to my sanity. At one point, I was cast as “Alternate Rick’s
            Emotional Support Human.” The job required me to cry on command and
            hold a shrieking space ferret for 17 takes.
          </p>
          <p>
            I drank. I raged. I lost my cool during a wrap party on Planet
            Glorzo. Rick said, “You’re too unstable for this multiverse,” and
            Morty just nodded like I was a lost cause.
          </p>
        </div>
      </div>
      <img
        src={carouselImg2}
        alt="Me and Rick drinking in the bar"
        className="middle-img"
      />
      <p className="middle-img-caption">
        Just one drink, he said. Five galaxies later, I’m banned from the
        Citadel dive bar.
      </p>
      <div className="about-text-grid">
        <div className="about-text">
          <p>
            So I did the only logical thing: I packed up my life and decided to
            reset — not just my location, but my entire codebase. I enrolled in
            the{' '}
            <i>
              <a href="https://rs.school/courses/reactjs">
                RS School React course
              </a>
            </i>
            , learned how to make buttons that don’t implode, components that
            don’t scream, and interfaces that (mostly) obey the laws of physics.
          </p>
          <p>
            Now, I’m building something of my own. A story-driven indie game.
            Inspired by everything that didn’t go according to plan.
          </p>
          <p>
            It’s not just a game — it’s my redemption arc. Expect portals,
            panic, sarcastic AI, broken timelines, and maybe… just maybe… a
            version of me who finally gets the last line.
          </p>
        </div>
      </div>
      <p className="sign-error">MULTIVERSE ERROR CODE: 404-BIO</p>
      <img
        className="reprogramming"
        src={reprogramming}
        alt="reprogramming underline"
      />
    </section>
  );
}
