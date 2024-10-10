const Flashlight = () => {
    return (
      <div className="flex justify-center items-center">
        <svg width="100" height="100" className="bg-transparent z-10">
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="yellow"
            className="animate-slide"
          />
        </svg>
      </div>
    );
  };
  
  export default Flashlight;