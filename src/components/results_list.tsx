import { Component } from 'react';

import type { ResultsListProps } from './types';

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
