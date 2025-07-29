export const ErrorPage = ({name}:{name:string}) => {
  return (
    <div className="p-6 text-center">
      <div className="text-red-500">Error loading {name}</div>
    </div>
  );
};
