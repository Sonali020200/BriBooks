import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useState, useRef } from "react";
import jsPDF from "jspdf";

const PaginationExample = () => {
  const [pages, setPages] = useState([
    { id: 1, content: "", backgroundImage: "", active: true },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [textAreaContent, setTextAreaContent] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const contentRef = useRef(null);

  const handleChange = (event) => {
    setTextAreaContent(event.target.value.slice(0, 1000));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setBackgroundImage(reader.result);
      const newPages = [...pages];
      newPages[currentPage - 1].backgroundImage = reader.result;
      setPages(newPages);
    };

    reader.readAsDataURL(file);
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    } else if (currentPage < 10) {
      setPages([
        ...pages,
        { id: currentPage + 1, content: "", backgroundImage: "", active: true },
      ]);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page.id);
  };

  const handleSubmit = () => {
    if (textAreaContent && backgroundImage) {
      const newPages = [...pages];
      newPages[currentPage - 1].content = textAreaContent;
      setPages(newPages);
      setTextAreaContent("");
      handleNextPage();
    }
  };
  const pageWidth = 210;
  const pageHeight = 237;
  const handleDownloadPDF = () => {
    const doc = new jsPDF("p", "mm", [pageWidth, pageHeight]);

    pages.forEach((page, index) => {
      doc.addPage();
      if (page.backgroundImage) {
        const imgWidth = doc.internal.pageSize.getWidth();
        const imgHeight = doc.internal.pageSize.getHeight();
        doc.addImage(page.backgroundImage, "JPEG", 0, 0, imgWidth, imgHeight);
      }

      const textX = 15;
      const textY = 15;
      const lineHeight = 8;

      doc.setTextColor("#000000");
      doc.setFont("Arial");
      doc.setFontSize(16);

      const textLines = doc.splitTextToSize(page.content, 180);
      doc.text(textLines, textX, textY + lineHeight * 2);
    });

    doc.save("Book.pdf");
  };

  return (
    <div className="flex justify-between items-center">
      <div className="w-[470px] m-auto bg-gray-400 rounded-[10px] p-[20px] ">
        <label className="my-[10px]">
          Upload Background image
          <input
            type="file"
            accept=".jpg, .jpeg, .svg"
            onChange={handleFileChange}
          />
        </label>
        <textarea
          className="w-full h-32 p-2 border border-gray-400 rounded-md mb-4 mt-[10px]"
          placeholder="Enter up to 1000 words..."
          onChange={handleChange}
          value={textAreaContent}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={handleSubmit}
          disabled={!textAreaContent || !backgroundImage}
        >
          Submit
        </button>
        <button
          className="ml-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>

        <div className="mt-8">
          <ul className="flex">
            {pages.map((page) => (
              <li
                key={page.id}
                className={`mr-2 px-[8px] py-[4px] cursor-pointer ${
                  page.active
                    ? "bg-blue-500 text-white rounded-[10px]"
                    : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => handlePageClick(page)}
              >
                {page.id}
              </li>
            ))}
          </ul>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={handlePreviousPage}
          >
            Previous Page
          </button>
          <button
            className="mt-4 ml-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={handleNextPage}
          >
            Next Page
          </button>
        </div>
      </div>

      <div
        className="mt-8 h-[90vh] w-[70vh] mx-auto p-8 bg-white rounded-lg shadow-lg"
        ref={contentRef}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "2px 2px 4px rgba(0,0,0,0.7)",
        }}
      >
        <p>{pages.find((page) => page.id === currentPage).content}</p>
      </div>
    </div>
  );
};

export default PaginationExample;
