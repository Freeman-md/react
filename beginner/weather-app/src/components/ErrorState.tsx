type ErrorStateProps = {
  message: string;
};

const ErrorState = ({ message }: ErrorStateProps) => {
  return (
    <div className="place-self-center text-center text-red-600">
      <p className="text-lg font-medium">🚫 {message}</p>
      <p className="text-sm text-gray-500 mt-2">
        Try searching for another city.
      </p>
    </div>
  );
};

export default ErrorState;
