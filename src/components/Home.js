import React, { Component } from 'react'
import axios from 'axios'

export default class Home extends Component {
  state = {
    persons: [],
    planets: [],
    allPeople: [],
    isLoaded: false
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    const requestPeople = axios.get('https://swapi.co/api/people/')
    const requestPlanets = axios.get('https://swapi.co/api/planets/')

    axios.all([requestPeople, requestPlanets]).then(
      axios.spread((...responses) => {
        const persons = responses[0].data.results
        const planets = responses[1].data.results.slice(0, 6)
        this.setState({
          persons: persons.slice(0, 6),
          planets,
          allPeople: persons,
          isLoaded: true
        }).catch(err => console.log(err))
      })
    )
  }

  render() {
    const { persons, planets } = this.state

    return this.state.isLoaded ? (
      <main className="people">
        <h1 className="heading-1">List of Star Wars Characters</h1>
        <ul className="people__list">
          {persons.map((person, index) => (
            <li key={index} className="people__item">
              <h2 className="people__heading"> {person.name}</h2>
              <p className="people__text">
                Gender:{' '}
                {person.gender === 'male' ? (
                  <span role="img" aria-label="male">
                    Male 👦
                  </span>
                ) : person.gender === 'female' ? (
                  <span role="img" aria-label="female">
                    Female 👩
                  </span>
                ) : person.gender === 'n/a' ? (
                  <span role="img" aria-label="robot">
                    Robot 🤖
                  </span>
                ) : (
                  'Not specified'
                )}
              </p>
              <p className="people__text">Height: {person.height}</p>
              <p className="people__text">Mass: {person.mass}</p>
              <p className="people__text">Birth Year: {person.birth_year}</p>
            </li>
          ))}
        </ul>
        <h3 className="heading-3">{`Showing ${persons.length} characters out of ${this.state.allPeople.length}`}</h3>
      </main>
    ) : null
  }
}
