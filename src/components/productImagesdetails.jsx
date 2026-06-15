// Import Images 

import BlackYellowShirt from "./ProductImages/Balck_yellow_shirt.webp";
import BlackJacket from "./ProductImages/Black_Jaket.webp";
import BlackTshirt from "./ProductImages/Black_tshirt.webp";
import BrownLeatherJacket from "./ProductImages/Brown_lether_jaket.webp";
import BurgundyPurpleTshirt from "./ProductImages/Burgundy_Purple_Tshirt.webp";
import CasualBlackTshirt from "./ProductImages/casual_black_Tshirt.webp";
import CasualWhiteTshirt from "./ProductImages/Casual-white-Tshirt.webp";

import CoralPinkPrintedPalazzoSuit from "./ProductImages/Coral Pink Printed Palazzo Suit.webp";
import DeepWineEmbroideredShararaSuit from "./ProductImages/Deep Wine Embroidered Sharara Suit.webp";

import FormalLightBluePant from "./ProductImages/Formal_light_blue_Pant.webp";
import GreenYellowTshirt from "./ProductImages/Green-yellow_Tshirt.webp";
import JacketWoman from "./ProductImages/jaket_woman.webp";
import Jeans from "./ProductImages/Jeans.webp";

import LavenderCottonKurtaPantSuit from "./ProductImages/Lavender Cotton Kurta Pant Suit.webp";
import LightBrownJacket from "./ProductImages/Light_Brown_jaket.webp";
import LightGrayTshirt from "./ProductImages/Light_gray_Tshirt.webp";
import LightGreenShirt from "./ProductImages/Light_green_shirt.webp";

import ModernJeans from "./ProductImages/Moder_jeans.webp";
import MustardYellowAnarkaliSuit from "./ProductImages/Mustard Yellow Anarkali Suit.webp";
import OliveFitDress from "./ProductImages/Oliv-fit-dress.webp";
import PinkPrintShirt from "./ProductImages/Pink_print_shirt.webp";

import RaniPinkSilkStraightSuit from "./ProductImages/Rani Pink Silk Straight Suit.webp";
import RedWhiteJacket from "./ProductImages/Reb_white_jaket.webp";
import RedFeatherTshirt from "./ProductImages/Red_fether_Tshhirt.webp";

import Shirt from "./ProductImages/Shirt.webp";
import Trouser from "./ProductImages/Trousher.webp";
import WhiteGreenPrintShirt from "./ProductImages/White_greenPrint_Shirt.webp";
import WhitePrintShirt from "./ProductImages/White_print_shirt.webp";
import WhiteWomanPant from "./ProductImages/White_woman_pant.webp";
import WhiteTshirt from "./ProductImages/White-Tshirt.webp";
import YellowPrintShirt from "./ProductImages/Yellow_print_shirt.webp";
import YellowWhiteJacket from "./ProductImages/Yellow_white_jaket.webp";


import img11 from "./images/11.webp";
import img12 from "./images/12.webp";
import img13 from "./images/13.webp";
import img14 from "./images/14.webp";
import img15 from "./images/15.webp";
import img16 from "./images/16.webp";
import img17 from "./images/17.webp";
import img18 from "./images/18.webp";
import img19 from "./images/19.webp";
import img20 from "./images/20.webp";

import trendin1 from "./ProductImages/trending1.webp";
import trendin2 from "./ProductImages/trending2.webp";
import trendin3 from "./ProductImages/trending3.webp";
import trendin4 from "./ProductImages/trending4.webp";
import trendin5 from "./ProductImages/trending5.webp";


export const trending = [
  {
    id: 36,
    name: "Black leather Jaket",
    price: "₹999",
    oldprice: "₹1,299",
    img: trendin1,
  },
  {
    id: 37,
    name: "Balck Skull Hand T-Shirt",
    price: "₹2,999",
    oldprice: "₹3,499",
    img: trendin2,
  },
  {
    id: 38,
    name: "Balck log angales T-Shirt",
    price: "₹1,799",
    oldprice: "₹2,199",
    img: trendin3,
  },
  {
    id: 39,
    name: "Eco Linen Shirt",
    price: "₹1,499",
    oldprice: "₹1,899",
    img: trendin4,
  },
  {
    id: 40,
    name: "Red Cotton dress",
    price: "₹1,199",
    oldprice: "₹1,599",
    img: trendin5,
  }
];


