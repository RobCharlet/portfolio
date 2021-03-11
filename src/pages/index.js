import React from 'react';
import { css } from '@emotion/react';
import Footer from '../components/footer';
import Hero from '../components/hero';
import Layout from '../components/layout';
import ContactForm from '../components/contact';

// markup
const IndexPage = () => {
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
        <section
          css={css`
            .skills {
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
            }
          `}
        >
          <h2>Compétences</h2>
          <ul className="skills">
            <li>Symfony 3-5</li>
            <li>Drupal 7-9</li>
            <li>ReactJS</li>
            <li>Gatsby</li>
            <li>VueJS</li>
            <li>Javascript</li>
            <li>PHP</li>
          </ul>
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
