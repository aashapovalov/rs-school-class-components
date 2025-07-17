import { Component } from 'react';

import type { ResultsListProps } from './types';

import fallbackImg from '../assets/fallback_card_image.png';

export default class ResultsList extends Component<ResultsListProps> {
  render() {
    return (
      <section className="result-section">
        {this.props.results.map((character, index) => (
          <div
            key={index}
            className={`character-card ${index}`}
            data-testid="character-card"
          >
            <img
              className="character-image"
              src={character.image ? character.image : fallbackImg}
              alt={character.name}
            />
            <div className="character-description">
              <h2 className="character-name">{character.name}</h2>
              <p className="alive-status" data-testid="alive-status">
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
                <span className="species" data-testid="species">
                  {' '}
                  {character.species}
                </span>
              </p>
              <p className="location">
                Last known location:{' '}
                <span data-testid="location">{character.location.name}</span>
              </p>
            </div>
          </div>
        ))}
      </section>
    );
  }
}
