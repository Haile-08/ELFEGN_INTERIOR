import { useMutation, useQuery } from "react-query";
import "./BuyerOrder.css";
import {
  ApproveDelivery,
  deleteOrder,
  getOrderPaginate,
} from "../../../hooks/orderHook";
import { useEffect, useState } from "react";
import cutl from "../../../assets/tl.svg";
import cutr from "../../../assets/tr.svg";
import { useDispatch, useSelector } from "react-redux";
import { setTxRef } from "../../../actions/authSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function BuyerOrder() {
  const dispatch = useDispatch();
  const naviage = useNavigate();
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const user = useSelector((state: any) => state.auth.user);
  const buyerToken = useSelector((state: any) => state.auth.buyerToken);
  const { isLoading, data, isPreviousData, refetch } = useQuery({
    queryKey: ["order", page],
    // @ts-ignore
    queryFn: () => getOrderPaginate({ page: page, id: user?._id }),
    keepPreviousData: true,
  });
  const approve = useMutation(ApproveDelivery, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      console.log("there was an error");
    },
  });

  const deleteorder = useMutation(deleteOrder, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      console.log("there was an error");
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const handleApproval = (id: String, userId: String) => {
    approve.mutate({ data: { id, userId }, token: buyerToken });
    refetch();
  };
  const handleOrderDelete = (id: String) => {
    deleteorder.mutate({ id, token: buyerToken });
    refetch();
  };
  return (
    <div className="buyer-order">
      {isLoading ? (
        <div className="buyer-loader"></div>
      ) : (
        <>
          <div className="buyer-order-list">
            {data?.orders?.map((order: any) => (
              <div className="buyer-order-item" key={order?._id}>
                <div className="buyer-order-item-left">
                  <img src={cutl} alt="edgecut" />
                </div>
                <div className="buyer-order-item-center">
                  <div className="buyer-order-item-center-id">
                    <div className="buyer-order-item-center-id-id">
                      <p>{t("buyerOrderId")}:</p>
                      {order?._id}
                    </div>
                    <div className="buyer-order-item-center-id-status">
                      {order.OrderActive ? (
                        <p className="active">{t("buyerOrderActive")}</p>
                      ) : (
                        <p className="inactive">{t("buyerOrderInActive")}</p>
                      )}
                    </div>
                  </div>
                  <div className="buyer-order-item-center-body">
                    <img
                      src={
                        "https://merita.onrender.com" +
                        order.GiftImage.substring(6)
                      }
                      alt="image"
                      crossOrigin="anonymous"
                    />
                    <div className="buyer-order-item-center-info">
                      <p>
                        {t("buyerOrderItem")}: {order.orderName}
                      </p>
                      <p>
                        {t("buyerOrderPaymentstat")}: {order.paymentStatus}
                      </p>
                      <p>
                        {t("buyerOrderDate")}: {order.OrderDate}
                      </p>
                    </div>
                    <div className="buyer-order-item-center-action">
                      {order.OrderDelivered ? (
                        <p>
                          {t("buyerOrderDeliveryStat")}{" "}
                          <p className="deliver-comp">
                            {t("buyerOrderDelivered")}
                          </p>
                        </p>
                      ) : (
                        <p>
                          {t("buyerOrderDeliveryStat")}{" "}
                          <p className="deliver-pend">
                            {t("buyerOrderPending")}
                          </p>
                        </p>
                      )}
                      {order.OrderDelivered ? (
                        <button
                          onClick={(e: any) => {
                            e.preventDefault();
                            handleOrderDelete(order._id);
                          }}
                        >
                          {t("buyerOrderDelete")}
                        </button>
                      ) : (
                        order.OrderActive && (
                          <button
                            onClick={(e: any) => {
                              e.preventDefault();
                              handleApproval(order._id, order.SellerId);
                            }}
                          >
                            {t("buyerOrderApprove")}
                          </button>
                        )
                      )}
                      {order.OrderActive ? (
                        <></>
                      ) : (
                        <button
                          onClick={(e: any) => {
                            e.preventDefault();
                            dispatch(
                              setTxRef({
                                tx_ref: order.tx_ref,
                              })
                            );
                            naviage("/buyerpage/payment/verify");
                          }}
                        >
                          {t("buyerOrderVerifyPayment")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="buyer-order-item-right">
                  <img src={cutr} alt="edgecut" />
                </div>
              </div>
            ))}
          </div>
          <div className="buyer-order-list-pagination">
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

export default BuyerOrder;
