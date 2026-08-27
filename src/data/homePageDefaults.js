import Banner1 from "../assets/Banner-1.webp";
import Banner2 from "../assets/Banner-2.webp";
import Banner3 from "../assets/Banner-3.webp";

import SkincareImage from "../assets/Category-Skincare.webp";
import HaircareImage from "../assets/Category-Haircare.webp";
import FragranceImage from "../assets/Category-Fragrance.webp";
import AccessoriesImage from "../assets/Category-Accessories.webp";

import WhyChooseImage from "../assets/why-choose-us.jpg";
import NewsletterImage from "../assets/newsletter-bottle.png";

import floatingProducts from "./FloatingProducts";
import reviews from "./Reviews";

const defaultHomePageSettings = {
  hero: {
    slides: [
      {
        id: "hero-1",
        image: Banner1,
        title: "Calm",
        subtitle: "your skin's new normal",
        buttonLabel: "Shop Now",
        buttonLink: "/shop",
        contentPosition: "right",
      },
      {
        id: "hero-2",
        image: Banner2,
        title: "",
        subtitle: "",
        buttonLabel: "",
        buttonLink: "/shop",
        contentPosition: "center",
      },
      {
        id: "hero-3",
        image: Banner3,
        title: "Luxury\nFragrances",
        subtitle: "Discover scents that leave\na lasting impression.",
        buttonLabel: "Explore Collection",
        buttonLink: "/shop",
        contentPosition: "left",
      },
    ],
  },

  categories: {
    eyebrow: "Shop By Categories",
    heading: "Popular Categories",
    items: [
      {
        id: "category-1",
        title: "Skin Care",
        image: SkincareImage,
        link: "/shop",
      },
      {
        id: "category-2",
        title: "Hair Care",
        image: HaircareImage,
        link: "/shop",
      },
      {
        id: "category-3",
        title: "Fragrances",
        image: FragranceImage,
        link: "/shop",
      },
      {
        id: "category-4",
        title: "Accessories",
        image: AccessoriesImage,
        link: "/shop",
      },
    ],
  },

  whyChoose: {
    eyebrow: "Why GlowCare",
    title: "Your Skin Deserves\nThe Best Care.",
    description:
      "Discover premium skincare crafted with carefully selected ingredients, backed by science, and designed to bring healthy, radiant skin every day.",
    image: WhyChooseImage,
    trustTitle: "Trusted By 10,000+",
    trustSubtitle: "Happy GlowCare Customers",

    features: [
      {
        id: "01",
        title: "Clean Ingredients",
        description:
          "Made with carefully selected ingredients that nourish and protect your skin without harsh chemicals.",
      },
      {
        id: "02",
        title: "Dermatologist Tested",
        description:
          "Every formula is tested for safety and designed to suit all skin types for everyday use.",
      },
      {
        id: "03",
        title: "Cruelty Free",
        description:
          "We never test on animals and believe skincare should be kind to both people and nature.",
      },
    ],
  },

  floatingShowcase: {
    eyebrow: "GlowCare Collection",
    title: "Healthy Skin\nStarts Here",
    description:
      "Discover premium skincare crafted with clean ingredients, dermatologist-tested formulas, and luxurious textures that transform your daily routine.",
    buttonLabel: "Explore Collection",
    buttonLink: "/shop",

    items: floatingProducts.map((product) => ({
      ...product,
    })),
  },

  newsletter: {
    eyebrow: "Exclusive Community",
    title: "Join The\nGlow Circle",
    description:
      "Become a part of our GlowCare family and receive exclusive product launches, skincare tips, member-only offers, and expert beauty advice delivered straight to your inbox.",
    image: NewsletterImage,
    placeholder: "Enter your email address",
    buttonLabel: "Subscribe",
    note: "✨ Join 15,000+ skincare lovers already in the Glow Circle.",
  },

  reviews: {
    eyebrow: "Customer Reviews",
    heading: "Loved By Thousands",
    description:
      "Hear what our customers have to say about their GlowCare experience and discover why thousands trust our skincare products every day.",

    items: reviews.map((review) => ({
      ...review,
    })),
  },
};

const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const mergeSettings = (defaults, saved) => {
  if (Array.isArray(defaults)) {
    if (!Array.isArray(saved) || saved.length === 0) {
      return defaults.map((item) => mergeSettings(item, undefined));
    }

    return saved.map((item, index) =>
      mergeSettings(defaults[index] ?? {}, item),
    );
  }

  if (isObject(defaults)) {
    const savedObject = isObject(saved) ? saved : {};
    const merged = {};

    Object.keys(defaults).forEach((key) => {
      merged[key] = mergeSettings(defaults[key], savedObject[key]);
    });

    Object.keys(savedObject).forEach((key) => {
      if (!(key in merged)) {
        merged[key] = savedObject[key];
      }
    });

    return merged;
  }

  return saved === undefined ? defaults : saved;
};

// Gives a safe copy of the original homepage design
export const getDefaultHomePageSettings = () =>
  mergeSettings(defaultHomePageSettings, undefined);

// Combines saved changes with any default fields that are missing
export const mergeHomePageSettings = (savedSettings) =>
  mergeSettings(defaultHomePageSettings, savedSettings);