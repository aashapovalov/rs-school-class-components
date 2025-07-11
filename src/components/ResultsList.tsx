import { Component } from 'react';

interface Character {
  name: string;
  status: string;
  species: string;
  location: {
    name: string;
    url: string;
  };
  image: string;

}

interface ResultsListProps {
  results: Character[];
}

export default class ResultsList extends Component<ResultsListProps> {
  render() {
    return (
    <section className="result-section">
    {this.props.results.map((character, index)=>(
    <div key={index} className={`character-card ${index}`}>
      <img src = {character.image} alt = {character.name}/>
      <h2 className='character-name'>Name: {character.name}</h2>
      <p className='alive-status'>
        <span className={`status-indicator ${character.status === 'Alive' ? 'green' : 'red'}`}>
        </span>
      {character.status}</p>
      <p className='species'>{character.species}</p>
      <p className='location'>Last known location: {character.location.name}</p>
    </div>
  ))}
  </section>
    );
  }
}