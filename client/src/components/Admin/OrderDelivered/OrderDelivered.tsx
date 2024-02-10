import "../OrderPending/OrderPending.css";
import { useMutation, useQuery } from "react-query";
import { getDeliveredOrderPaginate, verifyPayment } from "../../../hooks/adminHook";
import { useEffect, useState } from "react";

function OrderDelivered() {
  const [page, setPage] = useState(0);
  const [verifyLoading, setVerifyLoading] = useState(null);

  const { isLoading, data, isPreviousData, refetch } = useQuery({
    queryKey: ["order", page],
    // @ts-ignore
    queryFn: () => getDeliveredOrderPaginate({ page: page, token }),
    keepPreviousData: true,
  });

  console.log("order data", data)

  const payment = useMutation(verifyPayment, {
    onSuccess: (data) => {
      refetch();
      console.log("payement data", data);
      if (data.paid){
        setVerifyLoading(null);
      }
    },
    onError: () => {
      console.log("there was an error");
    },
  });

  useEffect(() => {
    refetch();
  }, [data]);

  const handleOrderVerify = (data: any, id: any) => {
    payment.mutate({tx_ref: data});
    setVerifyLoading(id);
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
                    "https://elfegn.onrender.com/" + order?.ProductImage?.substring(6)
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
                  {order.PayemntVerify? <div className="stat-delivered">Payment Verifyied</div>: verifyLoading === order._id?  <button className="btn-loading"><div className="buyer-loader-green"></div></button> :<button onClick={()=> handleOrderVerify(order.tx_ref, order._id)} className="btn-verify">Verify Payment</button>}
                  <div className="stat-delivered">Delivered</div>
                </div>
              </div>
            ))}
          </div>
          <div className="buyer-order-list-pagination">
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
        </>
      )}
    </div>
  )
}

export default OrderDelivered
