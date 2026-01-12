import React, { useState, useEffect } from "react";
import {
  FaCreditCard,
  FaUser,
  FaCheckCircle,
  FaShieldAlt,
  FaLock,
  FaQrcode,
  FaTimes,
} from "react-icons/fa";
import qrImage from "../images/payment-qr.png";

const PayFees = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showQR, setShowQR] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    grade: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowQR(true);
  };

  const closeModal = () => setShowQR(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Pay School Fees
          </h1>
          <p className="text-gray-600 text-lg">
            Quick and secure online fee payment via QR Code
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Payment Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <FaCreditCard className="text-primary" /> Payment Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student Information */}
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Student Name *
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Grade/Class *
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="">Select Grade</option>
                    <option value="pre-kg">Pre-KG</option>
                    <option value="lkg">LKG</option>
                    <option value="ukg">UKG</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((g) => (
                      <option key={g} value={g}>Grade {g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Amount (₹) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
              </div>

              {/* Security Note */}
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                <FaShieldAlt className="text-green-600 shrink-0" size={20} />
                <p className="text-sm text-green-700">
                  Your payment is secured with end-to-end encryption. You will be shown a QR code for payment after clicking the button below.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg text-lg transform hover:-translate-y-1"
              >
                <FaQrcode size={22} /> Generate Payment QR
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <FaCheckCircle className="text-primary" size={24} />
              <div>
                <p className="font-bold text-gray-900 text-sm">Instant Receipt</p>
                <p className="text-xs text-gray-500">Get confirmation immediately</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <FaLock className="text-primary" size={24} />
              <div>
                <p className="font-bold text-gray-900 text-sm">Secure Payment</p>
                <p className="text-xs text-gray-500">100% encrypted checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {
        showQR && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-xl font-bold text-gray-900">Scan to Pay</h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="p-8 text-center">
                <div className="mb-4">
                  <p className="text-gray-600 mb-1">Paying for: <span className="font-bold text-gray-900">{formData.studentName}</span></p>
                  <p className="text-gray-600">Amount: <span className="font-bold text-primary text-2xl">₹{formData.amount}</span></p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl mb-6 relative group">
                  <img
                    src={qrImage}
                    alt="Payment QR Code"
                    className="w-full h-auto rounded-lg shadow-md mx-auto"
                  />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center pointer-events-none">
                    <span className="bg-white px-4 py-2 rounded-full text-xs font-bold shadow-sm">Merchant: Nethaji Vidyalayam</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-6 italic">
                  Scan the QR code using any UPI app (GPay, PhonePe, Paytm) to complete the payment.
                </p>

                <button
                  onClick={closeModal}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default PayFees;
