// CartSkeletonLoader.jsx
const CartSkeletonLoader = () => {
  return (
    <div className="animate-pulse flex space-x-4 p-6 max-w-full w-full mx-auto bg-white rounded-lg shadow-md">
      <div className="bg-gray-300 rounded-md h-24 w-24"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
        <div className="flex items-center mt-4">
          <div className="h-4 bg-gray-300 rounded w-16"></div>
          <div className="ml-auto bg-gray-300 rounded px-4 py-1 w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeletonLoader;
