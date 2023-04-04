import TreeImageCarousel from "./TreeImageCarousel";
import Example1 from "../../../../example1.jpg";
import Example2 from "../../../../example2.jpg";

const imgs = [
  {
    src: Example1,
    text: "Example 1",
    width: 400,
    height: 533
  },
  {
    src: Example2,
    text: "Example 2",
    width: 400,
    height: 280
  }
];

export default {
  title: "TreeImageCarousel",
  component: TreeImageCarousel
}

export const Default = {
  args: {
    imgs: imgs,
  }
}