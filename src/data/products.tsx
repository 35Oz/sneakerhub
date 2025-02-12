import { Product } from '../types';
import shoe1 from '../assets/images/Air Jordan 1 Retro High.webp';
import shoe2 from '../assets/images/Nike Air Max 90.webp';
import shoe3 from '../assets/images/Adidas Ultra Boost.webp';
import shoe4 from '../assets/images/Nike Kobe 6 Protro.webp';
import shoe5 from '../assets/images/Yeezy Boost 350 V2.webp';
import shoe6 from '../assets/images/Nike LeBron 20.webp';
import shoe7 from '../assets/images/New Balance 990v5.webp';
import shoe8 from '../assets/images/Air Jordan 11 Retro.webp';
import shoe9 from '../assets/images/Nike Air Force 1.webp';
import shoe10 from '../assets/images/Converse Chuck Taylor All-Star.webp';
import shoe11 from '../assets/images/Nike Zoom Alphafly NEXT.webp';
import shoe12 from '../assets/images/Air Jordan 4 Retro.webp';

export const products: Product[] = [
  {
    id: 1,
    name: "Air Jordan 1 Retro High",
    price: 299.99,
    image: shoe1,
    category: "men",
    style: "fashion",
    description: "Las icónicas Air Jordan 1 High que lo iniciaron todo. Cuenta con una construcción de cuero de primera calidad, amortiguación Air y la clásica silueta de caña alta que revolucionó la cultura de las zapatillas.",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    colors: [
      { name: "Chicago Red", hex: "#CE1141" },
      { name: "Royal Blue", hex: "#0047AB" },
      { name: "Bred", hex: "#000000" }
    ],
  },
  {
    id: 2,
    name: "Nike Air Max 90",
    price: 189.99,
    image: shoe2,
    category: "men",
    style: "running",
    description: "Las atemporales Air Max 90 con amortiguación Air visible. Cuenta con una parte superior de malla transpirable, la icónica suela Waffle y la legendaria unidad Air Max para una comodidad superior.",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: [
      { name: "Triple White", hex: "#FFFFFF" },
      { name: "Infrared", hex: "#FF6B6B" },
      { name: "Black/Grey", hex: "#333333" }
    ]
  },
  {
    id: 3,
    name: "Adidas Ultra Boost",
    price: 219.99,
    image: shoe3,
    category: "women",
    style: "running",
    description: "Revolucionarias zapatillas de running con tecnología Boost para un retorno de energía inigualable. Cuenta con la parte superior Primeknit, la entresuela Boost receptiva y la suela de goma Continental™.",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: [
      { name: "Core Black", hex: "#000000" },
      { name: "Cloud White", hex: "#FFFFFF" },
      { name: "Solar Red", hex: "#FF0000" }
    ]
  },
  {
    id: 4,
    name: "Nike Kobe 6 Protro",
    price: 249.99,
    image: shoe4,
    category: "men",
    style: "sport",
    description: "Zapatillas de baloncesto de alto rendimiento con amortiguación Zoom Air. Cuenta con un diseño superior escamado, amortiguación receptiva y excelente agarre a la cancha.",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: [
      { name: "Grinch", hex: "#39FF14" },
      { name: "Mamba Forever", hex: "#552583" },
      { name: "All-Star", hex: "#FF69B4" }
    ]
  },
  {
    id: 5,
    name: "Yeezy Boost 350 V2",
    price: 279.99,
    image: shoe5,
    category: "men",
    style: "fashion",
    description: "Las icónicas Yeezy Boost con parte superior Primeknit y amortiguación Boost de longitud completa. Cuenta con una franja lateral distintiva y una comodidad superior.",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: [
      { name: "Zebra", hex: "#FFFFFF" },
      { name: "Beluga", hex: "#808080" },
      { name: "Black Static", hex: "#000000" }
    ]
  },
  {
    id: 6,
    name: "Nike LeBron 20",
    price: 259.99,
    image: shoe6,
    category: "men",
    style: "sport",
    description: "Zapatilla de baloncesto de alto rendimiento con unidades Zoom Air. Cuenta con una parte superior liviana, amortiguación receptiva y patrón de tracción multidireccional.",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14],
    colors: [
      { name: "Lakers Purple", hex: "#552583" },
      { name: "South Beach", hex: "#00B4DB" },
      { name: "Championship Gold", hex: "#FFD700" }
    ]
  },
  {
    id: 7,
    name: "New Balance 990v5",
    price: 199.99,
    image: shoe7,
    category: "men",
    style: "running",
    description: "Zapatillas de running de primera calidad fabricadas en EE. UU. Cuenta con tecnología de entresuela ENCAP, parte superior de piel de cerdo y comodidad superior para el uso diario.",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: [
      { name: "Grey", hex: "#808080" },
      { name: "Navy", hex: "#000080" },
      { name: "Black", hex: "#000000" }
    ]
  },
  {
    id: 8,
    name: "Air Jordan 11 Retro",
    price: 289.99,
    image: shoe8,
    category: "men",
    style: "sport",
    description: "Legendarias zapatillas de baloncesto con diseño de charol. Cuenta con amortiguación Air de longitud completa, placa de resorte de fibra de carbono y estilo icónico.",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    colors: [
      { name: "Concord", hex: "#FFFFFF" },
      { name: "Space Jam", hex: "#000000" },
      { name: "Cool Grey", hex: "#808080" }
    ]
  },
  {
    id: 9,
    name: "Nike Air Force 1",
    price: 159.99,
    image: shoe9,
    category: "men",
    style: "fashion",
    description: "Las clásicas Air Force 1 que definieron la cultura de las zapatillas. Cuenta con parte superior de cuero de grano completo, amortiguación Air y diseño atemporal.",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: [
      { name: "Triple White", hex: "#FFFFFF" },
      { name: "Triple Black", hex: "#000000" },
      { name: "White/Gum", hex: "#F5F5DC" }
    ]
  },
  {
    id: 10,
    name: "Converse Chuck Taylor All-Star",
    price: 129.99,
    image: shoe10,
    category: "women",
    style: "casual",
    description: "La zapatilla de baloncesto original convertida en icono cultural. Cuenta con parte superior de lona, puntera de goma y diseño atemporal.",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: [
      { name: "Classic Black", hex: "#000000" },
      { name: "Optical White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#000080" }
    ]
  },
  {
    id: 11,
    name: "Nike Zoom Alphafly NEXT",
    price: 299.99,
    image: shoe11,
    category: "women",
    style: "running",
    description: "Zapatilla de carreras de maratón de élite con espuma ZoomX y unidades Air Zoom. Cuenta con parte superior Atomknit y placa de fibra de carbono para una velocidad máxima.",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: [
      { name: "Volt", hex: "#CEFF00" },
      { name: "Ekiden", hex: "#FF4B4B" },
      { name: "Proto", hex: "#00FF00" }
    ]
  },
  {
    id: 12,
    name: "Air Jordan 4 Retro",
    price: 269.99,
    image: shoe12,
    category: "men",
    style: "fashion",
    description: "Icónicas zapatillas de baloncesto con amortiguación Air visible. Cuenta con materiales de primera calidad, red lateral distintiva y la clásica marca 'Flight'.",
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: [
      { name: "Bred", hex: "#FF0000" },
      { name: "White Cement", hex: "#F5F5F5" },
      { name: "Military Blue", hex: "#4169E1" }
    ]
  }
];
