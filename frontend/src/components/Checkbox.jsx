import React, { useState } from 'react'

const Checkbox = ({ keyTitle, title, color, clickCheckbox }) => {
    const [ isChecked, setIsChecked ] = useState(false);

    const onClick = () => {
        setIsChecked(isChecked => !isChecked);
        clickCheckbox(keyTitle);
    }

    return (
        <div onClick={onClick} className="cursor-pointer flex items-center">
            <input type="checkbox" checked={isChecked} onChange={() => {}} className="hidden" />
            <label htmlFor="myCheckbox" className="cursor-pointer flex items-center">
                <div style={{ backgroundColor: color }} className={`w-4 h-4 border rounded-[4px] mr-2 flex-shrink-0`}>
                {isChecked && (
                    <svg className="w-3 h-3 text-white pointer-events-none translate-x-[2%] translate-y-[10%] box_shadow" viewBox="0 0 20 20">
                        <path fill="none" stroke="currentColor" strokeWidth="3" d="M6 9l4 4 8-8"></path>
                    </svg>
                )}
                </div>
                {title}
            </label>
        </div>
    )
}

export default Checkbox