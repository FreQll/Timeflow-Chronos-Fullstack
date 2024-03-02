import React, { useState } from 'react'

const RadioInput = ({ id, title, selected, onChange, color }) => {
    const handleClick = () => {
        onChange(id);
    };

    return (
        <div className="cursor-pointer flex items-center">
          <div onClick={handleClick} style={{ backgroundColor: color }} className={`w-4 h-4 border rounded-[4px] mr-2 flex-shrink-0 ${selected === id ? 'bg-blue-500' : ''}`} >
            {selected === id && (
                <svg className="w-3 h-3 text-white pointer-events-none translate-x-[2%] translate-y-[10%] box_shadow" viewBox="0 0 20 20">
                    <path fill="none" stroke="currentColor" strokeWidth="3" d="M6 9l4 4 8-8"></path>
                </svg>
            )}
          </div>
          <label htmlFor={id}>{title}</label>
        </div>
        
    )
}

export default RadioInput

// <div onClick={onClick} className="cursor-pointer flex items-center">
// <input type="radio" id={`option_${title}`} name="options" className="hidden" />
// <label htmlFor={`option_${title}`} className="cursor-pointer flex items-center">
//     <div style={{ backgroundColor: color }} className={`w-4 h-4 border rounded-[4px] mr-2 flex-shrink-0`}>
//         {isChecked && (р
//             <svg className="w-3 h-3 text-white pointer-events-none translate-x-[2%] translate-y-[10%] box_shadow" viewBox="0 0 20 20">
//                 <path fill="none" stroke="currentColor" strokeWidth="3" d="M6 9l4 4 8-8"></path>
//             </svg>
//         )}
//     </div>
//     {title}
// </label>
// </div>