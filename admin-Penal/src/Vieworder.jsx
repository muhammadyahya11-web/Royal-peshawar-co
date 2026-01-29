import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminCotext } from "./AdminCotext";
import { jsPDF } from "jspdf"; 
import autoTable from "jspdf-autotable"; 

const ViewOrder = () => {
  const { id } = useParams();
  const { tooken } = useContext(AdminCotext);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  // ================= FETCH SINGLE ORDER =================
  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/order/admin/singleorder/${id}`,
        { headers: { authorization: `Bearer ${tooken}` } }
      );
      setOrder(res.data.order);
      setStatus(res.data.order.orderStatus);
    } catch (error) {
      console.error("Fetch order error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  // ================= UPDATE ORDER STATUS =================
  const updateStatus = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/order/admin/orderstatus/${id}`,
        { status },
        { headers: { authorization: `Bearer ${tooken}` } }
      );
      setOrder(res.data.order);
      alert("Order status updated successfully");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to update status");
    }
  };

  // ================= PDF DOWNLOAD FUNCTION =================
  const downloadInvoicePDF = (order) => {
    if (!order) return;

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    let y = margin;

    // ===== HEADER =====
    doc.setFontSize(18);
    doc.text("Yahya Store", pageWidth / 2, y, { align: "center" });
    y += 25;

    doc.setFontSize(11);
    doc.text(`Invoice #: ${order._id}`, margin, y);
    doc.text(
      `Date: ${new Date(order.createdAt).toLocaleDateString()}`,
      pageWidth - margin,
      y,
      { align: "right" }
    );
    y += 25;

    // ===== CUSTOMER =====
    doc.setFontSize(12);
    doc.text("Customer Details:", margin, y);
    y += 15;
    doc.setFontSize(11);
    doc.text(order.shippingAddress.fullName, margin, y);
    y += 15;
    doc.text(order.shippingAddress.phone, margin, y);
    y += 15;
    doc.text(
      `${order.shippingAddress.address}, ${order.shippingAddress.city}`,
      margin,
      y
    );
    y += 20;

    // ===== ITEMS TABLE =====
    const tableColumn = ["Product", "Size", "Qty", "Price", "Total"];
    const tableRows = order.items?.map((item) => [
      item.name,
      item.size,
      item.quantity.toString(),
      `Rs ${item.price}`,
      `Rs ${item.price * item.quantity}`,
    ]) || [];

    autoTable(doc, {
      startY: y,
      head: [tableColumn],
      body: tableRows,
      margin: { left: margin, right: margin },
      theme: "grid",
      headStyles: { fillColor: [230, 230, 230] },
      styles: { fontSize: 10 },
    });

    y = doc.lastAutoTable.finalY + 20;

    // ===== TOTAL =====
    doc.setFontSize(12);
    doc.text(`Grand Total: Rs ${order.amount}`, pageWidth - margin, y, {
      align: "right",
    });

    // ===== SAVE PDF =====
    doc.save(`invoice-${order._id}.pdf`);
  };

  if (loading) return <p className="text-center py-10">Loading order...</p>;
  if (!order) return <p className="text-center py-10">Order not found</p>;

  return (
    <div>
      {/* ===== Printable Invoice Area ===== */}
      <div className="print-area">
        <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-lg shadow print:shadow-none">
          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Order Invoice</h1>
            <p className="text-sm">Order ID: {order._id}</p>
            <p className="text-sm">
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* SHIPPING */}
          <div className="mb-6 border-b pb-4">
            <h2 className="font-semibold mb-2">Shipping Address</h2>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.phone}</p>
            <p>
              {order.shippingAddress.address}, {order.shippingAddress.city}
            </p>
          </div>

          {/* ITEMS */}
          <table className="w-full text-sm border rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-center">Size</th>
                <th className="p-2 text-center">Qty</th>
                <th className="p-2 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 text-center">{item.size}</td>
                  <td className="p-2 text-center">{item.quantity}</td>
                  <td className="p-2 text-center">Rs {item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* TOTAL */}
          <div className="text-right mt-2 font-semibold">
            Total: Rs {order.amount}
          </div>
        </div>
      </div>

      {/* ===== Buttons (Hidden in Print) ===== */}
      <div className="flex gap-2 mt-4 print:hidden max-w-4xl mx-auto">
        <button
          onClick={() => window.print()}
          className="bg-black text-white px-5 py-2 rounded"
        >
          Print Invoice
        </button>
        <button
          onClick={() => downloadInvoicePDF(order)}
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          Download PDF
        </button>
      </div>

      {/* ===== Status Update (Hidden in Print) ===== */}
      <div className="flex gap-3 items-center mt-4 print:hidden max-w-4xl mx-auto">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button
          onClick={updateStatus}
          className="bg-black text-white px-4 py-2 rounded text-sm"
        >
          Update Status
        </button>
      </div>

      {/* ===== Print CSS ===== */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ViewOrder;