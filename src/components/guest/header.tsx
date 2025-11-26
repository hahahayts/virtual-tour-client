interface Props {
  title: string;
  description: string;
}

export const Header = ({ title, description }: Props) => {
  return (
    <div
      className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 text-white py-12 sm:py-16"
      style={{
        animation: "slide-in-from-top-5 0.8s ease-out both",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            {title} <span className="text-yellow-300">Tubigon</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed px-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
