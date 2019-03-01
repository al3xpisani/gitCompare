import React from 'react';
import PropTypes from 'prop-types';

import { Container, Repository } from './styles';

const CompareList = ({
  repositories, updateRepo, loadingRefresh, deleteRepo,
}) => (
  <Container>
    {repositories.map(repo => (
      <Repository key={repo.id}>
        <header>
          <img src={repo.owner.avatar_url} alt="logo" />
          <strong>{repo.name}</strong>
          <small>{repo.owner.login}</small>
        </header>

        <ul>
          <li>
            {repo.stargazers_count}
            <small>stars</small>
          </li>
          <li>
            {repo.forks_count}
            <small>forks</small>
          </li>
          <li>
            {repo.open_issues_count}
            <small>issues</small>
          </li>
          <li>
            {repo.lastCommit}
            <small>last commit</small>
          </li>
        </ul>
        <div>
          <button onClick={() => updateRepo(repo.id)} type="submit">
            <i className="fa fa-retweet" />
            {loadingRefresh ? <i className="fa fa-spinner" /> : 'Refresh'}
          </button>
          <button onClick={() => deleteRepo(repo.id)} type="submit">
            <i className="fa fa-trash" />
            Delete
          </button>
        </div>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string,
    }),
  ).isRequired,
  updateRepo: PropTypes.func.isRequired,
  deleteRepo: PropTypes.func.isRequired,
  loadingRefresh: PropTypes.bool.isRequired,
};

export default CompareList;
