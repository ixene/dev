export default function PluginDetail({ plugin, onBack }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[90vh] bg-gray-900 text-white">
      <button
        onClick={onBack}
        className="absolute top-5 left-5 bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-500"
      >
        Back
      </button>
      <h2 className="text-2xl font-bold mb-4">{plugin.name}</h2>
      <div className="w-[80%] h-[60%] bg-gray-800 rounded-lg p-4 shadow-lg">
        <p>Configuration panel for {plugin.name}.</p>
      </div>
    </div>
  );
}
