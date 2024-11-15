const Footer = () => {
  return (
    <div className="py-8">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">About Me</h2>
      </div>
      <div className="mt-4 sm:flex sm:justify-between">
        <div className="flex gap-2 flex-col sm:w-1/2">
          <h3 className="text-lg"><span className="font-semibold">Developed by</span> <span className="text-lg">Kesava Prakash</span></h3>
          <h3 className="text-lg"><span className="font-semibold">Phone Number :</span> <span className="text-lg">+91 9841787203</span></h3>
          <h3 className="text-lg"><span className="font-semibold">Email :</span> <span style={{ fontSize: "16.3px" }}>kesavaprakash1610@gmail.com</span></h3>
        </div>
        <div className="mt-10 sm:mt-0 bg-yellow-100 md:w-1/2">
          <h3 className="font-semibold text-2xl text-center">Send an Email</h3>
          <div className="mt-5">
            <input type="text" className="border-2 rounded w-full h-20" />
          </div>
          div
        </div>
      </div>
    </div>
  )
}

export default Footer