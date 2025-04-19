import { TrendingUp, TrendingDown } from "lucide-react";

const Cardboard = ({ title, value }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-medium text-gray-600">{title}</h2>
        <button className="text-sm text-gray-500 border border-gray-300 rounded px-2 py-1 hover:bg-gray-100">
          View
        </button>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default Cardboard;