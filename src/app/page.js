import Chatbot from "@/components/Chatbot";
import FileUpload from "@/components/fileUpload";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="">
      <div className="min-h-[10vh]">
        <Navbar/>
      </div>
      <div className="flex min-h-[90vh] bg-amber-800">
        <div className="w-[30vw]  bg-amber-200 h-[90vh] flex justify-center items-center">
          <FileUpload />
        </div>
        <div className="w-[70vw] h-[90vh] bg-gray-100">
          <Chatbot />
        </div>
      </div>
    </div>

  );
}
