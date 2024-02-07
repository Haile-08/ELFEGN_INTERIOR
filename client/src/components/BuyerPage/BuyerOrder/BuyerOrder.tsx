import { useMutation, useQuery } from "react-query";
import "./BuyerOrder.css";
import {
  getOrderPaginate,
  verifyPayment,
} from "../../../hooks/orderHook";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function BuyerOrder() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.userToken);
  const { isLoading, data, isPreviousData, refetch } = useQuery({
    queryKey: ["order", page],
    // @ts-ignore
    queryFn: () => getOrderPaginate({ page: page, id: user?._id }),
    keepPreviousData: true,
  });
  const payment = useMutation(verifyPayment, {
    onSuccess: (data) => {
      console.log("payement data", data);
      if (data.paid){
        setVerifyLoading(false);
      }
    },
    onError: () => {
      console.log("there was an error");
    },
  });

  

  useEffect(() => {
    refetch();
  }, []);

  const handleOrderVerify = (data: any) => {
    payment.mutate({tx_ref: data});
    setVerifyLoading(true);
    refetch()
  }
  return (
    <div className="buyer-order">
      {isLoading ? (
        <div className="buyer-loader"></div>
      ) : (
        <>
          <div className="buyer-order-list">
            {data?.orders?.map((order: any) => (
              <div className="buyer-order-item" key={order?._id}>
                <div className="order-space-image">
                 <img
                  src={
                    "http://localhost:5000/" + order?.ProductImage?.substring(6)
                  }
                  alt="content-image"
                  crossOrigin="anonymous"
                  />
                </div>
                <div className="order-space">
                  <p>{order.ProductName}</p>
                  <p>{order.Amount}{"  "}Birr</p>
                  <p>{order.PhoneNumber}</p>
                  <p>{order.KefleKetema}</p>
                  <p>{order.FriendlyPlace}</p>
                </div>
                <div className="order-space">
                  <p>{order.OrderDate}</p>
                  {order.Delivered? <div className="stat-delivered">Delivered</div>: <div className="stat-pending"> Delivery Pending</div>}
                  {order.PayemntVerify? <div className="stat-delivered">Payment Verifyied</div>: verifyLoading?  <button className="btn-loading"><div className="buyer-loader-green"></div></button> :<button onClick={()=> handleOrderVerify(order.tx_ref)} className="btn-verify">Verify Payment</button>}
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
