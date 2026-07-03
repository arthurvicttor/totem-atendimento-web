import type { Category, Product } from "@/types";

export const mockCategories: Category[] = [
  {
    id: "hamburgueres",
    name: "Hambúrgueres",
    slug: "hamburgueres",
    icon: "lunch_dining",
  },
  {
    id: "acompanhamentos",
    name: "Acompanhamentos",
    slug: "acompanhamentos",
    icon: "restaurant",
  },
  { id: "bebidas", name: "Bebidas", slug: "bebidas", icon: "local_drink" },
  {
    id: "sobremesas",
    name: "Sobremesas",
    slug: "sobremesas",
    icon: "icecream",
  },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "The Grand Sizzle",
    description:
      "Carne wagyu dupla, cheddar maturado, molho snap-back e picles da casa.",
    price: 14.5,
    categoryId: "hamburgueres",
    ingredients: [],
    available: true,
    featured: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuADGLOWF22YxhAg_-0JwRWxwhdE_ZMTG3Hs1WxO73n8T_RqLqAoiAF2VrT41PGV9lidT7CucgXoxvPt-KKMdbpvqDG9O1VoE_0MDhARizjLFpOIw9sv6j-cSHVkjoRQTmrTjFlmcsz2IxPnBz1wYflWZTYYZOtkqaLRqUT_vx591eTtX_U_-tg9B-WmRGSIorvbxlgdnHBe5-aNekD4Z9hNRzOzTreu-EsIxvy7UuMsQZx0hipzxwoKg0PGY-awJEA3CGXZQRjykQ4",
  },
  {
    id: "2",
    name: "Avocado Snap",
    description:
      "Frango grelhado na brasa, abacate fresco, brotos e glaze de mel e mostarda.",
    price: 12.75,
    categoryId: "hamburgueres",
    ingredients: [],
    available: true,
    featured: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCxRRSEIGroRy-4KyrvU25iu3qrlHokj_XHVOmnLXxdBOH0-EFZA0S02sSoQv3oE7O1U34K-oz60OLxGSrVQ77tVrow0btWTg0XyMwf4sGuDVashgtjpJ3jzMCg3AO_jmnzD2KOBINW5Aitg43Nn4-nUnqr4q8g6BIzcQQpyhmbkEcwiDDT8Y5uFZALAke5DuR4x1A-cM6xg2hSx4v7muVwggxbf9hkcaDI-uY7FgGOOgO3hvgg5_jOg1pzUEntsQSzUHqRA-eOyck",
  },
  {
    id: "3",
    name: "Earth Shaker",
    description:
      "Hambúrguer vegetal premium, pimentões assados, aioli vegano e mini rúcula.",
    price: 15.25,
    categoryId: "hamburgueres",
    ingredients: [],
    available: true,
    featured: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4wJOeahVjHhmj_Gs7JahJDXh4ZOfOd6Ooq8GzT2sqXZdmXdSxz3wSNRy4G8WLMXR6fFa5CfVIunT2fShPXTBEU7Dg3r_pQRk3icqwbKhhraqsNlP9wjrGriQYNmic1jOwgsxWxftgusadAsulDpJIYFgTCyozI4wYla4a4M0V3bm78My6vCqt-iXQN8bfjSrM5C-5I3eDUp-VMJFv1SFs4l_nJoYKKrnJ2MZSTwtlE6jvpE-EH67QlhN0dT8x11KXBQFMzsOspEo",
  },
  {
    id: "4",
    name: "Bacon Bliss",
    description:
      "Triplo hambúrguer bovino, bacon defumado, queijo extra e infusão de BBQ.",
    price: 16.0,
    categoryId: "hamburgueres",
    ingredients: [],
    available: true,
    featured: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKJambMOpvze50f1cUXiB9JSSlliekvx9Awt569aZSEesSkGggTY7lx7rnx4R3Dkf5o4U5BNEdrSsMC_xkfg5CBnymdd0r4rYPpowNWLvph8gqNmE2ZRsThaXyE37bnfn9LPwO03_Ah3D6C0JL4hD6Mt7ua17lx0vfPHRaXoAP3MoDmddEtErw4riGcFdq18tFQdpYbNOt3syUL7qyS0sBJf3V-kvFbDdtQe3vkU7YKfrSoh31ajr2FrVVpzYt4QFm3ufINeH3LKM",
  },
  {
    id: "5",
    name: "Smash Classic",
    description:
      "Dois hambúrgueres smash, cebola grelhada, mostarda e queijo americano.",
    price: 11.5,
    categoryId: "hamburgueres",
    ingredients: [],
    available: true,
    featured: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD711OE2lka1qYXg5iVDxm8p6uc4GPhPUBi5yETCKRCgAMlJ1y1l1iIosBGXcsqf8HOGWVf1fit6WQzVn-tS3y2yTbBfKEuXcNmPkzPx1khia6kWSaQs1OjpxtibRG0Rec1aMURv8hA-QgCLMJuOwPUQKrAR73yyKSNlcdxlh6YkikdCeYpH1aA5K37WbNMYHlXtRyacRgSAVZHWxN70FKDGz28goON806j6imXeRl1tTHzSlbXPm4grUwIAP7X8xx8S3E_Hg",
  },
  {
    id: "6",
    name: "Blue Velvet",
    description:
      "Carne wagyu, pedaços de gorgonzola, redução balsâmica e alho-poró frito.",
    price: 15.95,
    categoryId: "hamburgueres",
    ingredients: [],
    available: true,
    featured: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuABzL9O7724UWxtiWDhW94NitLWBIN9pRrMFNBuB9vptAyRNCdsCVD5jXY-ak4nIiskGLVypYqhMXEpiIDPDJg4053kiQUFWTWV8FUiCamLCylFxjlftqSuXfQCcvO2ByjUcfBzc2NOKKqWBXbucIppJOFH_kY7iWcCdTg3kMs8Qu4SzmKJ-pnzIilxnmxoc5bSPed5UQ8OJWGmvKzVK-_-eCchckYlYIHqjD30u7b0TzCAWqe6EqFlt-qyd1F8sOm79tKw2YCnxtY",
  },
];
