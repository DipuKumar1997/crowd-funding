// // import { useParams, useSearchParams } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import api from "../api/axios";
// // import { useAuth } from "../context/AuthContext";
// // import { loadStripe } from "@stripe/stripe-js";
// // import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// //
// // const stripePromise = loadStripe("pk_test_51SWhfbFsm9Dx7kiAwJb1n4fi8bN7bl6R8k5MMIHoUysNJx5krILrGWrvipUnmWCbYOdhOE0BblUAciNW8OPVhsds00pIeAhz7S");
// //
// // // --- INLINE STRIPE FORM COMPONENT ---
// // const CheckoutForm = ({ amount, projectId, onSuccess, onCancel }) => {
// //   const stripe = useStripe();
// //   const elements = useElements();
// //   const [loading, setLoading] = useState(false);
// //
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!stripe || !elements) return;
// //     setLoading(true);
// //     try {
// //       const { data } = await api.post("/payments/create-intent", { amount });
// //       const result = await stripe.confirmCardPayment(data.clientSecret, {
// //         payment_method: { card: elements.getElement(CardElement) }
// //       });
// //
// //       if (result.error) {
// //         alert(result.error.message);
// //       } else if (result.paymentIntent.status === "succeeded") {
// //         await api.post(`/donations/confirm/${projectId}`, {
// //           amount: amount,
// //           paymentIntentId: result.paymentIntent.id
// //         });
// //         onSuccess();
// //       }
// //     } catch (err) { alert("Payment failed"); }
// //     setLoading(false);
// //   };
// //
// //   return (
// //     <form onSubmit={handleSubmit} className="bg-white border-2 border-indigo-500 rounded-xl p-6 shadow-sm">
// //       <p className="text-gray-700 font-medium mb-4">Inline Donation: <span className="text-indigo-600 font-bold">₹{amount}</span></p>
// //       <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 mb-4 focus-within:ring-2 focus-within:ring-indigo-500">
// //         <CardElement options={{ style: { base: { fontSize: "16px", color: "#374151" } } }} />
// //       </div>
// //       <button
// //         className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors mb-2"
// //         type="submit"
// //         disabled={!stripe || loading}
// //       >
// //         {loading ? "Processing..." : "Confirm Payment"}
// //       </button>
// //       <button type="button" className="w-full text-gray-500 font-medium py-2 hover:text-gray-700 transition-colors" onClick={onCancel}>
// //         Cancel
// //       </button>
// //     </form>
// //   );
// // };
// //
// // // --- MAIN PROJECT DETAILS COMPONENT ---
// // const ProjectDetails = () => {
// //   const { id } = useParams();
// //   const [searchParams, setSearchParams] = useSearchParams();
// //   const { user } = useAuth();
// //
// //   const [project, setProject] = useState(null);
// //   const [updates, setUpdates] = useState([]);
// //   const [comments, setComments] = useState([]);
// //   const [donationAmount, setDonationAmount] = useState("");
// //   const [showInlineStripe, setShowInlineStripe] = useState(false);
// //
// //   const [newUpdateTitle, setNewUpdateTitle] = useState("");
// //   const [newUpdateDesc, setNewUpdateDesc] = useState("");
// //   const [newComment, setNewComment] = useState("");
// //
// //   useEffect(() => {
// //     if (searchParams.get("success") === "true") {
// //       handleSuccessRedirect();
// //     }
// //     fetchAllData();
// //   }, [id]);
// //
// //   const fetchAllData = async () => {
// //     try {
// //       const proj = await api.get(`/projects/${id}`);
// //       setProject(proj.data.data);
// //       const upds = await api.get(`/updates/${id}`).catch(() => ({ data: [] }));
// //       setUpdates(upds.data.data || upds.data || []);
// //       const comms = await api.get(`/comments/${id}`).catch(() => ({ data: [] }));
// //       setComments(comms.data.data || comms.data || []);
// //     } catch (err) { console.error("Error loading project data", err); }
// //   };
// //
// //   const handleSuccessRedirect = async () => {
// //     const savedAmount = localStorage.getItem("pendingDonationAmount");
// //     if (savedAmount) {
// //       try {
// //         await api.post(`/donations/confirm/${id}`, {
// //           amount: parseFloat(savedAmount),
// //           paymentIntentId: "STRIPE_CHECKOUT_SUCCESS"
// //         });
// //         alert("Thank you! Your donation was successful.");
// //         localStorage.removeItem("pendingDonationAmount");
// //         setSearchParams({});
// //         fetchAllData();
// //       } catch (err) { console.error("Redirect confirmation failed", err); }
// //     }
// //   };
// //
// //   const handleStripeRedirect = async () => {
// //     if (!donationAmount || donationAmount <= 0) return alert("Enter a valid amount");
// //     try {
// //       localStorage.setItem("pendingDonationAmount", donationAmount);
// //       const res = await api.post("/payments/create-checkout-session", {
// //         amount: donationAmount,
// //         projectId: id
// //       });
// //       window.location.href = res.data.url;
// //     } catch (err) { alert("Failed to start Stripe Checkout."); }
// //   };
// //
// //   const handlePostUpdate = async () => {
// //     if (!newUpdateTitle || !newUpdateDesc) return;
// //     await api.post(`/updates/${id}`, { title: newUpdateTitle, description: newUpdateDesc });
// //     setNewUpdateTitle(""); setNewUpdateDesc(""); fetchAllData();
// //   };
// //
// //   const handlePostComment = async () => {
// //     if (!newComment) return;
// //     await api.post(`/comments/${id}`, { content: newComment });
// //     setNewComment(""); fetchAllData();
// //   };
// //
// //   if (!project) return (
// //     <div className="flex justify-center items-center h-screen">
// //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
// //     </div>
// //   );
// //
// //   const isOwner = user && project.owner && user.id === project.owner.id;
// //   const progressPercent = Math.min((project.currentAmount / (project.maxAmount || 1)) * 100, 100);
// //
// //   return (
// //     <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
// //
// //         {/* Main Content Area (Left 2 Columns) */}
// //         <div className="lg:col-span-2 space-y-8">
// //           <div>
// //             <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">{project.pName}</h1>
// //             <div className="rounded-2xl overflow-hidden shadow-lg aspect-video bg-gray-200">
// //               <img
// //                 src={project.images?.[0]?.filePath || "https://via.placeholder.com/800x400"}
// //                 className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
// //               />
// //             </div>
// //           </div>
// //
// //           {/* Updates Section */}
// //           <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
// //             <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
// //               <span className="mr-2">📢</span> Official Updates
// //             </h3>
// //
// //             {isOwner && (
// //               <div className="bg-indigo-50 p-4 rounded-xl mb-6 space-y-3">
// //                 <input
// //                   className="w-full px-4 py-2 rounded-lg border-gray-200 border focus:ring-2 focus:ring-indigo-500"
// //                   placeholder="Update Title"
// //                   value={newUpdateTitle}
// //                   onChange={e => setNewUpdateTitle(e.target.value)}
// //                 />
// //                 <textarea
// //                   className="w-full px-4 py-2 rounded-lg border-gray-200 border focus:ring-2 focus:ring-indigo-500"
// //                   rows="2"
// //                   placeholder="Describe progress..."
// //                   value={newUpdateDesc}
// //                   onChange={e => setNewUpdateDesc(e.target.value)}
// //                 />
// //                 <button
// //                   className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
// //                   onClick={handlePostUpdate}
// //                 >
// //                   Post Update
// //                 </button>
// //               </div>
// //             )}
// //
// //             <div className="space-y-4">
// //               {updates.length > 0 ? updates.map((u, i) => (
// //                 <div key={i} className="bg-gray-50 p-5 rounded-xl border-l-4 border-indigo-600">
// //                   <h4 className="font-bold text-gray-900">{u.title}</h4>
// //                   <p className="text-gray-600 mt-1">{u.description}</p>
// //                   <time className="block mt-2 text-xs text-gray-400 uppercase tracking-wider font-semibold">
// //                     {new Date(u.createdAt || Date.now()).toLocaleDateString()}
// //                   </time>
// //                 </div>
// //               )) : (
// //                 <p className="text-gray-400 text-center py-4 italic">No updates have been posted yet.</p>
// //               )}
// //             </div>
// //           </section>
// //
// //           {/* Comments Section */}
// //           <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
// //             <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
// //               <span className="mr-2">💬</span> Community Discussion
// //             </h3>
// //             {user && (
// //               <div className="mb-8 flex gap-3">
// //                 <textarea
// //                   className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
// //                   rows="2"
// //                   placeholder="Ask a question..."
// //                   value={newComment}
// //                   onChange={e => setNewComment(e.target.value)}
// //                 />
// //                 <button
// //                   className="bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-600 transition-colors"
// //                   onClick={handlePostComment}
// //                 >
// //                   Comment
// //                 </button>
// //               </div>
// //             )}
// //             <div className="divide-y divide-gray-100">
// //               {comments.map((c, i) => (
// //                 <div key={i} className="py-4 text-gray-700">
// //                   <p className="leading-relaxed">{c.content || c.description}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           </section>
// //         </div>
// //
// //         {/* Sidebar (Right 1 Column) */}
// //         <aside className="lg:relative">
// //           <div className="sticky top-10 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
// //             <div className="mb-6">
// //               <h2 className="text-3xl font-bold text-gray-900">₹{project.currentAmount.toLocaleString()}</h2>
// //               <p className="text-gray-500">pledged of <span className="font-semibold">₹{project.maxAmount.toLocaleString()}</span> goal</p>
// //             </div>
// //
// //             {/* Progress Bar */}
// //             <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
// //               <div
// //                 className="bg-indigo-600 h-3 rounded-full transition-all duration-1000"
// //                 style={{ width: `${progressPercent}%` }}
// //               ></div>
// //             </div>
// //             <div className="flex justify-between text-sm font-bold text-gray-700 mb-8">
// //               <span>{progressPercent.toFixed(1)}% raised</span>
// //               <span>Goal: ₹{project.maxAmount.toLocaleString()}</span>
// //             </div>
// //
// //             <hr className="border-gray-100 mb-8" />
// //
// //             {!showInlineStripe ? (
// //               <div className="space-y-4">
// //                 <div className="relative">
// //                   <span className="absolute left-4 top-3 text-gray-400">₹</span>
// //                   <input
// //                     type="number"
// //                     className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
// //                     placeholder="Enter amount"
// //                     value={donationAmount}
// //                     onChange={e => setDonationAmount(e.target.value)}
// //                   />
// //                 </div>
// //
// //                 <button
// //                   className="w-full bg-[#635bff] text-white py-4 rounded-xl font-bold hover:bg-[#5249d9] shadow-lg transition-all transform active:scale-95"
// //                   onClick={handleStripeRedirect}
// //                 >
// //                   Quick Pay with Stripe 🔒
// //                 </button>
// //
// //                 <div className="relative flex items-center py-2">
// //                   <div className="flex-grow border-t border-gray-100"></div>
// //                   <span className="flex-shrink mx-4 text-gray-300 text-xs font-bold uppercase tracking-widest">OR</span>
// //                   <div className="flex-grow border-t border-gray-100"></div>
// //                 </div>
// //
// //                 <button
// //                   className="w-full border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
// //                   onClick={() => setShowInlineStripe(true)}
// //                 >
// //                   Use Inline Payment Form
// //                 </button>
// //               </div>
// //             ) : (
// //               <Elements stripe={stripePromise}>
// //                 <CheckoutForm
// //                   amount={donationAmount}
// //                   projectId={id}
// //                   onSuccess={() => { setShowInlineStripe(false); fetchAllData(); }}
// //                   onCancel={() => setShowInlineStripe(false)}
// //                 />
// //               </Elements>
// //             )}
// //
// //             <p className="mt-6 text-xs text-center text-gray-400">
// //               Payments are secure and encrypted. By donating, you agree to our Terms of Service.
// //             </p>
// //           </div>
// //         </aside>
// //
// //       </div>
// //     </div>
// //   );
// // };
// //
// // export default ProjectDetails;
//
// import { useParams, useSearchParams, useNavigate } from "react-router-dom";
// import { useEffect, useState, useCallback } from "react";
// import api from "../api/axios";
// import { useAuth } from "../context/AuthContext";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import {CheckoutForm} from "@stripe/react-stripe-js/checkout";
//
// const stripePromise = loadStripe("pk_test_51SWhfbFsm9Dx7kiAwJb1n4fi8bN7bl6R8k5MMIHoUysNJx5krILrGWrvipUnmWCbYOdhOE0BblUAciNW8OPVhsds00pIeAhz7S");
//
// const ProjectDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { user } = useAuth();
//
//   const [project, setProject] = useState(null);
//   const [updates, setUpdates] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [donationAmount, setDonationAmount] = useState("");
//   const [showInlineStripe, setShowInlineStripe] = useState(false);
//
//   // Image Viewer State
//   const [selectedImg, setSelectedImg] = useState(null);
//
//   const [newUpdateTitle, setNewUpdateTitle] = useState("");
//   const [newUpdateDesc, setNewUpdateDesc] = useState("");
//   const [newComment, setNewComment] = useState("");
//
//   // Handle ESC key to close image
//   const handleKeyDown = useCallback((e) => {
//     if (e.key === "Escape") setSelectedImg(null);
//   }, []);
//
//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     if (searchParams.get("success") === "true") handleSuccessRedirect();
//     fetchAllData();
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [id, handleKeyDown]);
//
//   const fetchAllData = async () => {
//     try {
//       const proj = await api.get(`/projects/${id}`);
//       setProject(proj.data.data);
//       const upds = await api.get(`/updates/${id}`).catch(() => ({ data: [] }));
//       setUpdates(upds.data.data || upds.data || []);
//       const comms = await api.get(`/comments/${id}`).catch(() => ({ data: [] }));
//       setComments(comms.data.data || comms.data || []);
//     } catch (err) { console.error("Error loading project data", err); }
//   };
//
//   const handleSuccessRedirect = async () => {
//     const savedAmount = localStorage.getItem("pendingDonationAmount");
//     if (savedAmount) {
//       try {
//         await api.post(`/donations/confirm/${id}`, {
//           amount: parseFloat(savedAmount),
//           paymentIntentId: "STRIPE_CHECKOUT_SUCCESS"
//         });
//         localStorage.removeItem("pendingDonationAmount");
//         setSearchParams({});
//         fetchAllData();
//       } catch (err) { console.error(err); }
//     }
//   };
//
//   const handleStripeRedirect = async () => {
//     if (!donationAmount || donationAmount <= 0) return alert("Enter a valid amount");
//     try {
//       localStorage.setItem("pendingDonationAmount", donationAmount);
//       const res = await api.post("/payments/create-checkout-session", { amount: donationAmount, projectId: id });
//       window.location.href = res.data.url;
//     } catch (err) { alert("Failed to start Stripe Checkout."); }
//   };
//
//   if (!project) return <div className="h-screen flex items-center justify-center font-bold text-indigo-600">Loading...</div>;
//
//   const isOwner = user && project.owner && user.id === project.owner.id;
//   const progressPercent = Math.min((project.currentAmount / (project.maxAmount || 1)) * 100, 100);
//
//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//
//       {/* --- FULL SCREEN IMAGE MODAL --- */}
//       {selectedImg && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm p-4">
//           <button
//             onClick={() => setSelectedImg(null)}
//             className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
//           >
//             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//           <img
//             src={selectedImg}
//             alt="Full view"
//             className="max-w-full max-h-full rounded-lg shadow-2xl object-contain animate-in zoom-in duration-300"
//           />
//         </div>
//       )}
//
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
//
//         {/* Main Content */}
//         <div className="lg:col-span-2 space-y-8">
//           <div>
//             <h1 className="text-4xl font-black text-gray-900 mb-6">{project.pName}</h1>
//
//             {/* Main Featured Image */}
//             <div
//               className="rounded-2xl overflow-hidden shadow-lg aspect-video bg-gray-200 cursor-zoom-in group"
//               onClick={() => setSelectedImg(project.images?.[0]?.filePath)}
//             >
//               <img
//                 src={project.images?.[0]?.filePath || "https://via.placeholder.com/800x400"}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//               />
//             </div>
//
//             {/* Thumbnail Gallery */}
//             <div className="grid grid-cols-4 gap-4 mt-4">
//               {project.images?.map((img, index) => (
//                 <div
//                   key={index}
//                   onClick={() => setSelectedImg(img.filePath)}
//                   className="aspect-square rounded-xl overflow-hidden cursor-zoom-in border-2 border-transparent hover:border-indigo-500 transition-all shadow-sm"
//                 >
//                   <img src={img.filePath} className="w-full h-full object-cover" />
//                 </div>
//               ))}
//             </div>
//           </div>
//
//           {/* Updates & Comments (Simplified Tailwind for brevity, keep your previous version's UI) */}
//           <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//              <h3 className="text-xl font-bold mb-4">📢 Updates</h3>
//              {updates.map((u, i) => (
//                <div key={i} className="mb-4 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-600">
//                  <h4 className="font-bold">{u.title}</h4>
//                  <p className="text-gray-600">{u.description}</p>
//                </div>
//              ))}
//           </section>
//         </div>
//
//         {/* Sidebar */}
//         <aside>
//           <div className="sticky top-10 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//             <h2 className="text-3xl font-bold text-gray-900">₹{project.currentAmount.toLocaleString()}</h2>
//             <p className="text-gray-500 mb-4 font-medium">raised of ₹{project.maxAmount.toLocaleString()}</p>
//
//             <div className="w-full bg-gray-100 rounded-full h-3 mb-6">
//               <div className="bg-indigo-600 h-3 rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
//             </div>
//
//             {!showInlineStripe ? (
//               <div className="space-y-4">
//                 <input
//                   type="number"
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Enter amount (₹)"
//                   value={donationAmount}
//                   onChange={e => setDonationAmount(e.target.value)}
//                 />
//                 <button
//                   className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
//                   onClick={handleStripeRedirect}
//                 >
//                   Back this project
//                 </button>
//                 <button
//                   className="w-full border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
//                   onClick={() => setShowInlineStripe(true)}
//                 >
//                   Use Inline Form
//                 </button>
//               </div>
//             ) : (
//               <Elements stripe={stripePromise}>
//                 <CheckoutForm
//                     amount={donationAmount}
//                     projectId={id}
//                     onSuccess={() => { setShowInlineStripe(false); fetchAllData(); }}
//                     onCancel={() => setShowInlineStripe(false)}
//                 />
//               </Elements>
//             )}
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };
//
// // ... keep your CheckoutForm component below this ...
//
// export default ProjectDetails;


