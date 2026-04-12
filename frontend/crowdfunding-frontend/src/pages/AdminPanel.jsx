// import { useEffect, useState } from "react";
// import api from "../api/axios";
//
// const AdminPanel = () => {
//   const [requests, setRequests] = useState([]);
//   const [feedback, setFeedback] = useState({}); // Stores feedback per request ID
//
//   useEffect(() => { fetchRequests(); }, []);
//
//   const fetchRequests = async () => {
//     const res = await api.get("/admin/verifications");
//     setRequests(res.data);
//   };
//
//   const handleAction = async (id, status) => {
//     try {
//       await api.put(`/admin/verifications/${id}`, {
//         status: status,
//         feedback: feedback[id] || ""
//       });
//       alert(`Project ${status}`);
//       fetchRequests(); // Refresh list
//     } catch (err) { alert("Failed to update status"); }
//   };
//
//   return (
//     <div className="container">
//       <h1>Admin Dashboard</h1>
//       <div className="card">
//         <h3>Pending Verifications</h3>
//         <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
//           <thead>
//             <tr style={{ textAlign: "left", borderBottom: "2px solid #eee" }}>
//               <th>Project</th>
//               <th>Owner</th>
//               <th>Document</th>
//               <th>Feedback Message</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((req) => (
//               <tr key={req.id} style={{ borderBottom: "1px solid #eee" }}>
//                 <td>{req.project?.pName}</td>
//                 <td>{req.user?.name}</td>
//                 <td><a href={req.documentUrl} target="_blank">View Docs</a></td>
//                 <td>
//                   <input
//                     type="text"
//                     placeholder="Leave a message..."
//                     onChange={(e) => setFeedback({...feedback, [req.id]: e.target.value})}
//                     style={{ padding: "5px" }}
//                   />
//                 </td>
//                 <td>
//                   <button onClick={() => handleAction(req.id, "APPROVED")} style={{ color: "green", marginRight: "10px" }}>Approve</button>
//                   <button onClick={() => handleAction(req.id, "REJECTED")} style={{ color: "red" }}>Reject</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };
//
// export default AdminPanel;

import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminPanel = () => {
  const [requests, setRequests] = useState([]);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/admin/verifications");
      setRequests(res.data || []);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  };

  const handleAction = async (id, status) => {
    try {
      await api.put(`/admin/verifications/${id}`, {
        status: status,
        feedback: feedback[id] || "",
      });
      // Toast/Alert
      const color = status === "APPROVED" ? "bg-green-500" : "bg-red-500";
      alert(`Project ${status} successfully`);
      fetchRequests();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1 font-medium">Verify and manage project authenticity requests.</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            <span className="text-sm font-bold text-gray-600 uppercase tracking-widest">
              {requests.length} Pending Actions
            </span>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-wider">Project Details</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-wider">Documents</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-wider">Feedback Message</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-wider text-right">Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.length > 0 ? requests.map((req) => (
                  <tr key={req.id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="font-bold text-gray-900">{req.project?.pName || "Unknown Project"}</div>
                      <div className="text-xs text-gray-400 mt-1 font-mono"> ID: #{String(req.id).slice(-6)} </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600 font-medium">
                      {req.user?.name || "Anonymous"}
                    </td>
                    <td className="px-6 py-5">
                      <a
                        href={req.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center px-3 py-1 rounded-md bg-indigo-50 text-indigo-600 text-xs font-bold hover:bg-indigo-100 transition-colors border border-indigo-100"
                      >
                        <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Files
                      </a>
                    </td>
                    <td className="px-6 py-5">
                      <input
                        type="text"
                        placeholder="Explain reason..."
                        value={feedback[req.id] || ""}
                        onChange={(e) => setFeedback({...feedback, [req.id]: e.target.value})}
                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                      />
                    </td>
                    <td className="px-6 py-5 text-right space-x-2">
                      <button
                        onClick={() => handleAction(req.id, "APPROVED")}
                        className="px-4 py-2 bg-emerald-500 text-white text-xs font-black rounded-lg hover:bg-emerald-600 transition-all shadow-sm active:scale-95 uppercase tracking-tighter"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(req.id, "REJECTED")}
                        className="px-4 py-2 bg-white text-red-500 border border-red-200 text-xs font-black rounded-lg hover:bg-red-50 transition-all shadow-sm active:scale-95 uppercase tracking-tighter"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                          <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-gray-500 font-bold">Inbox clear! No pending verifications.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;