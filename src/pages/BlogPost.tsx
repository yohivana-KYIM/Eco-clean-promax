import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useParams } from 'react-router-dom';

// Données des articles (à remplacer par une API plus tard)
const blogPosts = {
  "nettoyage-a-domicile": {
    title: "Comment garder votre maison propre et saine",
    author: "Patrick",
    date: "11 Mai 2025",
    category: "Nettoyage à domicile",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1920",
    content: `
      Une maison propre est essentielle pour une vie saine. Découvrez quelques astuces simples pour garder votre intérieur éclatant sans y passer des heures.

      Garder sa maison propre ne signifie pas forcément y passer des journées entières. En adoptant une routine de nettoyage quotidienne, en utilisant des produits naturels comme le vinaigre blanc et le bicarbonate de soude, et en impliquant tous les membres de la famille, vous pouvez maintenir un environnement sain et agréable.

      Voici quelques conseils pratiques :
      • Aérez les pièces chaque jour
      • Désinfectez régulièrement les surfaces fréquemment touchées
      • Organisez vos tâches hebdomadaires pour plus d'efficacité
      • Utilisez des produits écologiques
      • Impliquez toute la famille dans le ménage
    `,
    relatedPosts: [
      {
        title: "Pourquoi l'hygiène domestique influence notre bien-être",
        date: "31 Mars 2022",
        category: "Nettoyage à domicile",
        slug: "hygiene-domestique-bien-etre"
      },
      {
        title: "Un intérieur qui sent toujours bon : mission possible !",
        date: "31 Mars 2022",
        category: "Nettoyage à domicile",
        slug: "interieur-qui-sent-bon"
      }
    ]
  },
  "hygiene-domestique-bien-etre": {
    title: "Pourquoi l'hygiène domestique influence notre bien-être",
    author: "Patrick",
    date: "31 Mars 2022",
    category: "Nettoyage à domicile",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=1920",
    content: `
      L'hygiène de notre environnement direct a un impact significatif sur notre santé physique et mentale. Découvrez pourquoi et comment l'améliorer.

      Notre maison est notre refuge, notre espace de vie quotidien. Son état d'hygiène influence directement notre qualité de vie et notre bien-être. Une maison propre et bien entretenue contribue à :
      • Réduire le stress et l'anxiété
      • Améliorer la qualité de l'air intérieur
      • Prévenir les allergies et les maladies
      • Créer un environnement propice au repos et à la concentration

      L'impact sur la santé physique :
      Un environnement propre limite la prolifération des bactéries et des allergènes. Les surfaces régulièrement nettoyées et désinfectées réduisent les risques de contamination et d'infections. Une bonne ventilation et un nettoyage régulier des filtres de climatisation améliorent la qualité de l'air que nous respirons.

      L'impact sur le bien-être mental :
      Une maison en désordre peut générer du stress et de l'anxiété. À l'inverse, un intérieur propre et organisé favorise la détente et la concentration. L'ordre visuel aide à maintenir un esprit clair et serein.

      Conseils pour maintenir un environnement sain :
      • Établissez une routine de nettoyage régulière
      • Aérez quotidiennement chaque pièce
      • Utilisez des produits de nettoyage écologiques
      • Maintenez une température et une humidité optimales
      • Désencombrez régulièrement votre espace
    `,
    relatedPosts: [
      {
        title: "Comment garder votre maison propre et saine",
        date: "11 Mai 2025",
        category: "Nettoyage à domicile",
        slug: "nettoyage-a-domicile"
      },
      {
        title: "Un intérieur qui sent toujours bon : mission possible !",
        date: "31 Mars 2022",
        category: "Nettoyage à domicile",
        slug: "interieur-qui-sent-bon"
      }
    ]
  },
  "interieur-qui-sent-bon": {
    title: "Un intérieur qui sent toujours bon : mission possible !",
    author: "Patrick",
    date: "31 Mars 2022",
    category: "Nettoyage à domicile",
    image: "https://images.unsplash.com/photo-1583845112239-97ef1341b271?auto=format&fit=crop&q=80&w=1920",
    content: `
      Les mauvaises odeurs peuvent gâcher l'ambiance d'une pièce. Voici nos conseils pour maintenir un intérieur frais et agréable.

      Une maison qui sent bon est un véritable atout pour le bien-être de ses occupants. Cependant, maintenir un intérieur parfumé de manière naturelle et durable n'est pas toujours évident. Voici nos solutions et astuces.

      Les sources courantes de mauvaises odeurs :
      • Les déchets ménagers
      • Les textiles (rideaux, tapis, literie)
      • Les espaces humides (salle de bain, cuisine)
      • Les animaux domestiques
      • Les meubles et matelas

      Solutions naturelles pour un intérieur parfumé :
      1. Aération quotidienne :
         • Ouvrez les fenêtres au moins 15 minutes par jour
         • Privilégiez les heures où l'air extérieur est le plus frais
         • Créez des courants d'air pour renouveler l'atmosphère

      2. Solutions naturelles :
         • Vinaigre blanc pour neutraliser les odeurs
         • Bicarbonate de soude comme désodorisant
         • Huiles essentielles pour parfumer naturellement
         • Plantes dépolluantes (aloe vera, lavande, etc.)

      3. Entretien préventif :
         • Nettoyez régulièrement les filtres de climatisation
         • Lavez les textiles fréquemment
         • Entretenez les canalisations
         • Utilisez des housses anti-acariens

      Astuces pour chaque pièce :
      Cuisine :
      • Videz régulièrement la poubelle
      • Nettoyez le réfrigérateur mensuellement
      • Utilisez un filtre à charbon actif

      Salle de bain :
      • Séchez les surfaces après utilisation
      • Aérez après la douche
      • Utilisez des produits d'entretien parfumés naturellement

      Chambres :
      • Lavez la literie régulièrement
      • Aérez les matelas
      • Utilisez des sachets de lavande dans les armoires
    `,
    relatedPosts: [
      {
        title: "Comment garder votre maison propre et saine",
        date: "11 Mai 2025",
        category: "Nettoyage à domicile",
        slug: "nettoyage-a-domicile"
      },
      {
        title: "Les erreurs à éviter lors du ménage",
        date: "30 Mars 2022",
        category: "Nettoyage à domicile",
        slug: "erreurs-menage"
      }
    ]
  },
  "erreurs-menage": {
    title: "Les erreurs à éviter lors du ménage",
    author: "Patrick",
    date: "30 Mars 2022",
    category: "Nettoyage à domicile",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=1920",
    content: `
      Certaines habitudes de nettoyage peuvent être inefficaces voire contre-productives. Apprenez à les identifier et à les corriger.

      Le nettoyage de la maison est une tâche essentielle, mais certaines pratiques courantes peuvent en réalité rendre le travail plus difficile ou moins efficace. Voici les erreurs les plus fréquentes et comment les éviter.

      Erreur 1 : Mélanger les produits de nettoyage
      Le mélange de certains produits chimiques peut être dangereux. Par exemple :
      • Javel + vinaigre = gaz toxique
      • Ammoniaque + eau de javel = vapeurs nocives
      • Différents détergents = réactions imprévisibles

      Solution : Utilisez un produit à la fois et rincez bien entre chaque utilisation.

      Erreur 2 : Nettoyer dans le désordre
      Beaucoup commencent par le sol alors qu'il devrait être nettoyé en dernier.

      Ordre optimal de nettoyage :
      1. Désencombrer et ranger
      2. Dépoussiérer de haut en bas
      3. Nettoyer les surfaces
      4. Laver les sols en dernier

      Erreur 3 : Utiliser trop de produit
      Plus de produit ne signifie pas meilleur nettoyage. L'excès peut :
      • Laisser des résidus
      • Endommager les surfaces
      • Rendre le rinçage plus difficile
      • Polluer l'environnement

      Erreur 4 : Négliger l'entretien des outils
      Des outils sales ne nettoient pas efficacement :
      • Lavez régulièrement les chiffons
      • Désinfectez les éponges
      • Remplacez les brosses usées
      • Nettoyez l'aspirateur

      Erreur 5 : Oublier les zones cachées
      Certaines zones sont souvent négligées :
      • Derrière les meubles
      • Sous les appareils électroménagers
      • Les filtres de climatisation
      • Les joints de carrelage
      • Les interrupteurs et poignées de porte

      Conseils pour un nettoyage efficace :
      • Établissez une routine régulière
      • Utilisez les bons outils pour chaque surface
      • Privilégiez les produits naturels
      • Aérez pendant et après le nettoyage
      • Prenez votre temps pour un travail soigné
    `,
    relatedPosts: [
      {
        title: "Pourquoi l'hygiène domestique influence notre bien-être",
        date: "31 Mars 2022",
        category: "Nettoyage à domicile",
        slug: "hygiene-domestique-bien-etre"
      },
      {
        title: "Un intérieur qui sent toujours bon : mission possible !",
        date: "31 Mars 2022",
        category: "Nettoyage à domicile",
        slug: "interieur-qui-sent-bon"
      }
    ]
  },
  "nettoyage-bureau-efficace": {
    title: "Les secrets d'un nettoyage de bureau efficace",
    author: "Patrick",
    date: "15 Avril 2025",
    category: "Nettoyage professionnel",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1920",
    content: `
      Découvrez les techniques professionnelles pour maintenir un espace de travail impeccable et sain.

      Un bureau propre et bien entretenu est essentiel pour la productivité et le bien-être des employés. Voici les secrets d'un nettoyage professionnel efficace.

      Planification du nettoyage :
      • Établir un planning quotidien, hebdomadaire et mensuel
      • Définir les zones prioritaires
      • Adapter les horaires aux activités du bureau
      • Utiliser des check-lists de vérification

      Techniques professionnelles :
      1. Nettoyage des surfaces de travail :
         • Désinfection des bureaux et postes de travail
         • Nettoyage des écrans et claviers
         • Entretien des zones communes
         • Gestion des déchets et du recyclage

      2. Entretien des sols :
         • Aspiration quotidienne
         • Lavage régulier selon le type de revêtement
         • Traitement spécifique pour chaque surface
         • Protection et entretien préventif

      3. Sanitaires et espaces communs :
         • Nettoyage approfondi des sanitaires
         • Entretien des cuisines et salles de pause
         • Désinfection des points de contact
         • Gestion des fournitures

      Équipements et produits :
      • Utilisation d'équipements professionnels
      • Choix de produits adaptés
      • Respect des normes d'hygiène
      • Formation du personnel

      Conseils pour maintenir la propreté :
      • Impliquer les employés
      • Mettre en place des règles simples
      • Utiliser des panneaux indicateurs
      • Effectuer des contrôles réguliers
    `,
    relatedPosts: [
      {
        title: "Nettoyage des espaces commerciaux : guide complet",
        date: "10 Avril 2025",
        category: "Nettoyage professionnel",
        slug: "nettoyage-espaces-commerciaux"
      },
      {
        title: "Comment organiser son temps de ménage",
        date: "1 Avril 2025",
        category: "Conseils et astuces",
        slug: "organiser-temps-menage"
      }
    ]
  },
  "nettoyage-espaces-commerciaux": {
    title: "Nettoyage des espaces commerciaux : guide complet",
    author: "Patrick",
    date: "10 Avril 2025",
    category: "Nettoyage professionnel",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1920",
    content: `
      Un guide détaillé pour le nettoyage et l'entretien des espaces commerciaux de toutes tailles.

      Le nettoyage des espaces commerciaux nécessite une approche professionnelle et méthodique. Voici un guide complet pour maintenir vos locaux commerciaux impeccables.

      Types d'espaces commerciaux et leurs spécificités :
      • Magasins et boutiques
      • Centres commerciaux
      • Restaurants et cafés
      • Espaces de vente
      • Zones d'accueil

      Plan de nettoyage quotidien :
      1. Ouverture :
         • Nettoyage des entrées
         • Vérification des vitres
         • Préparation des espaces de vente
         • Contrôle des sanitaires

      2. Pendant les heures d'ouverture :
         • Entretien des zones de passage
         • Nettoyage des points de contact
         • Gestion des déchets
         • Maintenance des espaces communs

      3. Fermeture :
         • Nettoyage approfondi
         • Désinfection des surfaces
         • Préparation pour le lendemain
         • Vérification de sécurité

      Techniques spécifiques :
      • Nettoyage des vitrines
      • Entretien des sols commerciaux
      • Gestion des odeurs
      • Traitement des surfaces spéciales

      Équipements recommandés :
      • Aspirateurs professionnels
      • Machines à laver les sols
      • Équipements de désinfection
      • Outils spécialisés

      Conseils pour l'efficacité :
      • Former le personnel
      • Utiliser des produits adaptés
      • Respecter les normes d'hygiène
      • Planifier les interventions
    `,
    relatedPosts: [
      {
        title: "Les secrets d'un nettoyage de bureau efficace",
        date: "15 Avril 2025",
        category: "Nettoyage professionnel",
        slug: "nettoyage-bureau-efficace"
      },
      {
        title: "Les meilleurs produits de nettoyage écologiques",
        date: "25 Mars 2025",
        category: "Produits écologiques",
        slug: "produits-nettoyage-ecologiques"
      }
    ]
  },
  "astuces-nettoyage-rapide": {
    title: "10 astuces pour un nettoyage rapide et efficace",
    author: "Patrick",
    date: "5 Avril 2025",
    category: "Conseils et astuces",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=1920",
    content: `
      Des astuces simples et efficaces pour gagner du temps dans vos tâches de nettoyage quotidiennes.

      Le nettoyage peut parfois sembler une tâche interminable. Voici 10 astuces pour rendre cette activité plus rapide et plus efficace.

      Astuce 1 : Commencer par le haut
      • Dépoussiérer les étagères
      • Nettoyer les plafonds
      • Descendre progressivement
      • Éviter de salir ce qui est déjà propre

      Astuce 2 : Utiliser les bons outils
      • Chiffons microfibres
      • Brosse à dents pour les détails
      • Vaporisateur multi-surfaces
      • Aspirateur avec accessoires

      Astuce 3 : Nettoyer de manière stratégique
      • Diviser la maison en zones
      • Traiter une zone à la fois
      • Suivre un ordre logique
      • Ne pas revenir en arrière

      Astuce 4 : Optimiser les produits
      • Utiliser des produits multi-usages
      • Diluer correctement
      • Éviter les mélanges
      • Privilégier les solutions naturelles

      Astuce 5 : Gérer le temps
      • Définir un temps limite
      • Se concentrer sur l'essentiel
      • Établir des priorités
      • Créer une routine

      Astuce 6 : Prévenir plutôt que guérir
      • Protéger les surfaces
      • Nettoyer régulièrement
      • Agir vite sur les taches
      • Maintenir l'ordre

      Astuce 7 : Utiliser des solutions rapides
      • Vinaigre blanc
      • Bicarbonate de soude
      • Citron
      • Savon de Marseille

      Astuce 8 : Organiser l'espace
      • Ranger régulièrement
      • Désencombrer
      • Avoir une place pour chaque chose
      • Faciliter l'accès

      Astuce 9 : Impliquer toute la famille
      • Répartir les tâches
      • Créer des routines
      • Rendre le nettoyage ludique
      • Encourager la participation

      Astuce 10 : Entretenir régulièrement
      • Nettoyer au fur et à mesure
      • Ne pas laisser s'accumuler
      • Faire un peu chaque jour
      • Maintenir les bonnes habitudes
    `,
    relatedPosts: [
      {
        title: "Comment organiser son temps de ménage",
        date: "1 Avril 2025",
        category: "Conseils et astuces",
        slug: "organiser-temps-menage"
      },
      {
        title: "Comment fabriquer ses produits de nettoyage naturels",
        date: "20 Mars 2025",
        category: "Produits écologiques",
        slug: "fabriquer-produits-naturels"
      }
    ]
  },
  "organiser-temps-menage": {
    title: "Comment organiser son temps de ménage",
    author: "Patrick",
    date: "1 Avril 2025",
    category: "Conseils et astuces",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1920",
    content: `
      Apprenez à planifier et optimiser votre temps de ménage pour un entretien régulier et efficace.

      Une bonne organisation du temps de ménage permet de maintenir un intérieur propre sans y passer tout son temps libre. Voici comment structurer efficacement vos tâches ménagères.

      Planification hebdomadaire :
      1. Tâches quotidiennes (15-30 minutes) :
         • Faire les lits
         • Nettoyer la cuisine
         • Passer l'aspirateur dans les pièces principales
         • Vider les poubelles
         • Ranger le linge

      2. Tâches hebdomadaires (2-3 heures) :
         • Nettoyage complet de la salle de bain
         • Lavage des sols
         • Changement des draps
         • Nettoyage des vitres
         • Désinfection des surfaces

      3. Tâches mensuelles (4-5 heures) :
         • Nettoyage en profondeur
         • Réorganisation des placards
         • Entretien des appareils
         • Nettoyage des zones oubliées

      Conseils d'organisation :
      • Créer un planning visuel
      • Utiliser des applications de gestion
      • Définir des priorités
      • Adapter le planning à son rythme

      Optimisation du temps :
      • Regrouper les tâches similaires
      • Utiliser des produits efficaces
      • Avoir les bons outils à portée de main
      • Éviter les distractions

      Motivation et persévérance :
      • Se fixer des objectifs réalistes
      • Célébrer les petites victoires
      • Créer une ambiance agréable
      • S'accorder des pauses

      Astuces pour gagner du temps :
      • Nettoyer au fur et à mesure
      • Impliquer toute la famille
      • Automatiser certaines tâches
      • Utiliser des solutions rapides
    `,
    relatedPosts: [
      {
        title: "10 astuces pour un nettoyage rapide et efficace",
        date: "5 Avril 2025",
        category: "Conseils et astuces",
        slug: "astuces-nettoyage-rapide"
      },
      {
        title: "Les erreurs à éviter lors du ménage",
        date: "30 Mars 2022",
        category: "Nettoyage à domicile",
        slug: "erreurs-menage"
      }
    ]
  },
  "produits-nettoyage-ecologiques": {
    title: "Les meilleurs produits de nettoyage écologiques",
    author: "Patrick",
    date: "25 Mars 2025",
    category: "Produits écologiques",
    image: "https://images.unsplash.com/photo-1583845112239-97ef1341b271?auto=format&fit=crop&q=80&w=1920",
    content: `
      Découvrez notre sélection des meilleurs produits de nettoyage respectueux de l'environnement.

      Le choix des produits de nettoyage est crucial pour notre santé et l'environnement. Voici un guide complet des meilleures solutions écologiques.

      Critères de sélection :
      • Composition naturelle
      • Biodégradabilité
      • Emballages recyclables
      • Efficacité prouvée
      • Certifications écologiques

      Produits essentiels :
      1. Nettoyants multi-surfaces :
         • Vinaigre blanc
         • Savon noir
         • Bicarbonate de soude
         • Citron
         • Huiles essentielles

      2. Produits spécialisés :
         • Lessive écologique
         • Liquide vaisselle bio
         • Nettoyant pour sols
         • Désinfectant naturel
         • Détartrant écologique

      Marques recommandées :
      • Ecover
      • L'Arbre Vert
      • Etamine du Lys
      • Rainett
      • Sonett

      Avantages des produits écologiques :
      • Respect de l'environnement
      • Sécurité pour la santé
      • Efficacité prouvée
      • Économie à long terme

      Conseils d'utilisation :
      • Suivre les dosages
      • Stocker correctement
      • Recycler les emballages
      • Alterner les produits

      Où acheter :
      • Magasins bio
      • Grandes surfaces
      • Sites spécialisés
      • Vente directe
    `,
    relatedPosts: [
      {
        title: "Comment fabriquer ses produits de nettoyage naturels",
        date: "20 Mars 2025",
        category: "Produits écologiques",
        slug: "fabriquer-produits-naturels"
      },
      {
        title: "L'impact environnemental des produits de nettoyage",
        date: "15 Mars 2025",
        category: "Produits écologiques",
        slug: "impact-environnemental-nettoyage"
      }
    ]
  },
  "fabriquer-produits-naturels": {
    title: "Comment fabriquer ses produits de nettoyage naturels",
    author: "Patrick",
    date: "20 Mars 2025",
    category: "Produits écologiques",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=1920",
    content: `
      Guide pratique pour créer vos propres produits de nettoyage écologiques à la maison.

      Fabriquer ses produits de nettoyage est simple, économique et écologique. Voici un guide complet pour créer vos propres solutions naturelles.

      Ingrédients de base :
      • Vinaigre blanc
      • Bicarbonate de soude
      • Savon de Marseille
      • Cristaux de soude
      • Huiles essentielles
      • Citron
      • Sel
      • Eau

      Recettes de base :
      1. Nettoyant multi-surfaces :
         • 1/3 vinaigre blanc
         • 2/3 eau
         • Quelques gouttes d'huile essentielle
         • Facultatif : zeste de citron

      2. Lessive maison :
         • 50g de savon de Marseille
         • 1L d'eau chaude
         • 1 c. à soupe de bicarbonate
         • 1 c. à soupe de cristaux de soude

      3. Désinfectant naturel :
         • 1/2 tasse de vinaigre blanc
         • 1/2 tasse d'eau
         • 15 gouttes d'huile essentielle de tea tree
         • 15 gouttes d'huile essentielle de lavande

      4. Nettoyant pour sols :
         • 1L d'eau chaude
         • 2 c. à soupe de vinaigre blanc
         • 1 c. à soupe de savon noir
         • Quelques gouttes d'huile essentielle

      Conseils de fabrication :
      • Utiliser des contenants propres
      • Étiqueter les produits
      • Respecter les proportions
      • Tester sur une petite surface

      Stockage et conservation :
      • Garder à l'abri de la lumière
      • Utiliser des contenants hermétiques
      • Conserver au frais
      • Respecter les durées de conservation

      Astuces d'utilisation :
      • Adapter les recettes selon les besoins
      • Tester différentes huiles essentielles
      • Ajuster les dosages
      • Noter les recettes qui fonctionnent
    `,
    relatedPosts: [
      {
        title: "Les meilleurs produits de nettoyage écologiques",
        date: "25 Mars 2025",
        category: "Produits écologiques",
        slug: "produits-nettoyage-ecologiques"
      },
      {
        title: "L'impact environnemental des produits de nettoyage",
        date: "15 Mars 2025",
        category: "Produits écologiques",
        slug: "impact-environnemental-nettoyage"
      }
    ]
  },
  "impact-environnemental-nettoyage": {
    title: "L'impact environnemental des produits de nettoyage",
    author: "Patrick",
    date: "15 Mars 2025",
    category: "Produits écologiques",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1920",
    content: `
      Analyse de l'impact des produits de nettoyage sur l'environnement et solutions alternatives.

      Les produits de nettoyage conventionnels ont un impact significatif sur notre environnement. Comprendre cet impact est essentiel pour faire des choix éclairés.

      Impact sur l'environnement :
      1. Pollution de l'eau :
         • Substances non biodégradables
         • Perturbateurs endocriniens
         • Microplastiques
         • Résidus chimiques

      2. Pollution de l'air :
         • Composés organiques volatils
         • Aérosols
         • Parfums synthétiques
         • Émissions de CO2

      3. Déchets et emballages :
         • Plastiques à usage unique
         • Emballages non recyclables
         • Suremballage
         • Déchets toxiques

      Substances problématiques :
      • Phosphates
      • Chlore
      • Ammoniaque
      • Parabènes
      • Phtalates
      • Tensioactifs pétrochimiques

      Solutions alternatives :
      1. Produits écologiques :
         • Certifiés biologiques
         • Biodégradables
         • Sans substances nocives
         • Emballages recyclables

      2. Produits faits maison :
         • Ingrédients naturels
         • Zéro déchet
         • Économiques
         • Personnalisables

      3. Bonnes pratiques :
         • Utiliser la juste dose
         • Recycler les emballages
         • Choisir des produits concentrés
         • Privilégier les recharges

      Impact sur la santé :
      • Irritations cutanées
      • Problèmes respiratoires
      • Allergies
      • Perturbations hormonales

      Conseils pour réduire l'impact :
      • Lire les étiquettes
      • Choisir des produits certifiés
      • Utiliser des alternatives naturelles
      • Adopter des gestes écoresponsables
    `,
    relatedPosts: [
      {
        title: "Les meilleurs produits de nettoyage écologiques",
        date: "25 Mars 2025",
        category: "Produits écologiques",
        slug: "produits-nettoyage-ecologiques"
      },
      {
        title: "Comment fabriquer ses produits de nettoyage naturels",
        date: "20 Mars 2025",
        category: "Produits écologiques",
        slug: "fabriquer-produits-naturels"
      }
    ]
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const [mounted, setMounted] = useState(false);
  const [isChrome, setIsChrome] = useState(false);
  const post = blogPosts[slug as keyof typeof blogPosts];

  // Fonction pour déterminer la classe de style de la catégorie
  const getCategoryStyle = (category: string) => {
    if (category === "Nettoyage professionnel") {
      return "bg-white/20 text-white backdrop-blur-sm";
    }
    return "bg-white/10 backdrop-blur-sm text-white";
  };

  useEffect(() => {
    // Détection de Chrome
    const isChromeBrowser = /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent);
    setIsChrome(isChromeBrowser);
    setMounted(true);

    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-eco-green-50">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-eco-green-800 mb-4">
            Article non trouvé
          </h1>
          <p className="text-eco-green-600 mb-8">
            Désolé, l'article que vous recherchez n'existe pas ou a été déplacé.
          </p>
          <Link to="/blog">
            <Button variant="default" size="lg">
              Retour au blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-eco-green-50/30 pt-24">
      {/* Hero Section */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${post.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`max-w-4xl mx-auto text-center ${isChrome ? 'will-change-transform' : ''}`}>
              <div className={`inline-flex items-center px-4 py-2 rounded-full font-medium text-sm mb-4 ${getCategoryStyle(post.category)}`}>
                {post.category}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link to="/blog">
              <Button variant="ghost" className="gap-2 group">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Retour au blog
              </Button>
            </Link>
            <Button variant="ghost" className="gap-2">
              <Share2 className="h-4 w-4" />
              Partager
            </Button>
          </div>

          <article className={`prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-eco-green-600 prose-strong:text-gray-900 prose-ul:text-gray-600 ${isChrome ? 'will-change-transform' : ''}`}>
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>

          {/* Related Posts */}
          <div className={`mt-16 pt-8 border-t border-gray-200 ${isChrome ? 'will-change-transform' : ''}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles similaires</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {post.relatedPosts.map((relatedPost, index) => (
                <Link
                  key={index}
                  to={`/blog/${relatedPost.slug}`}
                  className="group block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className={`text-sm mb-2 ${relatedPost.category === "Nettoyage professionnel" ? "text-white bg-eco-green-600 px-3 py-1 rounded-full inline-block" : "text-eco-green-600"}`}>
                    {relatedPost.category}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-eco-green-600 transition-colors duration-300 mb-2">
                    {relatedPost.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{relatedPost.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost; 