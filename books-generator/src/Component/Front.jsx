import { useState } from "react";

const fontFamilies = [
  "Arial",
  "Courier New",
  "Georgia",
  "Times New Roman",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Impact",
  "Comic Sans MS",
  "Lucida Sans Unicode",
  "Palatino Linotype",
  "Garamond",
  "Bookman",
  "Avant Garde",
  "Calibri",
  "Candara",
  "Optima",
  "Segoe UI",
  "Roboto",
];

const Front = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [fontFamily, setFontFamily] = useState(fontFamilies[0]);
  const [fontColor, setFontColor] = useState("#3559a1");

  let imgtemp =
    "https://st5.depositphotos.com/5646918/64549/i/450/depositphotos_645495748-stock-photo-stairway-heaven-staircase-clouds-leads.jpg";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" mt-[20px]  flex ">
      <div className="w-[470px] m-auto bg-gray-400 rounded-[10px] p-[20px] ">
        <h1 className=" text-center text-[32px] font-bold ">FRONT PAGE</h1>
        <div className=" flex justify-between flex-col p-[20px] gap-[10px]">
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            className="p-[8px] border-[2px] border-violet-100 rounded-[6px]"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author Name"
            className="p-[8px] border-[2px] border-violet-100 rounded-[6px]"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <div className=" flex flex-col gap-[10px]">
            <p className=" p-[5px] font-semibold uppercase">
              Choose Background Image For Front Cover:
            </p>
            <div className="">
              <input
                id="file"
                type="file"
                onChange={handleImageUpload}
                className="p-[8px] border-[2px] border-violet-100 rounded-[6px]"
              />
            </div>
          </div>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="p-[8px] border-[2px] border-violet-100 rounded-[6px]"
          >
            {fontFamilies.map((font, index) => (
              <option key={index} value={font}>
                {font}
              </option>
            ))}
          </select>

          <span className={`flex gap-[20px] p-[10px] font-semibold`}>
            Choose Color For Cover Page
            <input
              className="w-[30px] overflow-hidden"
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              placeholder="select font colour"
            />
          </span>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${selectedImage || imgtemp})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "2px 2px 4px rgba(0,0,0,0.7)",
        }}
        className="flex flex-col items-center justify-between h-[90vh] w-[70vh] p-[20px] m-auto border-[10px] rounded-[10px] "
      >
        <h1
          style={{ color: fontColor, fontFamily: fontFamily }}
          className="text-[32px] uppercase font-semibold max-w-[70%] text-center"
        >
          {title || "The Road Less Traveled"}
        </h1>
        <h4
          style={{ color: fontColor }}
          className=" font-mono uppercase text-[22px]"
        >
          Written By: {author || "M. Scott Peck"}
        </h4>
      </div>
    </div>
  );
};

export default Front;
