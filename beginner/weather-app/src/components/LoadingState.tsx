import { Icon } from '@iconify/react'

const LoadingState = () => {
  return (
    <div className="place-self-center flex flex-col text-center text-sm items-center justify-center">
      <Icon icon="eos-icons:loading" className="animate-spin" width={30} />
      <p className="mt-2">Fetching weather data...</p>
    </div>
  );
};

export default LoadingState;
