import React from 'react';

function Receipt({ items, total, paymentMethod }) {
  return (
    <div className="p-4 border border-gray-300 rounded bg-white">
      <h3 className="text-xl mb-2">Receipt</h3>
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Barcode</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.barcode}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.price}</td>
              <td className="border p-2">{item.barcode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right">
        <p><strong>Total:</strong> ${total}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
      </div>
    </div>
  );
}

export default Receipt;
