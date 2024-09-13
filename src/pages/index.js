import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import ContactForm from '../components/contact';
import GithubRepo from '../components/github';
import UseGithub from '../hooks/use-github';
import { colors, breakpoints, spacing, radius } from '../utils/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhp, faJs, faSymfony, faDrupal, faNodeJs, faReact } from '@fortawesome/free-brands-svg-icons';

// markup
const IndexPage = () => {
  const Skills = styled(`ul`)`
    display: flex;
    flex-flow: row wrap;
    padding-left: 0;
    justify-content: center;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      list-style: none;
      color: ${colors.text};
      padding: ${spacing.md}px;
      margin: ${spacing.sm}px;
      background: ${colors.grey};
      border-radius: ${radius.large}px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      flex: 1 1 30%;
      max-width: 200px;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
      }

      @media (min-width: ${breakpoints.tablet}px) {
        flex: 1 1 20%;
      }

      @media (min-width: ${breakpoints.desktop}px) {
        flex: 1 1 15%;
      }

      svg {
        font-size: 2rem;
        margin-bottom: ${spacing.sm}px;
        color: ${colors.bluePrimary};
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
          <li>
            <FontAwesomeIcon icon={faPhp} />
            PHP
          </li>
          <li>
            <FontAwesomeIcon icon={faJs} />
            Javascript
          </li>
          <li>
            <FontAwesomeIcon icon={faSymfony} />
            Symfony 3-5
          </li>
          <li>
            <FontAwesomeIcon icon={faDrupal} />
            Drupal<br /> 7-10
          </li>
          <li>
            <FontAwesomeIcon icon={faNodeJs} />
            Nest.js
          </li>
          <li>
            <FontAwesomeIcon icon={faReact} />
            Next.js
          </li>
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
