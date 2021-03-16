import React from 'react';
import styled from '@emotion/styled';
import Footer from '../components/footer';
import Hero from '../components/hero';
import Layout from '../components/layout';
import ContactForm from '../components/contact';
import GithubRepo from '../components/github';
import UseGithub from '../hooks/use-github';

// markup
const IndexPage = () => {
  const Skills = styled(`ul`)`
    display: flex;
    flex-flow: row wrap;

    li {
      list-style: none;
      margin: 7px;
      padding: 5px 10px;
      color: #374054;
      background: #e4e4ea;
      flex: auto;
    }
  `;

  const githubs = UseGithub();

  return (
    <>
      <Hero />
      <Layout>
        <section>
          <h2>Présentation</h2>
          <p>
            Développeur web depuis 2004, je suis spécialisé dans le Front-End,
            le Responsive Design et le mobile. Je prends part à toutes les
            étapes de création d’un site internet ou d'une application, de
            l'étude du projet à sa mise en ligne, tout en recherchant la
            meilleure expérience utilisateur possible. Et ce sur tous les
            supports numériques actuels, du smartphone à l'écran ultra HD.
          </p>
        </section>
        <section>
          <h2>Compétences</h2>
          <Skills>
            <li>Symfony 3-5</li>
            <li>Drupal 7-9</li>
            <li>ReactJS</li>
            <li>Gatsby</li>
            <li>VueJS</li>
            <li>Javascript</li>
            <li>PHP</li>
          </Skills>
        </section>
        <section>
          <h2>Repo github</h2>
          {githubs.map((repo) => (
            <GithubRepo key={repo.title} repo={repo} />
          ))}
        </section>
        <section>
          <h2>Contactez moi</h2>
          <ContactForm />
        </section>
      </Layout>
      <Footer />
    </>
  );
};

export default IndexPage;
