import React from "react";

function Button({
    children,
    type="button",
    bgColour='bg-blue-500',
    textColor='text-white',
    classname='',
    ...props

}) {
    return(
        <button className={`px-3 py-4 rounded-lg ${bgColour} ${textColor} ${classname}`} {...props}>
            {children}
        </button>
    )
}

export default Button