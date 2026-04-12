// import { useNavigate } from "react-router-dom";
//
// const ProjectCard = ({ project }) => {
//   const navigate = useNavigate();
//
//   const percent = Math.min(
//     (project.currentAmount / project.maxAmount) * 100,
//     100
//   );
//
//   return (
//     <div className="card" onClick={() => navigate(`/project/${project.pId}`)} style={{ cursor: "pointer" }}>
//
//       <img
//         src={project.images?.[0]?.filePath || "https://via.placeholder.com/300"}
//         alt=""
//         style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
//       />
//
//       <h3>{project.pName}</h3>
//       <p>{project.description}</p>
//
//       <div className="progress">
//         <div className="progress-bar" style={{ width: `${percent}%` }} />
//       </div>
//
//       <p>{percent.toFixed(0)}% funded</p>
//       <p>₹{project.currentAmount} / ₹{project.maxAmount}</p>
//
//       <button className="btn-secondary">View & Donate</button>
//     </div>
//   );
// };
//
// export default ProjectCard;

import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  // Safety check to prevent NaN if maxAmount is 0 or missing
  const current = project.currentAmount || 0;
  const max = project.maxAmount || 1;
  const percent = Math.min((current / max) * 100, 100);

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
      onClick={() => navigate(`/project/${project.pId}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden bg-gray-200">
        <img
          src={project.images?.[0]?.filePath || "https://via.placeholder.com/300"}
          alt={project.pName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-indigo-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">
            Verified
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {project.pName || "Untitled Project"}
        </h3>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2 flex-grow">
          {project.description || "No description provided for this campaign."}
        </p>

        {/* Progress Section */}
        <div className="mt-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-indigo-600 font-bold text-base">
              {percent.toFixed(0)}% <span className="text-xs text-gray-400 font-medium tracking-normal">funded</span>
            </span>
            <span className="text-xs font-bold text-gray-900">
              ₹{current.toLocaleString()}
            </span>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-1000"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="text-[11px] text-gray-400 mt-2 font-medium">
            Goal: ₹{max.toLocaleString()}
          </p>
        </div>

        {/* Improved Button */}
        <button className="mt-5 w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm transform transition-all group-hover:bg-indigo-600 active:scale-95 shadow-lg shadow-gray-200">
          View & Donate
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;