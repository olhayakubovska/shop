// import { useMatch, useNavigate, useParams } from "react-router-dom";
// import styles from "./productForm.module.css";
// import { ProductRow } from "./product-row";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateProductOperation } from "../../api/operations/update-product-operation";
// import { getProductOperation } from "../../api/operations/get-product-operation";
// import { categoriesOperation } from "../../api/operations";
// import { deleteProductOperaton } from "../../api/operations/delete-product-operaton";
// import { setProductData } from "../../api/action/set-product-data";
// import { getProductsOperation } from "../../api/operations/get-products-operation";

// export const ProductForm = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     getProductsOperation().then((loadedData) => setProducts(loadedData));
//   });
//   //   const { id, name, image, price, categoryId, description } = product;
//   //   console.log(id, name, image, price, categoryId, description, "ProductForm");
//   const product = useSelector(({ product }) => product);
//   // const productFromRedax = useSelector(({ products }) => products);

//   // const productName = useSelector(({ product }) => product.name);
//   // const productImage = useSelector(({ product }) => product.image);
//   // const productPrice = useSelector(({ product }) => product.price);
//   // const productCategory = useSelector(({ product }) =>
//   //   Object.keys(product.categoryId)
//   // );
//   // const productDescription = useSelector(({ product }) => product.description);
//   // const { id } = useParams();

//   const [editedName, setEditedName] = useState(product.name);
//   const [editedPrice, setEditedPrice] = useState(product.price);
//   const [editedImage, setEditedImage] = useState(product.image);
//   const [editedCategory, setEditedCategory] = useState(product.categoryId);
//   const [editedDescription, setEditedDescription] = useState(
//     product.description
//   );
//   const [categories, setCategories] = useState([]);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     categoriesOperation().then((loadedCategories) =>
//       setCategories(loadedCategories)
//     );
//   }, []);

//   const editProduct = (ItemId) => {
//     getProductOperation(ItemId).then((loadedProduct) => {
//       setEditedName(loadedProduct.name);
//       setEditedPrice(loadedProduct.price);
//       setEditedImage(loadedProduct.image);
//       setEditedCategory(loadedProduct.categoryId);
//       setEditedDescription(loadedProduct.description);
//     });
//   };

//   // useEffect(() => {
//   //   getProductsOperation().then((loadedProducts) =>
//   //     setProducts(loadedProducts)
//   //   );
//   // }, [products]);

//   const updateProduct = (
//     producId2,
//     editedName2,
//     editedImage2,
//     editedPrice2,
//     editedCategory2,
//     productDescription2
//   ) => {
//     // console.log(id, newNameProdut2);
//     updateProductOperation(
//       producId2,
//       editedName2,
//       editedImage2,
//       editedPrice2,
//       editedCategory2,
//       productDescription2
//     ).then((loadedProduct) => {
//       dispatch(setProductData(loadedProduct));
//       console.log(loadedProduct, "loadedProduct");
//     });
//   };

//   // navigate("/product/edit");
//   const deleteProduct = (productId) => {
//     deleteProductOperaton(productId);
//     navigate("/product/edit");

//     // dispatch(removeCommentAsync(requestServer, postId, id));
//   };

//   const onCategoryChange = ({ target }) => {
//     setEditedCategory(target.value);
//   };
//   //

//   const navigate = useNavigate();

//   return (
//     <div className={styles.container}>
//       <div className={styles.newProduct}>
//         <div className={styles.text}>
//           Блок для добавления и редактирования товара
//         </div>
//         <input
//           value={editedName}
//           onChange={({ target }) => setEditedName(target.value)}
//         />
//         <input
//           value={editedImage}
//           onChange={({ target }) => setEditedImage(target.value)}
//         />
//         <input
//           value={editedPrice}
//           onChange={({ target }) => setEditedPrice(target.value)}
//         />
//         <div className="role-column">
//           <select value={editedCategory} onChange={onCategoryChange}>
//             {categories.map(({ id: categoryId, category }) => (
//               <option key={categoryId} value={categoryId}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </div>{" "}
//         <input
//           value={editedDescription}
//           onChange={({ target }) => setEditedDescription(target.value)}
//         />
//         <button
//           onClick={() =>
//             updateProduct(
//               product.id,
//               editedName,
//               editedImage,
//               editedPrice,
//               editedCategory,
//               editedDescription
//             )
//           }
//         >
//           save
//         </button>
//       </div>

