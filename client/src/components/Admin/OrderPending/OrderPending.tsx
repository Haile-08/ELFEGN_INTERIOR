import { useEffect, useState } from "react";
import "./OrderPending.css"
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import {  ApproveDelivery, getPendingOrderPaginate, verifyPayment } from "../../../hooks/adminHook";

function OrderPending() {
  const [page, setPage] = useState(0);
  const [verifyLoading, setVerifyLoading] = useState(null);
  const [deliverLoading, setDeliverLoading] = useState(null);
  const token = useSelector((state: any) => state.auth.adminToken);

  const { isLoading, data, isPreviousData, refetch } = useQuery({
    queryKey: ["order", page],
    // @ts-ignore
    queryFn: () => getPendingOrderPaginate({ page, token }),
    keepPreviousData: true,
  });

  console.log("pending order data", data)

  const payment = useMutation(verifyPayment, {
    onSuccess: (data) => {
      console.log("payement data", data);
      refetch();
      if (data.paid){
        setVerifyLoading(null);
      }
    },
    onError: () => {
      console.log("there was an error");
    },
  });

  const deliver = useMutation(ApproveDelivery, {
    onSuccess: (data) => {
      console.log("payement data", data);
      if (data.devlivered){
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

  const handleOrderDeliver = (id:any) => {
    deliver.mutate({id, token})
    setDeliverLoading(id)
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
                  <p>{order.FirstName}{"  "}{order.LastName}</p>
                  <p>{order.PhoneNumber}</p>
                  <p>{order.KefleKetema}</p>
                  <p>{order.FriendlyPlace}</p>
                </div>
                <div className="order-space">
                  <p>{order.OrderDate}</p>
                  {order.Delivered? <div className="stat-delivered">Delivered</div>: <div className="stat-pending"> Delivery Pending</div>}
                  {order.PayemntVerify? <div className="stat-delivered">Payment Verifyied</div>: verifyLoading === order._id?  <button className="btn-loading"><div className="buyer-loader-green"></div></button> :<button onClick={()=> handleOrderVerify(order.tx_ref, order._id)} className="btn-verify">Verify Payment</button>}
                  {order.Delivered? <div className="stat-delivered">Delivered</div>: deliverLoading === order._id?  <button className="btn-loading"><div className="buyer-loader-green"></div></button> :<button onClick={()=> handleOrderDeliver(order._id)} className="btn-verify">Product Delivered</button>}
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

export default OrderPending