import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51SWhfbFsm9Dx7kiAwJb1n4fi8bN7bl6R8k5MMIHoUysNJx5krILrGWrvipUnmWCbYOdhOE0BblUAciNW8OPVhsds00pIeAhz7S");

// --- INLINE STRIPE FORM COMPONENT ---
const CheckoutForm = ({ amount, projectId, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    try {
      const { data } = await api.post("/payments/create-intent", { amount });
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) }
      });

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        await api.post(`/donations/confirm/${projectId}`, {
          amount: amount,
          paymentIntentId: result.paymentIntent.id
        });
        onSuccess();
      }
    } catch (err) { alert("Payment failed"); }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-2 border-indigo-500 rounded-xl p-6 shadow-sm">
      <p className="text-gray-700 font-medium mb-4">Inline Donation: <span className="text-indigo-600 font-bold">₹{amount}</span></p>
      <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 mb-4 focus-within:ring-2 focus-within:ring-indigo-500">
        <CardElement options={{ style: { base: { fontSize: "16px", color: "#374151" } } }} />
      </div>
      <button
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors mb-2"
        type="submit"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Confirm Payment"}
      </button>
      <button type="button" className="w-full text-gray-500 font-medium py-2 hover:text-gray-700 transition-colors" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

// --- MAIN PROJECT DETAILS COMPONENT ---
const ProjectDetails = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [comments, setComments] = useState([]);
  const [donationAmount, setDonationAmount] = useState("");
  const [showInlineStripe, setShowInlineStripe] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null); // Image Modal State

  const [newUpdateTitle, setNewUpdateTitle] = useState("");
  const [newUpdateDesc, setNewUpdateDesc] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") setSelectedImg(null);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (searchParams.get("success") === "true") {
      handleSuccessRedirect();
    }
    fetchAllData();
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [id, handleKeyDown]);

  const fetchAllData = async () => {
    try {
      const proj = await api.get(`/projects/${id}`);
      setProject(proj.data.data);
      const upds = await api.get(`/updates/${id}`).catch(() => ({ data: [] }));
      setUpdates(upds.data.data || upds.data || []);
      const comms = await api.get(`/comments/${id}`).catch(() => ({ data: [] }));
      setComments(comms.data.data || comms.data || []);
    } catch (err) { console.error("Error loading project data", err); }
  };

  const handleSuccessRedirect = async () => {
    const savedAmount = localStorage.getItem("pendingDonationAmount");
    if (savedAmount) {
      try {
        await api.post(`/donations/confirm/${id}`, {
          amount: parseFloat(savedAmount),
          paymentIntentId: "STRIPE_CHECKOUT_SUCCESS"
        });
        localStorage.removeItem("pendingDonationAmount");
        setSearchParams({});
        fetchAllData();
      } catch (err) { console.error("Redirect confirmation failed", err); }
    }
  };

  const handleStripeRedirect = async () => {
    if (!donationAmount || donationAmount <= 0) return alert("Enter a valid amount");
    try {
      localStorage.setItem("pendingDonationAmount", donationAmount);
      const res = await api.post("/payments/create-checkout-session", {
        amount: donationAmount,
        projectId: id
      });
      window.location.href = res.data.url;
    } catch (err) { alert("Failed to start Stripe Checkout."); }
  };

  const handlePostUpdate = async () => {
    if (!newUpdateTitle || !newUpdateDesc) return;
    await api.post(`/updates/${id}`, { title: newUpdateTitle, description: newUpdateDesc });
    setNewUpdateTitle(""); setNewUpdateDesc(""); fetchAllData();
  };

  const handlePostComment = async () => {
    if (!newComment) return;
    await api.post(`/comments/${id}`, { content: newComment });
    setNewComment(""); fetchAllData();
  };

  if (!project) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

 const isOwner = user && project?.owner?.id === user.id;
  console.log("project.owner  "+ user)
  console.log("project.owner  "+ project.owner)
  // console.log("project.owner id "+ project.owner.id)
  // const isOwner = user && project.owner && user.id === project.owner.id;
  const progressPercent = Math.min((project.currentAmount / (project.maxAmount || 1)) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">

      {/* --- FULL SCREEN IMAGE MODAL (From Version 2) --- */}
      {selectedImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setSelectedImg(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-gray-300">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img src={selectedImg} alt="View" className="max-w-full max-h-full rounded-lg shadow-2xl object-contain animate-in zoom-in duration-300" />
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* --- LEFT COLUMN: CONTENT & GALLERY --- */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-6 leading-tight">{project.pName}</h1>

            {/* Featured Image */}
            <div  className="rounded-2xl overflow-hidden shadow-lg aspect-video bg-gray-200 cursor-zoom-in group"  onClick={() => setSelectedImg(project.images?.[0]?.filePath)} >
              <img  src={project.images?.[0]?.filePath || "https://via.placeholder.com/800x400"}  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Gallery Thumbnails (From Version 2) */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              {project.images?.slice(1).map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImg(img.filePath)}
                  className="aspect-square rounded-xl overflow-hidden cursor-zoom-in border-2 border-transparent hover:border-indigo-500 transition-all shadow-sm"
                >
                  <img src={img.filePath} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Updates Section (From Version 1) */}
         {/* Updates Section */}
          <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <span className="mr-2">📢</span> Official Updates
              </h3>
              {/* Optional: Show an "Owner" badge */}
              {isOwner && <span className="text-[10px] bg-indigo-100 text-indigo-700 font-black px-2 py-1 rounded-md uppercase">Author View</span>}
            </div>

            {/* POST UPDATE FORM - Visible only to Project Owner */}
            {isOwner && (
              <div className="bg-indigo-50/50 p-5 rounded-2xl mb-8 border border-indigo-100">
                <p className="text-xs font-bold text-indigo-600 mb-3 uppercase tracking-wider">Post a new update</p>
                <div className="space-y-3">
                  <input  className="w-full px-4 py-2 rounded-lg border-gray-200 border focus:ring-2 focus:ring-indigo-500 outline-none font-bold"  placeholder="Update Title (e.g., We reached 50%!)"  value={newUpdateTitle}  onChange={e => setNewUpdateTitle(e.target.value)} />
                  <textarea  className="w-full px-4 py-2 rounded-lg border-gray-200 border focus:ring-2 focus:ring-indigo-500 outline-none resize-none"  rows="3"  placeholder="What's the latest news on the project?"  value={newUpdateDesc}  onChange={e => setNewUpdateDesc(e.target.value)} />
                  <button  className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"  onClick={handlePostUpdate} >
                    Publish Update
                  </button>
                </div>
              </div>
            )}

            {/* Updates Feed */}
            <div className="space-y-6">
              {updates.length > 0 ? updates.map((u, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-indigo-200">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-indigo-600 border-4 border-white"></div>
                  <h4 className="font-black text-gray-900">{u.title}</h4>
                  <p className="text-gray-600 mt-2 text-sm leading-relaxed">{u.description}</p>
                  <time className="block mt-3 text-[10px] text-gray-400 font-bold uppercase">
                    {new Date(u.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </time>
                </div>
              )) : (
                <div className="text-center py-10">
                  <p className="text-gray-400 italic text-sm">No official updates yet. Stay tuned!</p>
                </div>
              )}
            </div>
          </section>
          {/* Comments Section (From Version 1) */}
          {/* Comments Section */}
            <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-2">💬</span> Community Discussion
              </h3>

              {/* Input Area */}
              {user && (
                <div className="mb-8 flex flex-col sm:flex-row gap-3">
                  <textarea  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"  rows="2"  placeholder="Ask a question or leave a note..."  value={newComment}  onChange={(e) => setNewComment(e.target.value)} />
                  <button  className="h-fit bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all active:scale-95 shadow-md shadow-emerald-100"  onClick={handlePostComment} >
                    Post
                  </button>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((c, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                        {c.user?.name?.charAt(0) || "U"}
                      </div>
                      <span className="font-bold text-sm text-gray-800">{c.user?.name || "Supporter"}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed break-words whitespace-pre-wrap">
                      {c.content || c.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR (Combined) --- */}
        <aside className="lg:relative">
          <div className="sticky top-10 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="mb-2">
              <h2 className="text-4xl font-black text-indigo-600">₹{project.currentAmount.toLocaleString()}</h2>
              <p className="text-gray-500 mt-1">pledged of <span className="font-bold text-gray-800">₹{project.maxAmount.toLocaleString()}</span></p>
            </div>

            {/* PROGRESS BAR & PERCENTAGE RAISED */}
            <div className="mt-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-3xl font-bold text-gray-900">{progressPercent.toFixed(1)}%</span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Raised</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <hr className="my-8 border-gray-100" />

            {!showInlineStripe ? (
              <div className="space-y-4">
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400 font-bold">₹</span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-lg"
                    placeholder="0.00"
                    value={donationAmount}
                    onChange={e => setDonationAmount(e.target.value)}
                  />
                </div>

                <button
                  className="w-full bg-[#635bff] text-white py-4 rounded-xl font-bold hover:bg-[#5249d9] shadow-lg transition-all transform active:scale-95 text-lg"
                  onClick={handleStripeRedirect}
                >
                  Pay via Stripe 🔒
                </button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-100"></div>
                  <span className="flex-shrink mx-4 text-gray-300 text-xs font-black">OR</span>
                  <div className="flex-grow border-t border-gray-100"></div>
                </div>

                <button
                  className="w-full border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
                  onClick={() => setShowInlineStripe(true)}
                >
                  Show Card Form
                </button>
              </div>
            ) : (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  amount={donationAmount}
                  projectId={id}
                  onSuccess={() => { setShowInlineStripe(false); fetchAllData(); }}
                  onCancel={() => setShowInlineStripe(false)}
                />
              </Elements>
            )}

            <p className="mt-6 text-[10px] text-center text-gray-400 uppercase tracking-widest font-bold">
              Secure Infrastructure • Encrypted
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default ProjectDetails;