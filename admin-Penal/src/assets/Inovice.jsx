import React, { forwardRef } from "react";

const Invoice = forwardRef(({ order, subtotal }, ref) => {
  return (
    <div ref={ref} style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>Yahya Store</h2>
      <p>Invoice #: {order.invoiceNo}</p>
      <p>Date: {order.date}</p>

      <hr />

      <h4>Customer</h4>
      <p>{order.customer.name}</p>
      <p>{order.customer.phone}</p>
      <p>{order.customer.address}</p>

      <hr />

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {order.items.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>{item.qty * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ textAlign: "right" }}>
        Subtotal: Rs {subtotal}
      </h3>
    </div>
  );
});

export default Invoice;
