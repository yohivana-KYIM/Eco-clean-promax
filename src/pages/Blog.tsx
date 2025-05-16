import React, { useState, useMemo, useEffect } from 'react';
import { Leaf, Search, Calendar, User } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Données des articles (à remplacer par une API plus tard)
const blogPosts = [
  {
    title: "Comment garder votre maison propre et saine",
    author: "Patrick",
    date: "11 Mai 2025",
    category: "Nettoyage à domicile",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1920",
    slug: "nettoyage-a-domicile",
    excerpt: "Une maison propre est essentielle pour une vie saine. Découvrez quelques astuces simples pour garder votre intérieur éclatant sans y passer des heures."
  },
  {
    title: "Pourquoi l'hygiène domestique influence notre bien-être",
    author: "Patrick",
    date: "31 Mars 2022",
    category: "Nettoyage à domicile",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=1920",
    slug: "hygiene-domestique-bien-etre",
    excerpt: "L'hygiène de notre environnement direct a un impact significatif sur notre santé physique et mentale. Découvrez pourquoi et comment l'améliorer."
  },
  {
    title: "Un intérieur qui sent toujours bon : mission possible !",
    author: "Patrick",
    date: "31 Mars 2022",
    category: "Nettoyage à domicile",
    image: "https://images.unsplash.com/photo-1583845112239-97ef1341b271?auto=format&fit=crop&q=80&w=1920",
    slug: "interieur-qui-sent-bon",
    excerpt: "Les mauvaises odeurs peuvent gâcher l'ambiance d'une pièce. Voici nos conseils pour maintenir un intérieur frais et agréable."
  },
  {
    title: "Les erreurs à éviter lors du ménage",
    author: "Patrick",
    date: "30 Mars 2022",
    category: "Nettoyage à domicile",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=1920",
    slug: "erreurs-menage",
    excerpt: "Certaines habitudes de nettoyage peuvent être inefficaces voire contre-productives. Apprenez à les identifier et à les corriger."
  },
  {
    title: "Les secrets d'un nettoyage de bureau efficace",
    author: "Patrick",
    date: "15 Avril 2025",
    category: "Nettoyage professionnel",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1920",
    slug: "nettoyage-bureau-efficace",
    excerpt: "Découvrez les techniques professionnelles pour maintenir un espace de travail impeccable et sain."
  },
  {
    title: "Nettoyage des espaces commerciaux : guide complet",
    author: "Patrick",
    date: "10 Avril 2025",
    category: "Nettoyage professionnel",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1920",
    slug: "nettoyage-espaces-commerciaux",
    excerpt: "Un guide détaillé pour le nettoyage et l'entretien des espaces commerciaux de toutes tailles."
  },
  {
    title: "10 astuces pour un nettoyage rapide et efficace",
    author: "Patrick",
    date: "5 Avril 2025",
    category: "Conseils et astuces",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=1920",
    slug: "astuces-nettoyage-rapide",
    excerpt: "Des astuces simples et efficaces pour gagner du temps dans vos tâches de nettoyage quotidiennes."
  },
  {
    title: "Comment organiser son temps de ménage",
    author: "Patrick",
    date: "1 Avril 2025",
    category: "Conseils et astuces",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1920",
    slug: "organiser-temps-menage",
    excerpt: "Apprenez à planifier et optimiser votre temps de ménage pour un entretien régulier et efficace."
  },
  {
    title: "Les meilleurs produits de nettoyage écologiques",
    author: "Patrick",
    date: "25 Mars 2025",
    category: "Produits écologiques",
    image: "https://images.unsplash.com/photo-1583845112239-97ef1341b271?auto=format&fit=crop&q=80&w=1920",
    slug: "produits-nettoyage-ecologiques",
    excerpt: "Découvrez notre sélection des meilleurs produits de nettoyage respectueux de l'environnement."
  },
  {
    title: "Comment fabriquer ses produits de nettoyage naturels",
    author: "Patrick",
    date: "20 Mars 2025",
    category: "Produits écologiques",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=1920",
    slug: "fabriquer-produits-naturels",
    excerpt: "Guide pratique pour créer vos propres produits de nettoyage écologiques à la maison."
  },
  {
    title: "L'impact environnemental des produits de nettoyage",
    author: "Patrick",
    date: "15 Mars 2025",
    category: "Produits écologiques",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1920",
    slug: "impact-environnemental-nettoyage",
    excerpt: "Analyse de l'impact des produits de nettoyage sur l'environnement et solutions alternatives."
  }
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Toutes les catégories");
  const [searchQuery, setSearchQuery] = useState("");
  const [isChrome, setIsChrome] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Détection de Chrome
    const isChromeBrowser = /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent);
    setIsChrome(isChromeBrowser);
    setMounted(true);
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(blogPosts.map(post => post.category));
    return ["Toutes les catégories", ...Array.from(uniqueCategories)];
  }, []);

  const filteredPosts = useMemo(() => {
    if (!mounted) return [];
    
    return blogPosts.filter(post => {
      const matchesCategory = selectedCategory === "Toutes les catégories" || post.category === selectedCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.category.toLowerCase().includes(searchLower);
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, mounted]);

  const handleCategoryChange = (value: string) => {
    if (isChrome) {
      // Pour Chrome, on utilise requestAnimationFrame pour éviter les problèmes de rendu
      requestAnimationFrame(() => {
        setSelectedCategory(value);
      });
    } else {
      setSelectedCategory(value);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isChrome) {
      requestAnimationFrame(() => {
        setSearchQuery(e.target.value);
      });
    } else {
      setSearchQuery(e.target.value);
    }
  };

  const handleResetFilters = () => {
    if (isChrome) {
      requestAnimationFrame(() => {
        setSelectedCategory("Toutes les catégories");
        setSearchQuery("");
      });
    } else {
      setSelectedCategory("Toutes les catégories");
      setSearchQuery("");
    }
  };

  // Si le composant n'est pas encore monté, on affiche un état de chargement
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-eco-green-50/30 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-eco-green-50/30 pt-24">
      {/* Hero Section */}
      <div className="relative py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center bg-eco-green-100 px-4 py-2 rounded-full text-eco-green-700 font-medium text-sm mb-4">
              <Leaf className="mr-2 h-4 w-4" />
              <span>Notre Blog</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Articles & Actualités
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos derniers articles sur le nettoyage écologique, les techniques professionnelles et les innovations du secteur.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Rechercher un article..."
                  className="pl-10 bg-white/80 backdrop-blur-sm border-eco-green-100 focus:border-eco-green-300"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Select 
                value={selectedCategory} 
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full sm:w-[200px] bg-white/80 backdrop-blur-sm border-eco-green-100 focus:border-eco-green-300">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className={isChrome ? "will-change-transform" : ""}>
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-sm text-white/90 mb-2">{post.category}</div>
                        <h2 className="text-xl font-semibold text-white line-clamp-2">
                          {post.title}
                        </h2>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <Button
                        variant="ghost"
                        className="text-eco-green-600 hover:text-eco-green-700 hover:bg-eco-green-50/50"
                      >
                        Lire la suite
                      </Button>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <p className="text-gray-600 text-lg mb-4">
                Aucun article ne correspond à votre recherche.
              </p>
              <Button
                variant="ghost"
                onClick={handleResetFilters}
                className="text-eco-green-600 hover:text-eco-green-700"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog; 