import { useQuery } from "react-query";
import "./sellerOrder.css";
import { useEffect, useState } from "react";
import cutl from "../../../assets/tl.svg";
import cutr from "../../../assets/tr.svg";
import { getOrderPaginate } from "../../../hooks/orderHook";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function SellerOrder() {
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const user = useSelector((state: any) => state.auth.user);
  const { isLoading, data, isPreviousData, refetch } = useQuery({
    queryKey: ["order", page],
    /*@ts-ignore */
    queryFn: () => getOrderPaginate({ page: page, id: user?._id }),
    keepPreviousData: true,
  });

  useEffect(() => {
    refetch();
  }, [page]);
  return (
    <div className="seller-order">
      {isLoading ? (
        <div className="seller-loader"></div>
      ) : (
        <>
          <div className="seller-order-list">
            {data?.orders?.map((order: any) => (
              <div className="seller-order-item" key={order._id}>
                <div className="seller-order-item-left">
                  <img src={cutl} alt="edgecut" />
                </div>
                <div className="seller-order-item-center">
                  <div className="seller-order-item-center-id">
                    <div className="seller-order-item-center-id-id">
                      <p>Order Id:</p>
                      {order?._id}
                    </div>
                    <div className="seller-order-item-center-id-status">
                      {order.OrderActive ? (
                        <p className="active">active</p>
                      ) : (
                        <p className="inactive">inactive</p>
                      )}
                    </div>
                  </div>
                  <div className="seller-order-item-center-body">
                    <img
                      src={
                        "https://merita.onrender.com" +
                        order.GiftImage.substring(6)
                      }
                      alt="image"
                      crossOrigin="anonymous"
                    />
                    <div className="seller-order-item-center-info">
                      <p>Item: {order.orderName}</p>
                      <p>Payment status: {order.paymentStatus}</p>
                      <p>Date: {order.OrderDate}</p>
                    </div>
                    <div className="seller-order-item-center-action">
                      {order.OrderDelivered ? (
                        <p>
                          Delivery Stat{" "}
                          <p className="deliver-comp">Delivered</p>
                        </p>
                      ) : (
                        <p>
                          Delivery Stat <p className="deliver-pend">Pending</p>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="seller-order-item-right">
                  <img src={cutr} alt="edgecut" />
                </div>
              </div>
            ))}
          </div>
          <div className="seller-order-list-pagination">
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 0}
            >
              {t("previous")}
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
              {t("next")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SellerOrder;
