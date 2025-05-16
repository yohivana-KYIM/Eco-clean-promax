import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ArticleProps {
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

const Article = ({ title, description, image, date, readTime, category, slug }: ArticleProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="group relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-eco-green-400/30 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-sm font-medium bg-eco-green-500/90 text-white rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-white/70 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-eco-green-300 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-white/80 mb-6 line-clamp-3">
          {description}
        </p>

        <Button
          variant="ghost"
          className="group/button text-eco-green-400 hover:text-eco-green-300 hover:bg-eco-green-400/10 px-0"
        >
          Lire la suite
          <ArrowRight className="ml-2 h-4 w-4 transform group-hover/button:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.article>
  );
};

export default Article; 