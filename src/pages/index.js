import { faDrupal, faJs, faNodeJs, faPhp, faReact, faSymfony } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import ContactForm from '../components/contact'
import GithubRepo from '../components/github'
import Layout from '../components/layout'
import { RepoGithub } from '../components/shared/RepoGithub'
import { Skills } from '../components/shared/Skills'
import UseGithub from '../hooks/use-github'

// markup
const IndexPage = () => {
  const githubs = UseGithub()

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
      <section id="skills" aria-labelledby="skills-heading">
        <h2 id="skills-heading">Compétences</h2>
        <Skills aria-label="Liste des compétences techniques">
          <li>
            <FontAwesomeIcon icon={faPhp} aria-hidden="true" />
            <span aria-label="PHP">PHP</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faJs} aria-hidden="true" />
            <span aria-label="Javascript">Javascript</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faSymfony} aria-hidden="true" />
            <span aria-label="Symfony versions 3 à 5">Symfony 3-5</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faDrupal} aria-hidden="true" />
            <span aria-label="Drupal versions 7 à 10">Drupal<br /> 7-10</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faNodeJs} aria-hidden="true" />
            <span aria-label="Nest.js">Nest.js</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faReact} aria-hidden="true" />
            <span aria-label="Next.js">Next.js</span>
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

export const Head = () => (
  <>
    <html lang="fr" />
    <title>Robin Charlet - Développeur Full Stack</title>
    <meta name="description" content="Développeur spécialisé dans les technologies web depuis 2004. Expert PHP, Symfony, Drupal, Node.js, Next.js et React." />
    <meta name="keywords" content="développeur full stack, php, symfony, drupal, node.js, next.js, react, nest.js" />
    <meta property="og:title" content="Robin Charlet - Développeur Full Stack" />
    <meta property="og:description" content="Développeur spécialisé dans les technologies web depuis 2004" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.robincharlet.fr/" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Robin Charlet - Développeur Full Stack" />
    <meta name="twitter:description" content="Développeur spécialisé dans les technologies web depuis 2004" />
  </>
);
