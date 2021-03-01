import React from 'react';
import Footer from '../components/footer';
import Hero from '../components/hero';
import Layout from '../components/layout';

// markup
const IndexPage = () => {
  return (
    <Layout>
      <Hero />
      <main>
        <section>
          <p>
            Développeur web depuis 2004, je suis spécialisé dans le Front-End,
            le Responsive Design et le mobile. Je prends part à toutes les
            étapes de création d’un site internet ou d'une application, de
            l'étude du projet à sa mise en ligne, tout en recherchant la
            meilleure expérience utilisateur possible. Et ce sur tous les
            supports numériques actuels, du smartphone à l'écran ultra HD.
          </p>
        </section>
      </main>
      <Footer />
    </Layout>
  );
};

export default IndexPage;
