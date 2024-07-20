import products from "data/product-database";
import bazaarReactDatabase from "data/bazaar-react-database";
import { products as market2 } from "../market-2/data";
import {
  relatedProducts,
  frequentlyBoughtData,
} from "../related-products/data";
const dbProducts = [...bazaarReactDatabase, ...products]; // all used products in the bazaar template

const productList = [
  ...market2,
  ...relatedProducts,
  ...frequentlyBoughtData,
]; // get unique products from prouct list

const uniqueProudcts = [...new Set(productList.map((item) => item.slug))].map(
  (item) => productList.find((it) => it.slug === item)
); // get the all slugs

const slugs = uniqueProudcts.map((item) => ({
  params: {
    slug: item.slug,
  },
}));
export { uniqueProudcts, slugs };
