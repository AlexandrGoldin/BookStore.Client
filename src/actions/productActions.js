import { FETCH_PRODUCTS } from "../types";
import { FILTER_PRODUCTS_BY_GENRE, ORDER_PRODUCTS_BY_PRICE } from "../types";
export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("https://localhost:5001/api/Users");
  const data = await res.json();
  console.log(data);
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const filterProducts = (products, genre) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_GENRE,
    payload: {
      genre: genre,
      items:
        genre === ""
          ? products
          : products.filter((x) => x.genre === genre),
    },
  });
};
export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "Не выбрано") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "дешевле"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
          ? -1
          : 1
    );
  }
  console.log(sortedProducts);
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};
