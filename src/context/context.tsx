import { useContext, createContext, useState } from "react";

// dimensions required to create SVG image of faceframe
export type params = {
    top :string  // width of top board -- 1.5in or 2in
    bottom :string // width of bottom board -- 1.5in or 2in
    ht :number // finished height of frame
    wd :number // finished width of frame
    hBot? :number  // y dimension of bottom of frame
    hBot1? :number // y dimenstin of top of bottom board
    hBotBev? :number // y dimention of bottom bevel
    hTop? :number // y dimension of top board (y = 0)
    hTop1? :number // y dimension of the bottom of the top board
    hTopBev? :number // y dimenension of the top bevel
    wd0? :number // x dimension of left of frame (x=0)
    wdBev? :number // x dimenion of left stile bevel
    wd1? :number // x dimension of left stile (x=1.5)
    wdWBev? :number // x dimension of right stile bevel
    wdW1? :number // x dimension on right stile board
    hR1? :number // center of middle rail 1
    hR2? :number // center of middle rail 2
    hR3? :number // center of middle rail 3
    hR4? :number // center of middle rail 4
}


// starting dimensions for faceframe
const startParams :params = {
    top: "1.5in",
    bottom: "2in",
    ht: 31,
    wd: 24
}

type GCodeContextType = {
    dimensions :params
    updateDimensions :(d:params)=>void
    gCode :any
    updateGCode :(g:any)=>void
}


const GCodeContext = createContext({} as GCodeContextType)

export function useGCodeContext(){
    return useContext(GCodeContext)
}


type GCodeContextProps ={
    children :any
}

export function GCodeContextProvider({children}:GCodeContextProps){

    const[dimensions, setDimensions]=useState<params>(startParams)
    const updateDimensions = (d:params)=>{setDimensions(d)}

    const[gCode, setGCode]=useState<any>(null)
    const updateGCode = (g:any)=>{setGCode(g)}

    return(
        <GCodeContext.Provider
            value ={
                {
                    dimensions,
                    updateDimensions,
                    gCode,
                    updateGCode,
                } as GCodeContextType
            }
        >
            {children}
        </GCodeContext.Provider>
    )
}