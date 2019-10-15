import React, { Component } from "react";
import { battle } from "../utils/api";
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    const { playerOne, playerTwo } = this.props;
    battle([playerOne, playerTwo])
      .then(res =>
        this.setState({
          winner: res[0],
          loser: res[1],
          loading: false,
          error: null
        })
      )
      .catch(({ message }) =>
        this.setState({ loading: false, error: message })
      );
  }
  render() {
    const { winner, loser, loading, error } = this.state;
    if(loading){
        return <p>loading.....</p>
    }
    if(error){
        return <p className="center-text error">{error}</p>
    }
    return (
        <div className='grid space-around container-sm'>
        <div className='card bg-light'>
          <h4 className='header-lg center-text'>
            {winner.score === loser.score ? 'Tie' : 'Winner'}
          </h4>
          <img
            className='avatar'
            src={winner.profile.avatar_url}
            alt={`Avatar for ${winner.profile.login}`}
          />
          <h4 className='center-text'>
            Score: {winner.score.toLocaleString()}
          </h4>
          <h2 className='center-text'>
            <a className='link' href={winner.profile.html_url}>
              {winner.profile.login}
            </a>
          </h2>
          <ul className='card-list'>
            <li>
              <FaUser color='rgb(239, 115, 115)' size={22} />
              {winner.profile.name}
            </li>
            {winner.profile.location && (
              <li>
                <FaCompass color='rgb(144, 115, 255)' size={22} />
                {winner.profile.location}
              </li>
            )}
            {winner.profile.company && (
              <li>
                <FaBriefcase color='#795548' size={22} />
                {winner.profile.company}
              </li>
            )}
            <li>
              <FaUsers color='rgb(129, 195, 245)' size={22} />
              {winner.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color='rgb(64, 183, 95)' size={22} />
              {winner.profile.following.toLocaleString()} following
            </li>
          </ul>
        </div>
        <div className='card bg-light'>
          <h4 className='header-lg center-text'>
            {winner.score === loser.score ? 'Tie' : 'Loser'}
          </h4>
          <img
            className='avatar'
            src={loser.profile.avatar_url}
            alt={`Avatar for ${loser.profile.login}`}
          />
          <h4 className='center-text'>
            Score: {loser.score.toLocaleString()}
          </h4>
          <h2 className='center-text'>
            <a className='link' href={loser.profile.html_url}>
              {loser.profile.login}
            </a>
          </h2>
          <ul className='card-list'>
            <li>
              <FaUser color='rgb(239, 115, 115)' size={22} />
              {loser.profile.name}
            </li>
            {loser.profile.location && (
              <li>
                <FaCompass color='rgb(144, 115, 255)' size={22} />
                {loser.profile.location}
              </li>
            )}
            {loser.profile.company && (
              <li>
                <FaBriefcase color='#795548' size={22} />
                {loser.profile.company}
              </li>
            )}
            <li>
              <FaUsers color='rgb(129, 195, 245)' size={22} />
              {loser.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color='rgb(64, 183, 95)' size={22} />
              {loser.profile.following.toLocaleString()} following
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
