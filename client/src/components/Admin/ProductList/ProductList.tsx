import { useMutation, useQuery } from "react-query";
import { removeAProduct, retrieveProducts } from "../../../hooks/adminHook";
import "./ProductList.css"
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useState } from "react";

function ProductList() {
    const adminToken = useSelector((state: any) => state.auth.adminToken);
    const [page, setPage] = useState(0);

    const { isLoading, data, isPreviousData, refetch } = useQuery({
      queryKey: ["product", page],
      queryFn: () => retrieveProducts({page, token: adminToken}),
      keepPreviousData: true,
    });

    const { mutate } = useMutation(removeAProduct, {
      onSuccess: () => {
        refetch();
        console.log("success deleted");
      },
      onError: () => {
        console.log("there was an error");
      },
    });

    const handleGiftDelete = (id: String) => {
        mutate({ id, token: adminToken });
        refetch();
    };

  return (
    <div className="product-list">
      <div className="product-list-title">
        <p>Products</p>
      </div>
      {
        isLoading? <div className="product-loading">
        <div className="admin-loader"></div>
      </div>:
      <div className="gift-list">
      <div className="gift-list-scroll">
        {data?.product?.map((product: any, index: any) => (
          <motion.div
            className="gift-item"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 1.2 }}
            key={index}
          >
            <img
              src={
                "https://elfegn.onrender.com" +
                product.image.substring(6)
              }
              alt="image"
              crossOrigin="anonymous"
            />
            <div className="gift-item-info">
              <p>Name: {product.name}</p>
              <p>Price: {product.price}birr</p>
              <p>Type: {product.category}</p>
            </div>
            <div className="gift-item-data">
              <p>Date: {product.date}</p>
              <p>Id: {product._id}</p>
            </div>
            <div className="gift-item-delete-btn">
              <button
                onClick={(e: any) => {
                  e.preventDefault();
                  handleGiftDelete(product._id);
                }}
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
      }
          <div className="patginate-product">
          <div className="nav-btn">
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 0}
            >
              Previous
            </button>
            <p>{page}</p>
            <button
              onClick={() => {
                if (!isPreviousData && data?.hasMore) {
                  setPage((old) => old + 1);
                }
              }}
              disabled={isPreviousData || !data?.hasMore}
            >
              Next
            </button>
          </div>
          </div>
    </div>
  )
}

export default ProductList