export const HomeCarouselImages = [
  { id: 1, image: img11 },
  { id: 2, image: img12 },
  { id: 3, image: img13 },
  { id: 4, image: img14 },
  { id: 5, image: img15 },
  { id: 6, image: img16 },
  { id: 7, image: img17 },
  { id: 8, image: img18 },
  { id: 9, image: img19 },
  { id: 10, image: img20 },
];



export const reviews = [
  { name: "Aarav Sharma", text: "Amazing quality & super comfortable!", stars: 5 },
  { name: "Priya Verma", text: "Eco-friendly and stylish. Love it!", stars: 5 },
  { name: "Rahul Mehta", text: "Fast delivery & excellent fabric!", stars: 4 },
  { name: "Sneha Kapoor", text: "Soft, breathable & sustainable.", stars: 5 },
];

export const products = [
  // ================= MEN – JACKETS =================
  {
    id: 1,
    name: "Black & Yellow Bomber Jacket",
    slug: "black-yellow-bomber-jacket",
    price: 1499,
    oldprice: 1899,
    image: BlackYellowShirt,
    images: [BlackYellowShirt, BlackYellowShirt],
    category: "men",
    subCategory: "jacket",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Yellow"],
    stock: 12,
    rating: 4.6,
  },
  {
    id: 2,
    name: "Classic Black Jacket",
    slug: "classic-black-jacket",
    price: 2399,
    oldprice: 2799,
    image: BlackJacket,
    images: [BlackJacket, BlackJacket],
    category: "men",
    subCategory: "jacket",
    sizes: ["M", "L", "XL"],
    colors: ["Black"],
    stock: 8,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Brown Leather Jacket",
    slug: "brown-leather-jacket",
    price: 2599,
    oldprice: 2999,
    image: BrownLeatherJacket,
    images: [BrownLeatherJacket, BrownLeatherJacket],
    category: "men",
    subCategory: "jacket",
    sizes: ["M", "L", "XL"],
    colors: ["Brown"],
    stock: 6,
    rating: 4.8,
  },
  {
    id: 4,
    name: "Light Brown Jacket",
    slug: "light-brown-jacket",
    price: 2199,
    oldprice: 2599,
    image: LightBrownJacket,
    images: [LightBrownJacket, LightBrownJacket],
    category: "men",
    subCategory: "jacket",
    sizes: ["M", "L", "XL"],
    colors: ["Brown"],
    stock: 7,
    rating: 4.5,
  },
  {
    id: 5,
    name: "Yellow White Jacket",
    slug: "yellow-white-jacket",
    price: 1999,
    oldprice: 2399,
    image: YellowWhiteJacket,
    images: [YellowWhiteJacket, YellowWhiteJacket],
    category: "men",
    subCategory: "jacket",
    sizes: ["S", "M", "L"],
    colors: ["Yellow", "White"],
    stock: 9,
    rating: 4.4,
  },

  // ================= MEN – TSHIRTS =================
  {
    id: 6,
    name: "Black T-Shirt",
    slug: "black-tshirt",
    price: 499,
    oldprice: 599,
    image: BlackTshirt,
    images: [BlackTshirt, BlackTshirt],
    category: "men",
    subCategory: "tshirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    stock: 30,
    rating: 4.4,
  },
  {
    id: 7,
    name: "Casual Black T-Shirt",
    slug: "casual-black-tshirt",
    price: 499,
    oldprice: 599,
    image: CasualBlackTshirt,
    images: [CasualBlackTshirt, CasualBlackTshirt],
    category: "men",
    subCategory: "tshirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    stock: 28,
    rating: 4.3,
  },
  {
    id: 8,
    name: "Casual White T-Shirt",
    slug: "casual-white-tshirt",
    price: 499,
    oldprice: 599,
    image: CasualWhiteTshirt,
    images: [CasualWhiteTshirt, CasualWhiteTshirt],
    category: "men",
    subCategory: "tshirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    stock: 35,
    rating: 4.5,
  },
  {
    id: 9,
    name: "Burgundy Purple T-Shirt",
    slug: "burgundy-purple-tshirt",
    price: 549,
    oldprice: 649,
    image: BurgundyPurpleTshirt,
    images: [BurgundyPurpleTshirt, BurgundyPurpleTshirt],
    category: "men",
    subCategory: "tshirt",
    sizes: ["S", "M", "L"],
    colors: ["Burgundy"],
    stock: 18,
    rating: 4.6,
  },
  {
    id: 10,
    name: "Light Gray T-Shirt",
    slug: "light-gray-tshirt",
    price: 499,
    oldprice: 599,
    image: LightGrayTshirt,
    images: [LightGrayTshirt, LightGrayTshirt],
    category: "men",
    subCategory: "tshirt",
    sizes: ["S", "M", "L"],
    colors: ["Gray"],
    stock: 22,
    rating: 4.4,
  },

  // ================= MEN – JEANS / PANTS =================
  {
    id: 11,
    name: "Classic Jeans",
    slug: "classic-jeans",
    price: 1299,
    oldprice: 1599,
    image: Jeans,
    images: [Jeans, Jeans],
    category: "men",
    subCategory: "jeans",
    sizes: ["30", "32", "34", "36"],
    colors: ["Blue"],
    stock: 20,
    rating: 4.5,
  },
  {
    id: 12,
    name: "Modern Fit Jeans",
    slug: "modern-fit-jeans",
    price: 1399,
    oldprice: 1699,
    image: ModernJeans,
    images: [ModernJeans, ModernJeans],
    category: "men",
    subCategory: "jeans",
    sizes: ["30", "32", "34", "36"],
    colors: ["Blue"],
    stock: 18,
    rating: 4.6,
  },
  {
    id: 13,
    name: "Formal Light Blue Pant",
    slug: "formal-light-blue-pant",
    price: 1199,
    oldprice: 1499,
    image: FormalLightBluePant,
    images: [FormalLightBluePant, FormalLightBluePant],
    category: "men",
    subCategory: "trouser",
    sizes: ["30", "32", "34", "36"],
    colors: ["Light Blue"],
    stock: 16,
    rating: 4.4,
  },

  // ================= WOMEN – SUITS =================
  {
    id: 14,
    name: "Mustard Yellow Anarkali Suit",
    slug: "mustard-yellow-anarkali-suit",
    price: 1899,
    oldprice: 2199,
    image: MustardYellowAnarkaliSuit,
    images: [MustardYellowAnarkaliSuit, MustardYellowAnarkaliSuit],
    category: "women",
    subCategory: "suit",
    sizes: ["S", "M", "L"],
    colors: ["Mustard"],
    stock: 10,
    rating: 4.8,
  },
  {
    id: 15,
    name: "Coral Pink Printed Palazzo Suit",
    slug: "coral-pink-palazzo-suit",
    price: 1799,
    oldprice: 2099,
    image: CoralPinkPrintedPalazzoSuit,
    images: [CoralPinkPrintedPalazzoSuit, CoralPinkPrintedPalazzoSuit],
    category: "women",
    subCategory: "suit",
    sizes: ["S", "M", "L"],
    colors: ["Coral Pink"],
    stock: 9,
    rating: 4.6,
  },
  {
    id: 16,
    name: "Rani Pink Silk Straight Suit",
    slug: "rani-pink-silk-suit",
    price: 2099,
    oldprice: 2399,
    image: RaniPinkSilkStraightSuit,
    images: [RaniPinkSilkStraightSuit, RaniPinkSilkStraightSuit],
    category: "women",
    subCategory: "suit",
    sizes: ["S", "M", "L"],
    colors: ["Pink"],
    stock: 8,
    rating: 4.7,
  },
  {
    id: 17,
    name: "Deep Wine Sharara Suit",
    slug: "deep-wine-sharara-suit",
    price: 2299,
    oldprice: 2599,
    image: DeepWineEmbroideredShararaSuit,
    images: [DeepWineEmbroideredShararaSuit, DeepWineEmbroideredShararaSuit],
    category: "women",
    subCategory: "suit",
    sizes: ["S", "M", "L"],
    colors: ["Wine"],
    stock: 6,
    rating: 4.9,
  },

  // ================= WOMEN – KURTA / DRESS =================
  {
    id: 18,
    name: "Lavender Cotton Kurta Pant Suit",
    slug: "lavender-cotton-kurta-set",
    price: 1599,
    oldprice: 1899,
    image: LavenderCottonKurtaPantSuit,
    images: [LavenderCottonKurtaPantSuit, LavenderCottonKurtaPantSuit],
    category: "women",
    subCategory: "kurta",
    sizes: ["S", "M", "L"],
    colors: ["Lavender"],
    stock: 12,
    rating: 4.6,
  },
  {
    id: 19,
    name: "Olive Fit Dress",
    slug: "olive-fit-dress",
    price: 1399,
    oldprice: 1699,
    image: OliveFitDress,
    images: [OliveFitDress, OliveFitDress],
    category: "women",
    subCategory: "dress",
    sizes: ["S", "M", "L"],
    colors: ["Olive"],
    stock: 10,
    rating: 4.5,
  },


  // ================= MEN – SHIRTS =================
  {
    id: 23,
    name: "Light Green Casual Shirt",
    slug: "light-green-casual-shirt",
    price: 899,
    oldprice: 1099,
    image: LightGreenShirt,
    images: [LightGreenShirt, LightGreenShirt],
    category: "men",
    subCategory: "shirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Green"],
    stock: 18,
    rating: 4.4,
  },
  {
    id: 24,
    name: "Green & Yellow Printed T-Shirt",
    slug: "green-yellow-printed-tshirt",
    price: 549,
    oldprice: 699,
    image: GreenYellowTshirt,
    images: [GreenYellowTshirt, GreenYellowTshirt],
    category: "men",
    subCategory: "tshirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Green", "Yellow"],
    stock: 22,
    rating: 4.5,
  },
  {
    id: 25,
    name: "White Printed Shirt",
    slug: "white-printed-shirt",
    price: 799,
    oldprice: 999,
    image: WhitePrintShirt,
    images: [WhitePrintShirt, WhitePrintShirt],
    category: "men",
    subCategory: "shirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    stock: 20,
    rating: 4.3,
  },
  {
    id: 26,
    name: "White & Green Printed Shirt",
    slug: "white-green-printed-shirt",
    price: 849,
    oldprice: 1049,
    image: WhiteGreenPrintShirt,
    images: [WhiteGreenPrintShirt, WhiteGreenPrintShirt],
    category: "men",
    subCategory: "shirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Green"],
    stock: 17,
    rating: 4.4,
  },
  {
    id: 27,
    name: "Yellow Printed Shirt",
    slug: "yellow-printed-shirt",
    price: 849,
    oldprice: 1049,
    image: YellowPrintShirt,
    images: [YellowPrintShirt, YellowPrintShirt],
    category: "men",
    subCategory: "shirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Yellow"],
    stock: 16,
    rating: 4.5,
  },

  // ================= WOMEN – TOPS / PANTS =================
  {
    id: 28,
    name: "Pink Printed Top",
    slug: "pink-printed-top",
    price: 699,
    oldprice: 899,
    image: PinkPrintShirt,
    images: [PinkPrintShirt, PinkPrintShirt],
    category: "women",
    subCategory: "top",
    sizes: ["S", "M", "L"],
    colors: ["Pink"],
    stock: 19,
    rating: 4.6,
  },
  {
    id: 29,
    name: "White Women's Pant",
    slug: "white-womens-pant",
    price: 999,
    oldprice: 1199,
    image: WhiteWomanPant,
    images: [WhiteWomanPant, WhiteWomanPant],
    category: "women",
    subCategory: "pant",
    sizes: ["S", "M", "L"],
    colors: ["White"],
    stock: 14,
    rating: 4.4,
  },

  // ================= UNISEX =================
  {
    id: 30,
    name: "Classic White T-Shirt",
    slug: "classic-white-tshirt",
    price: 499,
    oldprice: 599,
    image: WhiteTshirt,
    images: [WhiteTshirt, WhiteTshirt],
    category: "unisex",
    subCategory: "tshirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    stock: 40,
    rating: 4.6,
  },
  {
    id: 31,
    name: "Red Feather Graphic T-Shirt",
    slug: "red-feather-graphic-tshirt",
    price: 599,
    oldprice: 799,
    image: RedFeatherTshirt,
    images: [RedFeatherTshirt, RedFeatherTshirt],
    category: "men",
    subCategory: "tshirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red"],
    stock: 21,
    rating: 4.5,
  },

  // ================= WOMEN – OUTERWEAR =================
  {
    id: 32,
    name: "Red & White Casual Jacket",
    slug: "red-white-casual-jacket",
    price: 1899,
    oldprice: 2199,
    image: RedWhiteJacket,
    images: [RedWhiteJacket, RedWhiteJacket],
    category: "women",
    subCategory: "jacket",
    sizes: ["S", "M", "L"],
    colors: ["Red", "White"],
    stock: 11,
    rating: 4.6,
  },

  {
    id: 33,
    name: "Women's Casual Jacket",
    slug: "womens-casual-jacket",
    price: 1799,
    oldprice: 2099,
    image: JacketWoman,
    images: [JacketWoman, JacketWoman],
    category: "women",
    subCategory: "jacket",
    description: "Stylish women's casual jacket for everyday wear.",
    sizes: ["S", "M", "L"],
    colors: ["Black"],
    stock: 10,
    rating: 4.5,
  },
  {
    id: 34,
    name: "Men's Classic Shirt",
    slug: "mens-classic-shirt",
    price: 899,
    oldprice: 1099,
    image: Shirt,
    images: [Shirt, Shirt],
    category: "men",
    subCategory: "shirt",
    description: "Classic men's shirt suitable for casual and formal wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Grey"],
    stock: 20,
    rating: 4.4,
  },
  {
    id: 35,
    name: "Men's Regular Fit Trouser",
    slug: "mens-regular-fit-trouser",
    price: 1199,
    oldprice: 1499,
    image: Trouser,
    images: [Trouser, Trouser],
    category: "men",
    subCategory: "trouser",
    description: "Comfortable regular fit trousers for office and casual use.",
    sizes: ["30", "32", "34", "36"],
    colors: ["Olive"],
    stock: 15,
    rating: 4.3,
  },

  {
    id: 36,
    name: "Black Leather Jacket",
    slug: "black-leather-jacket",
    price: 999,
    oldprice: 1299,
    image: trendin1,
    images: [trendin1, trendin1],
    category: "men",
    subCategory: "jacket",
    description:
      "Stylish black leather jacket designed for a bold and modern look. Perfect for casual outings and winter wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    stock: 12,
    rating: 4.6,
  },

  {
    id: 37,
    name: "Black Skull Hand T-Shirt",
    slug: "black-skull-hand-tshirt",
    price: 2999,
    oldprice: 3499,
    image: trendin2,
    images: [trendin2, trendin2],
    category: "men",
    subCategory: "tshirt",
    description:
      "Premium cotton t-shirt featuring a bold skull hand graphic. Soft fabric and durable print for everyday wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    stock: 20,
    rating: 4.4,
  },

  {
    id: 38,
    name: "Black Long Angles T-Shirt",
    slug: "black-long-angles-tshirt",
    price: 1799,
    oldprice: 2199,
    image: trendin3,
    images: [trendin3, trendin3],
    category: "men",
    subCategory: "tshirt",
    description:
      "Modern black t-shirt with long angled graphic design. Lightweight, breathable, and perfect for streetwear style.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    stock: 18,
    rating: 4.2,
  },

  {
    id: 39,
    name: "Eco Linen Shirt",
    slug: "eco-linen-shirt",
    price: 1499,
    oldprice: 1899,
    image: trendin4,
    images: [trendin4, trendin4],
    category: "men",
    subCategory: "shirt",
    description:
      "Eco-friendly linen shirt crafted from breathable fabric. Ideal for summer wear with a clean and minimal look.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "White"],
    stock: 14,
    rating: 4.5,
  },

  {
    id: 40,
    name: "Red Cotton Dress",
    slug: "red-cotton-dress",
    price: 1199,
    oldprice: 1599,
    image: trendin5,
    images: [trendin5, trendin5],
    category: "women",
    subCategory: "dress",
    description:
      "Elegant red cotton dress made for comfort and style. Soft fabric with a flattering fit for daily and festive wear.",
    sizes: ["S", "M", "L"],
    colors: ["Red"],
    stock: 10,
    rating: 4.7,
  },



];




