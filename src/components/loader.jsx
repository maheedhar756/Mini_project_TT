import ClipLoader from "react-spinners/ClipLoader"

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#2a3b6e" size={50} />
    </div>
  )
}

export default Loader