import { useState, useEffect } from 'react';
import axios from 'axios';
import Receipt from './Receipt';

function Dashboard() {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [barcode, setBarcode] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [amount, setAmount] = useState(0);
  const [receiptItems, setReceiptItems] = useState([]);
  const [receiptTotal, setReceiptTotal] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    fetchFoods();
  }, []);

 const fetchFoods = async () => {
    try {
      const res = await axios.get('/api/foods');
      setFoods(res.data);
      console.log('Fetched foods:', res.data); // Debugging log
    } catch (err) {
      setError(err.message);
      console.error('Error fetching foods:', err); // Debugging log
    } finally {
      setLoading(false);
    }
  };

  const addFood = async (e) => {
    e.preventDefault();
    if (name && price > 0 && barcode) {
    try {
      const newFood = { name, price, barcode };
      await axios.post('/api/foods', newFood);
      setFoods([...foods, newFood]);
      setName('');
      setPrice(0);
      setBarcode('');
    } catch (err) {
       setError(err.message);
       console.error('Error adding food:', err); // Debugging log
    }
    } else {
        setError("All fields are required and price must be greater than zero.");
      }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (amount > 0) {
    try {
      const paymentData = { method: paymentMethod, amount };
      await axios.post('/api/pay', paymentData);
      // Print receipt and update sales tracking here
      setAmount(0);
      setPaymentMethod('cash');
      setReceiptItems(foods);
      setReceiptTotal(amount);
      setShowReceipt(true);
    } catch (err) {
        setError(err.message);
        console.error('Error handling payment:', err); // Debugging log
    }
    } else {
        setError("Amount must be greater than zero.");
      }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <form onSubmit={addFood} className="mb-4">
        <input
          type="text"
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-2 ml-2"
        />
        <input
          type="text"
          placeholder="Barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="p-2 ml-2 border border-gray-300 rounded mb-2"
        />
        <button type="submit" className="p-2 bg-green-500 text-white rounded ml-3">Add Food</button>
      </form>
      <form onSubmit={handlePayment} className="mb-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-2"
        />
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="p-2 ml-2 border border-gray-300 rounded mb-2"
        >
          <option value="cash">Cash</option>
          <option value="mobile">Mobile Money</option>
        </select>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded ml-3">Make Payment</button>
      </form>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Barcode</th>
          </tr>
        </thead>
        <tbody>
          {foods.map(food => (
            <tr key={food.barcode}>
              <td className="border p-2">{food.name}</td>
              <td className="border p-2">{food.price}</td>
              <td className="border p-2">{food.barcode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showReceipt && <Receipt items={receiptItems} total={receiptTotal} paymentMethod={paymentMethod} />}
    </div>
  );
}

export default Dashboard;
