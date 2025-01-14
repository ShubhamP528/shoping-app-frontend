const ProductCardShimmer = ({ horiz }) => (
  <div
    className={` ${
      horiz ? "min-w-[300px] max-w-[305px] h-full" : "w-full max-w-sm"
    }  p-6 bg-gray-200 rounded-lg animate-pulse`}
  >
    <div className="h-48 bg-gray-300"></div>
    <div className="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>
    <div className="mt-2 h-4 bg-gray-300 rounded"></div>
    <div className="mt-4 h-6 bg-gray-300 rounded w-1/2"></div>
  </div>
);

export default ProductCardShimmer;
