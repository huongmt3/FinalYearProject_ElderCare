import notfoundImg from "../../../assets/images/not-found.png";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-4">NotFound</h2>
      <img 
        src={notfoundImg} 
        alt="404 Not Found" 
        width="600" 
        height="600" 
        className="object-contain"
      />
    </div>
  );
}

export default NotFound;