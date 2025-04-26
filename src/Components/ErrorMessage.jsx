import "animate.css";

const ErrorMessage = () => {
  return (
    <div className="animate__animated animate__pulse animate__infinite text-center text-xl text-gray-600 mt-4 p-4 border-2 border-dashed border-gray-400 rounded-xl max-w-5xl mx-auto">
      <p>No Todos Available. Add a new Task!</p>
    </div>
  );
};

export default ErrorMessage;
