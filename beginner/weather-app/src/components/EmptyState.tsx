import { Icon } from '@iconify/react'

const EmptyState = () => {
  return (
    <div className="max-w-1/2 mx-auto h-3/4 place-self-center flex flex-col items-center justify-center space-y-2 text-center">
      <Icon icon="material-symbols-light:hourglass-empty" width={60} />
      <h2 className="text-3xl font-semibold">No weather data yet</h2>
      <p className="text-sm text-gray-700">
        Search for a city to see the current weather conditions
      </p>
    </div>
  );
};

export default EmptyState;
