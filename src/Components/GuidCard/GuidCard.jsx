const GuidCard = () => {
  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3  mx-auto border border-white bg-white">
          <div className="w-full md:w-1/3 bg-white grid place-items-center">
            <img
              src="https://images.unsplash.com/photo-1508528075895-be7a6cabd37a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vdW50YWluJTIwd2F0ZXJmYWxsfGVufDB8fDB8fHww"
              alt="tailwind logo"
              className="rounded-xl h-64 w-full object-fill"
            />
          </div>
          <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
            
            <h3 className="font-black text-gray-800 md:text-3xl text-xl">
              The Majestic and Wonderful Bahamas
            </h3>
            <p className="md:text-lg text-gray-500 text-base">
              The best kept secret of The Bahamas is the country’s sheer size
              and diversity. With 16 major islands, The Bahamas is an unmatched
              destination
            </p>
            <p className="text-xl font-black text-gray-800">
              $110
              <span className="font-normal text-gray-600 text-base">
                /night
              </span>
            </p>
            <div className="justify-self-end">
                <button className="btn w-full">button</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidCard;
