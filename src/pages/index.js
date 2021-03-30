import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import ContactForm from '../components/contact';
import GithubRepo from '../components/github';
import UseGithub from '../hooks/use-github';
import { colors, breakpoints } from '../utils/styles';

// markup
const IndexPage = () => {
  const Skills = styled(`ul`)`
    display: flex;
    flex-flow: row wrap;
    padding-left: 0;

    li {
      text-align: center;
      list-style: none;
      color: ${colors.text};
      padding: 5px 10px;
      margin: 7px;
      background: ${colors.grey};
      flex: 1 1 25%;
      @media (min-width: ${breakpoints.tablet}px) {
        flex: 1 1 15%;
      }
    }
  `;

  const RepoGithub = styled(`ul`)`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding-left: 0;

    li {
      list-style: none;
      margin-bottom: 2%;
      flex: 1 1 100%;
      @media (min-width: ${breakpoints.tablet}px) {
        flex: 0 0 48%;
      }
    }
  `;

  const githubs = UseGithub();

  return (
    <Layout>
      <section id="presentation">
        <h2>Présentation</h2>
        <p>
          Développeur spécialisé dans les technologies web depuis 2004, je
          prends part à toutes les étapes de création d’un site ou d'une
          application.
          <br />
          <br />
          De l'étude du projet à sa mise en ligne, je recherche la technologie
          la mieux adaptée à ses spécificités, pour offrir la meilleure
          performance et expérience utilisateur possible, quel que soit le
          support.
        </p>
      </section>
      <section id="skills">
        <h2>Compétences</h2>
        <Skills>
          <li>PHP</li>
          <li>Javascript</li>
          <li>CSS</li>
          <li>REST</li>
          <li>Symfony 3-5</li>
          <li>Drupal 7-9</li>
          <li>ReactJS</li>
          <li>VueJS</li>
          <li>GatsbyJS</li>
        </Skills>
      </section>
      <section id="github">
        <h2>Travaux</h2>
        <RepoGithub>
          {githubs.map((repo) => (
            <GithubRepo key={repo.title} repo={repo} />
          ))}
        </RepoGithub>
      </section>
      <section id="contact">
        <h2>Contactez-moi</h2>
        <ContactForm />
      </section>
    </Layout>
  );
};

export default IndexPage;
