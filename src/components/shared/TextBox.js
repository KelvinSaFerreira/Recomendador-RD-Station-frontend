import React from "react";

function TextBox({ text }) {
  return (
    <div className="w-2/4 border-r-2 ml-8 flex items-center">
      <p className="text-2xl text-stone-600 font-poppins font-medium leading-9 mb-4">
        {text}
      </p>
    </div>
  )
}

export default TextBox