import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader">
      <div className="circle-preloader"></div>
      <p className="preloader-text">Searching for news...</p>
    </div>
  );
}

export default Preloader;