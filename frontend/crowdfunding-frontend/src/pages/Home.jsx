// import { useEffect, useState } from "react";
// import { getProjects } from "../api/projectApi";
// import ProjectCard from "../components/ProjectCard";
//
// const Home = () => {
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//
//   useEffect(() => {
//     getProjects()
//       .then((res) => {
//         if (res.data.success) {
//           const data = res.data.data || [];
//           setProjects(data);
//           setFilteredProjects(data);
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to fetch projects:", err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);
//
//   // Simple Search Logic
//   // useEffect(() => {
//   //   const results = projects.filter(p =>
//   //     p.pName.toLowerCase().includes(searchTerm.toLowerCase())
//   //   );
//   //   setFilteredProjects(results);
//   // }, [searchTerm, projects]);
//     useEffect(() => {
//       const results = projects.filter(p => {
//         // We use ?. to safely access pName and || "" to provide a default empty string
//         const projectName = p?.pName || "";
//         return projectName.toLowerCase().includes(searchTerm.toLowerCase());
//       });
//       setFilteredProjects(results);
//     }, [searchTerm, projects]);
//
//   return (
//     <div className="min-h-screen bg-[#f9fafb] pb-20">
//       {/* Hero Header Section */}
//       <div className="bg-white border-b border-gray-200 pt-16 pb-12 px-4 sm:px-6 lg:px-8 mb-10">
//         <div className="max-w-7xl mx-auto text-center">
//           <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
//             Bring your creative ideas to <span className="text-indigo-600">life.</span>
//           </h1>
//           <p className="max-w-2xl mx-auto text-lg text-gray-500">
//             Join our community of backers supporting thousands of innovative projects across technology, art, and social causes.
//           </p>
//
//           {/* Search Bar */}
//           <div className="mt-8 max-w-md mx-auto relative">
//             <input
//               type="text"
//               placeholder="Search campaigns..."
//               className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <svg className="h-5 w-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//         </div>
//       </div>
//
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Title */}
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-xl font-bold text-gray-800">
//             {searchTerm ? `Search results for "${searchTerm}"` : "Active Campaigns"}
//           </h2>
//           <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
//             {filteredProjects.length} Projects
//           </span>
//         </div>
//
//         {/* Content Area */}
//         {loading ? (
//           <div className="flex flex-col justify-center items-center h-64 space-y-4">
//             <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-indigo-600"></div>
//             <p className="text-gray-500 font-medium animate-pulse">Loading amazing projects...</p>
//           </div>
//         ) : filteredProjects.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {filteredProjects.map((p) => (
//               <div key={p.pId} className="transform hover:-translate-y-1 transition-all duration-300">
//                 <ProjectCard project={p} />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
//             <div className="bg-gray-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-bold text-gray-900 tracking-tight">No projects found</h3>
//             <p className="mt-2 text-gray-500 max-w-xs mx-auto">
//               We couldn't find any projects matching your criteria. Try adjusting your search or check back later!
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
//
// export default Home;

import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";
import ProjectCard from "../components/ProjectCard";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProjects()
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data || [];
          setProjects(data);
          setFilteredProjects(data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = projects.filter(p => {
      const projectName = p?.pName || "";
      return projectName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredProjects(results);
  }, [searchTerm, projects]);

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-20">
      {/* Hero Header Section */}
      <div className="bg-white border-b border-gray-100 pt-20 pb-16 px-4 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
            The future is funded by you
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
            Bring your creative ideas to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">life.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed">
            Join our community of backers supporting thousands of innovative projects across technology, art, and social causes.
          </p>

           {/* Search Bar */}
        <div className="mt-10 max-w-lg mx-auto relative group">
          {/* Icon - Centered vertically and nudged right */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg   className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none"  stroke="currentColor"  viewBox="0 0 24 24" >
              <path  strokeLinecap="round"  strokeLinejoin="round"  strokeWidth="2.5"  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"   />
            </svg>
          </div>
        {/* Input - Added precise padding to clear the icon */}
        <input  type="text"  placeholder="Search campaigns, creators, or causes..."  className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm text-gray-700 placeholder:text-gray-400 placeholder:font-normal font-medium"  value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl font-black text-gray-900">
              {searchTerm ? "Search Results" : "Featured Campaigns"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">Explore our handpicked selection of active projects.</p>
          </div>
          <div className="flex items-center space-x-2">
             <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Live:</span>
             <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-lg border border-indigo-100">
              {filteredProjects.length} Projects
            </span>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-80 space-y-6">
            <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
            </div>
            <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Fetching campaigns...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {filteredProjects.map((p) => (
              <ProjectCard key={p.pId} project={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 px-19 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="bg-gray-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">No projects found</h3>
            <p className="mt-2 text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">
              We couldn't find anything matching "<span className="text-indigo-600 font-bold">{searchTerm}</span>". Try different keywords or browse all.
            </p>
            <button onClick={() => setSearchTerm("")} className="mt-6 text-indigo-600 font-bold hover:text-indigo-700 text-sm underline underline-offset-4" >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;