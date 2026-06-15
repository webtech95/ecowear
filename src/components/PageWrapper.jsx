const PageWrapper = ({ title, children }) => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      
      {/* Main heading - always visible */}
      <h1 className="text-5xl font-bold text-white text-center mb-4">
        Customer Service
      </h1>

      {/* Page title */}
      <p className="text-center text-gray-400 text-lg mb-10">
        {title}
      </p>

      {/* Content Card */}
      <div
        className="
          bg-black
          text-white
          rounded-2xl
          shadow-lg
          shadow-black/40
          p-8
          transition
          duration-300
          hover:shadow-2xl
          hover:-translate-y-1
        "
      >
        <div className="space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
