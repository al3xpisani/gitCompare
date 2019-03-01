import React, { Component } from 'react';
import moment from 'moment';

import logoGit from '../../assets/logo.png';

import { Container, Form } from './styles';
import CompareList from '../../components/comparelist';

import API from '../../services/api';

export default class Main extends Component {
  state = {
    loadingRefresh: false,
    loading: false,
    repoError: false,
    inputRepo: '',
    repositories: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });

    if (typeof Storage === 'undefined') {
      alert('Your browser does not support storage');
      return false;
    }
    this.setState({
      loadingRefresh: false,
      loading: false,
      repositories: (await JSON.parse(localStorage.getItem('@gitCompareRepoID'))) || [],
    });
    return true;
  }

  handleDeleteRepo = async (id) => {
    const { repositories } = this.state;

    const updateRepo = repositories.filter(repo => repo.id !== id);

    await localStorage.setItem('@gitCompareRepoID', JSON.stringify(updateRepo));

    this.setState({
      repositories: updateRepo,
    });
  };

  handleUpdateRepo = async (id) => {
    this.setState({ loadingRefresh: true });
    const { repositories } = this.state;

    const repository = repositories.find(repo => repo.id === id);

    if (!repository) {
      return false;
    }

    try {
      const { data } = await API.get(`/repos/${repository.full_name}`);

      // formata a data ex : x minutos atrás
      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        loading: false,
        repoError: false,
        inputRepo: '',
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
      });
    } catch (error) {
      alert(error);
    } finally {
      this.setState({ loadingRefresh: false });
    }
  };

  handleAddRepo = async (e) => {
    // evita que o form inteiro seja atualizado
    e.preventDefault();

    this.setState({ loading: true });
    try {
      const { data: repository } = await API.get(`/repos/${this.state.inputRepo}`);

      // formata a data ex : x minutos atrás
      repository.lastCommit = moment(repository.pushed_at).fromNow();
      // o array é imutável
      // se adiciona ao array o último valor digitado através do spread oprator (...)
      this.setState({
        repoError: false,
        inputRepo: '',
        repositories: [...this.state.repositories, repository],
      });
    } catch (error) {
      this.setState({ repoError: true });
    } finally {
      if (typeof Storage === 'undefined') {
        alert('Your browser does not support storage');
        return false;
      }
      if (this.state.repoError === false) {
        await localStorage.setItem('@gitCompareRepoID', JSON.stringify(this.state.repositories));
      }
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Container>
        <img src={logoGit} alt="logo" />

        <Form withError={this.state.repoError} onSubmit={this.handleAddRepo}>
          <input
            value={this.state.inputRepo}
            onChange={e => this.setState({ inputRepo: e.target.value })}
            type="text"
            placeholder="usuário/repositório"
          />
          <button type="submit">
            {this.state.loading ? <i className="fa fa-spinner" /> : 'OK'}
          </button>
        </Form>
        <CompareList
          loadingRefresh={this.state.loadingRefresh}
          updateRepo={this.handleUpdateRepo}
          deleteRepo={this.handleDeleteRepo}
          repositories={this.state.repositories}
        />
      </Container>
    );
  }
}
