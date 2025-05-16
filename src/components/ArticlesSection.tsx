import React from 'react';
import { motion } from 'framer-motion';
import Article from './Article';

// Données des articles (à remplacer par des données dynamiques plus tard)
const articles = [
  {
    title: "Les avantages du nettoyage écologique",
    description: "Découvrez pourquoi le nettoyage écologique est non seulement meilleur pour l'environnement, mais aussi plus efficace pour votre santé et votre bien-être.",
    image: "/images/articles/eco-cleaning.jpg",
    date: "15 Mars 2024",
    readTime: "5 min",
    category: "Écologie",
    slug: "avantages-nettoyage-ecologique"
  },
  {
    title: "Techniques de nettoyage professionnel",
    description: "Les méthodes et techniques utilisées par nos professionnels pour garantir un nettoyage impeccable de vos espaces.",
    image: "/images/articles/pro-cleaning.jpg",
    date: "12 Mars 2024",
    readTime: "4 min",
    category: "Techniques",
    slug: "techniques-nettoyage-professionnel"
  },
  {
    title: "Entretien des espaces verts",
    description: "Comment maintenir vos espaces verts en parfait état tout en respectant l'environnement et la biodiversité.",
    image: "/images/articles/green-spaces.jpg",
    date: "10 Mars 2024",
    readTime: "6 min",
    category: "Espaces Verts",
    slug: "entretien-espaces-verts"
  },
  {
    title: "Solutions de nettoyage innovantes",
    description: "Les dernières innovations en matière de produits et techniques de nettoyage respectueux de l'environnement.",
    image: "/images/articles/innovations.jpg",
    date: "8 Mars 2024",
    readTime: "5 min",
    category: "Innovation",
    slug: "solutions-nettoyage-innovantes"
  }
];

const ArticlesSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-eco-green-950 to-black">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Nos Articles & Actualités
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Découvrez nos derniers articles sur le nettoyage écologique, les techniques professionnelles et les innovations du secteur.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Article {...article} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center px-6 py-3 bg-eco-green-500 hover:bg-eco-green-400 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-eco-green-500/30">
            Voir tous les articles
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesSection; 