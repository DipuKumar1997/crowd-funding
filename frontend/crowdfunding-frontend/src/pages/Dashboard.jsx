import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import ProjectCard from "../components/ProjectCard"; // Reusing the UI we fixed

const Dashboard = () => {
  const { user } = useAuth();
  const [myProjects, setMyProjects] = useState([]);
  const [myDonations, setMyDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetching all projects and donations associated with this user
        const [projRes, donRes] = await Promise.all([
          api.get("/projects/user/my-campaigns"),
          api.get("/donations/user/my-contributions")
        ]);

        setMyProjects(projRes.data.data || []);
        setMyDonations(donRes.data.data || []);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchDashboardData();
  }, [user]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome back, {user?.name}!</h1>
          <p className="text-gray-500 mt-2 font-medium">Track your impact and manage your active campaigns.</p>
        </div>

        {/* Impact Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Campaigns Started</p>
            <h3 className="text-4xl font-black text-gray-900 mt-2">{myProjects.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Total Donated</p>
            <h3 className="text-4xl font-black text-gray-900 mt-2">
              ₹{myDonations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
            </h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm font-bold text-amber-600 uppercase tracking-widest">Supporters Helped</p>
            <h3 className="text-4xl font-black text-gray-900 mt-2">{myDonations.length}</h3>
          </div>
        </div>

        {/* --- MY CAMPAIGNS SECTION --- */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900">My Campaigns</h2>
            <button className="text-indigo-600 font-bold text-sm hover:underline">+ Launch New Project</button>
          </div>

          {myProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {myProjects.map((project) => (
                <div key={project.pId} className="relative">
                  <ProjectCard project={project} />
                  {/* Owner Label Overlay */}
                  <div className="absolute top-2 right-2 bg-indigo-600 text-white text-[10px] px-2 py-1 rounded font-black shadow-lg">
                    OWNER
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">You haven't started any campaigns yet.</p>
            </div>
          )}
        </section>

        {/* --- CONTRIBUTIONS SECTION --- */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-6">My Contributions</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-wider">Project Name</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {myDonations.map((don, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{don.project?.pName}</td>
                    <td className="px-6 py-4 text-indigo-600 font-black">₹{don.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(don.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-1 rounded-md uppercase">Successful</span>
                    </td>
                  </tr>
                ))}
                {myDonations.length === 0 && (
                    <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-gray-400">You haven't donated to any projects yet.</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;