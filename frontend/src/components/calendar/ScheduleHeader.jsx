const ScheduleHeader = () => {
  return (
    <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
      <div className="flex justify-center bg-white py-2">
        <span>M</span>
        <span className="sr-only sm:not-sr-only">on</span>
      </div>
      <div className="flex justify-center bg-white py-2">
        <span>T</span>
        <span className="sr-only sm:not-sr-only">ue</span>
      </div>
      <div className="flex justify-center bg-white py-2">
        <span>W</span>
        <span className="sr-only sm:not-sr-only">ed</span>
      </div>
      <div className="flex justify-center bg-white py-2">
        <span>T</span>
        <span className="sr-only sm:not-sr-only">hu</span>
      </div>
      <div className="flex justify-center bg-white py-2">
        <span>F</span>
        <span className="sr-only sm:not-sr-only">ri</span>
      </div>
      <div className="flex justify-center bg-white py-2">
        <span>S</span>
        <span className="sr-only sm:not-sr-only">at</span>
      </div>
      <div className="flex justify-center bg-white py-2">
        <span>S</span>
        <span className="sr-only sm:not-sr-only">un</span>
      </div>
    </div>
  );
};

export default ScheduleHeader;