//       <div className={styles.edit}>
//         {products.map((item) => (
//           <ProductRow
//             key={item.id}
//             id={item.id}
//             name={item.name}
//             image={item.image}
//             price={item.price}
//             categoryId={item.categoryId}
//             description={item.description}
//             editProduct={() => editProduct(item.id)}
//             deleteProduct={() => deleteProduct(item.id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

import { useNavigate } from "react-router-dom";
import styles from "./productForm.module.css";
import { ProductRow } from "./product-row";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductOperation } from "../../api/operations/update-product-operation";
import { getProductOperation } from "../../api/operations/get-product-operation";
import { getCategoriesOperation } from "../../api/operations";
import { deleteProductOperaton } from "../../api/operations/delete-product-operaton";
import { setProductData } from "../../api/action/set-product-data";
import { getProductsOperation } from "../../api/operations/get-products-operation";
import { addProductOperation } from "../../api/operations/add-product-operation";
import { setProductsActions } from "../../api/action/set-products-action";
import { updateProductAsync } from "../../api/action/update-product-ascync";
import { onOpenModal } from "../../api/action/on-open-modal";
import { ACTION_TYPE } from "../../api/action";
import { getProducts } from "../../api/fetch/get-products";
import { Error } from "../../components/Error/Error";
import { ROLE } from "../../constants/role";

