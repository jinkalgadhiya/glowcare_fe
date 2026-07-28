import Serum from "../assets/serum.png";
import Cream from "../assets/moisturizer.png";
import FaceWash from "../assets/facewash.png";
import Cleanser from "../assets/cleanser.png";
import Sunscreen from "../assets/sunscreen.png";
import Toner from "../assets/toner.png";

const floatingProducts = [
  {
    id: 1,
    name: "Face Wash",
    image: FaceWash,
    top: "4%",
    left: "50%",
    rotate: "-8deg",
  },

  {
    id: 2,
    name: "Serum",
    image: Serum,
    top: "25%",
    left: "12%",
    rotate: "-15deg",
  },

  {
    id: 3,
    name: "Moisturizer",
    image: Cream,
    top: "25%",
    right: "12%",
    rotate: "12deg",
  },

  {
    id: 4,
    name: "Cleanser",
    image: Cleanser,
    bottom: "10%",
    left: "18%",
    rotate: "-12deg",
  },

  {
    id: 5,
    name: "Sunscreen",
    image: Sunscreen,
    bottom: "6%",
    left: "50%",
    rotate: "5deg",
  },

  {
    id: 6,
    name: "Toner",
    image: Toner,
    bottom: "10%",
    right: "18%",
    rotate: "15deg",
  },
];

export default floatingProducts;