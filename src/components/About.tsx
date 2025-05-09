import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Leaf, 
  Shield, 
  Clock, 
  Award, 
  Users, 
  ThumbsUp,
  CheckCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Images de haute qualité pour le nettoyage industriel
  const backgroundImage = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1920";

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const featureCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12
      }
    },
    hover: {
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Service Fiable",
      description: "Des équipes qualifiées et disponibles pour des interventions dans les délais impartis."
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Produits Écologiques",
      description: "Utilisation de produits respectueux de l'environnement pour un nettoyage responsable."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Disponibilité 24/7",
      description: "Un service client disponible à tout moment pour répondre à vos besoins urgents."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Certifications",
      description: "Certifié aux normes ISO 9001 et 14001 pour garantir un service de qualité."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Équipe Experte",
      description: "Personnel formé et expérimenté dans tous les types de nettoyage professionnel."
    },
    {
      icon: <ThumbsUp className="h-6 w-6" />,
      title: "Satisfaction Client",
      description: "Plus de 95% de nos clients renouvellent leur confiance année après année."
    }
  ];

  const clientTypes = [
    "Bureaux", "Hôtels", "Cliniques", "Usines", "Commerces", 
    "Écoles", "Restaurants", "Laboratoires", "Parkings", "Chantiers"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white pt-16 md:pt-20 lg:pt-24">
      {/* Hero Section */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6"
              >
                Notre Histoire
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
              >
                Découvrez l'histoire d'Ecoclean Pro et notre engagement pour un nettoyage professionnel et écologique
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-20 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4 sm:mb-6">
              Notre Mission
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
              Chez Ecoclean Pro, nous nous engageons à fournir des services de nettoyage professionnels 
              qui respectent l'environnement tout en garantissant des résultats exceptionnels.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: <Leaf className="h-6 w-6 sm:h-8 sm:w-8" />,
                title: "Écologique",
                description: "Produits respectueux de l'environnement"
              },
              {
                icon: <Users className="h-6 w-6 sm:h-8 sm:w-8" />,
                title: "Professionnel",
                description: "Équipe qualifiée et expérimentée"
              },
              {
                icon: <Clock className="h-6 w-6 sm:h-8 sm:w-8" />,
                title: "Efficace",
                description: "Service rapide et efficace"
              },
              {
                icon: <Shield className="h-6 w-6 sm:h-8 sm:w-8" />,
                title: "Fiable",
                description: "Engagement qualité garanti"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-eco-green-50 flex items-center justify-center mb-4 sm:mb-6">
                  {value.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 sm:mb-3">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-20 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
          
          
          </motion.div>

         
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-eco-green-50 rounded-xl sm:rounded-2xl p-8 sm:p-12 md:p-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4 sm:mb-6">
              Rejoignez-nous dans notre mission
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Découvrez comment nos services de nettoyage professionnels peuvent transformer votre espace
            </p>
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-eco-green-600 hover:bg-eco-green-700 text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span className="flex items-center justify-center gap-2">
                  Demander un Devis
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;