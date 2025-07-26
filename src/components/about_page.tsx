import appLogo from '../assets/app_logo.png';
import myCharacter from '../assets/my_character_portrait.png';

export default function AboutPage() {
  return (
    <section className="about-page">
      <img src={appLogo} className="logo" alt={'Rick and Morty logo'} />
      <h1 className={'about_author'}>About author</h1>
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
          <p>
            I spent weeks shooting scenes that were 90% improvised and 100%
            lethal to my sanity. At one point, I was cast as “Alternate Rick’s
            Emotional Support Human.” The job required me to cry on command and
            hold a shrieking space ferret for 17 takes.
          </p>
        </div>
      </div>
    </section>
  );
}