export const ProductForm = () => {
  // const [products, setProducts] = useState([]);

  //   const { id, name, image, price, categoryId, description } = product;
  //   console.log(id, name, image, price, categoryId, description, "ProductForm");
  // const product = useSelector(({ product }) => product);
  // const productFromRedax = useSelector(({ products }) => products);

  // const productName = useSelector(({ product }) => product.name);
  // const productImage = useSelector(({ product }) => product.image);
  // const productPrice = useSelector(({ product }) => product.price);
  // const productCategory = useSelector(({ product }) =>
  //   Object.keys(product.categoryId)
  // );
  // const productDescription = useSelector(({ product }) => product.description);
  // const { id } = useParams();

  const [productId, setProductId] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [flag, setFlag] = useState(true);
  // const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);
  const [error, setError] = useState(null);

  const session = useSelector(({ user }) => user.session);

  const dispatch = useDispatch();

  useEffect(() => {
    // getProductsOperation().then((loadedData) => setProducts(loadedData));
    getProductsOperation().then((loadedData) =>
      dispatch(setProductsActions(loadedData))
    );

    getCategoriesOperation().then((loadedCategories) =>
      setCategories(loadedCategories)
    );
  }, []);

  const products = useSelector((state) => state.products.products);

  const editProduct = (ItemId) => {
    getProductOperation(ItemId).then((loadedProduct) => {
      setProductId(ItemId);
      setEditedName(loadedProduct.name);
      setEditedPrice(loadedProduct.price);
      setEditedImage(loadedProduct.image);
      setEditedCategory(loadedProduct.categoryId);
      setEditedDescription(loadedProduct.description);
    });
    setFlag(false);
  };

  // updateProductOperation(
  //   id,
  //   name,
  //   image,
  //   price,
  //   category,
  //   description,
  //   session
  // ).then(({ err, res }) => {
  //   if (err) {
  //     setError(err);
  //   }
  //   dispatch(setProductData(res));
  // });

  // const updateProduct = (id, name, image, price, category, description) => {
  //   dispatch(
  //     onOpenModal({
  //       text: "Сохранить изменения?",
  //       onConfirm: async () => {
  //         dispatch(
  //           updateProductAsync(
  //             id,
  //             name,
  //             image,
  //             price,
  //             category,
  //             description,
  //             session
  //           ).then(({ err, res }) => {
  //             dispatch(setProductData(res));
  //             setError(err);
  //           })
  //         );

  //         // const loadedProducts = await getProducts();
  //         // dispatch(setProductsActions(loadedProducts));
  //         dispatch({ type: ACTION_TYPE.CLOSE_MODAL });
  //         setFlag(!flag);
  //       },
  //       onCancel: () => dispatch({ type: ACTION_TYPE.CLOSE_MODAL }),
  //     })
  //   );

  //   setEditedName("");
  //   setEditedPrice("");
  //   setEditedImage("");
  //   setEditedCategory("");
  //   setEditedDescription("");
  //   setFlag(true);
  // };

  const updateProduct = (id, name, image, price, category, description) => {
    dispatch(
      onOpenModal({
        text: "Сохранить изменения?",
        onConfirm: async () => {
          // Правильный вызов dispatch для updateProductAsync
          try {
            const { err, res } = await dispatch(
              updateProductAsync(
                id,
                name,
                image,
                price,
                category,
                description,
                session
              )
            );
            dispatch(setProductData(res));
            setError(err);
          } catch (error) {
            console.error("Ошибка при обновлении продукта:", error);
            setError("Ошибка при обновлении продукта");
          }

          const loadedProducts = await getProducts();
          dispatch(setProductsActions(loadedProducts));
          dispatch({ type: ACTION_TYPE.CLOSE_MODAL });
          setFlag(!flag);
        },
        onCancel: () => dispatch({ type: ACTION_TYPE.CLOSE_MODAL }),
      })
    );

    setEditedName("");
    setEditedPrice("");
    setEditedImage("");
    setEditedCategory("");
    setEditedDescription("");
    setFlag(true);
  };

  const addProduct = (name, image, price, category, description) => {
    addProductOperation(
      name,
      image,
      price,
      category,
      description,
      session
    ).then(({ err, res }) => {
      if (err) {
        setError(err);
      }
      dispatch(setProductData(res));
    });

    setEditedName("");
    setEditedPrice("");
    setEditedImage("");
    setEditedCategory("");
    setEditedDescription("");
  };

  const deleteProduct = (productId) => {
    deleteProductOperaton(productId, session);

    // dispatch(removeCommentAsync(requestServer, postId, id));
  };

  const onCategoryChange = ({ target }) => {
    setEditedCategory(target.value);
  };
  //

  return (
    <>
      <Error arrayAccess={[ROLE.ADMIN]} error={error}>
        <div className={styles.container}>
          <div className={styles.newProduct}>
            <div className={styles.text}>
              Блок для добавления и редактирования товара
            </div>
            <input
              value={editedName}
              onChange={({ target }) => setEditedName(target.value)}
            />
            <input
              value={editedImage}
              onChange={({ target }) => setEditedImage(target.value)}
            />
            <input
              value={editedPrice}
              onChange={({ target }) => setEditedPrice(target.value)}
            />
            <div className="role-column">
              <select value={editedCategory} onChange={onCategoryChange}>
                {categories.map(({ id: categoryId, category }) => (
                  <option key={categoryId} value={categoryId}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <input
              value={editedDescription}
              onChange={({ target }) => setEditedDescription(target.value)}
            />
            <div className={styles.buttons}>
              {flag ? (
                <button
                  className={styles.btn}
                  onClick={() =>
                    addProduct(
                      editedName,
                      editedImage,
                      editedPrice,
                      editedCategory,
                      editedDescription
                    )
                  }
                >
                  add
                </button>
              ) : (
                <button
                  className={styles.btn}
                  onClick={() =>
                    updateProduct(
                      productId,
                      editedName,
                      editedImage,
                      editedPrice,
                      editedCategory,
                      editedDescription
                    )
                  }
                >
                  save
                </button>
              )}
            </div>
          </div>

          <div className={styles.edit}>
            {products.map((item) => (
              <ProductRow
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                categoryId={item.categoryId}
                description={item.description}
                editProduct={() => editProduct(item.id)}
                deleteProduct={() => deleteProduct(item.id)}
                // isSaveButtonDisabled={isSaveButtonDisabled}
              />
            ))}
          </div>
        </div>
      </Error>
    </>
  );
};
