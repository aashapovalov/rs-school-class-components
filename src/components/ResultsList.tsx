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
        {this.props.results.map((character, index) => (
          <div key={index} className={`character-card ${index}`}>
            <img
              className="character-image"
              src={character.image}
              alt={character.name}
            />
            <div className="character-description">
              <h2 className="character-name">{character.name}</h2>
              <p className="alive-status">
                <span
                  className={`status-indicator ${
                    character.status === 'Alive'
                      ? 'green'
                      : character.status === 'Dead'
                        ? 'red'
                        : 'gray'
                  }`}
                ></span>
                {character.status} -
                <span className="species"> {character.species}</span>
              </p>
              <p className="location">
                Last known location: <span>{character.location.name}</span>
              </p>
            </div>
          </div>
        ))}
      </section>
    );
  }
}
