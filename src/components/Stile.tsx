import { useState, useMemo, useEffect } from "react"
import { Modal } from "antd"
import { useGCodeContext } from "../context/context"
import GCode from "./GCode"

type StileProps = {
    side: 'left' | 'right'
    reset :number
}

// SVG Polygon and Modal for stiles
// return SVG polygon and associated modal with gcode to copy
// svg image will change color after copying 
export default function Stile({side, reset}:StileProps){
    

    const [show, setShow] = useState<boolean>(false)
    const [fillColor, setFillColor] = useState<string>("lightgray")

    const{dimensions, gCode} = useGCodeContext()

    const p = dimensions
    const g = gCode

    // convert point paramters into text for svg rendering below
    // left and right use differnt algorigthms
    const points = useMemo(()=>{

        let thesePoints = ''

        if(side === 'left'){
            thesePoints = `0,0
            ${p.wdBev},0 
            ${p.wdBev},${p.hTopBev}
            ${p.wd1},${p.hTop1}
            ${p.wd1},${p.hBot1}
            ${p.wdBev},${p.hBotBev}
            ${p.wdBev},${p.ht}
            0,${p.ht}
            0,0`
        }else{
            thesePoints =`${p.wd},0 
            ${p.wdWBev},0 
            ${p.wdWBev},${p.hTopBev} 
            ${p.wdW1},${p.hTop1} 
            ${p.wdW1},${p.hBot1} 
            ${p.wdWBev},${p.hBotBev} 
            ${p.wdWBev},${p.ht} 
            ${p.wd},${p.ht} 
            ${p.wd},0`
        }

        return(thesePoints)

    },[p,side])

     useEffect(()=>{
        setFillColor("lightgray")
    },[reset])


    return(
        <>
            <polygon 
            points ={points}
            stroke="black" strokeWidth=".1" fill={fillColor}
            onClick={()=>setShow(true)}
            />
            <Modal 
                open={show}
                onCancel={()=>{setShow(false)}}
                onOk={()=>{setShow(false)}}
             >  
             {g != undefined &&
                <>
                    <table style={{margin:'auto'}}>
                        <tr>
                            <td>
                                <GCode
                                    title = {`${side} stile`}
                                    gCode ={g[side]}
                                    color = {fillColor}
                                    setColor = {setFillColor}
                                />
                            </td>
                        </tr>
                    </table>
                </>
            }
            <br/>
            <br/>
            </Modal>
        </>
    )
}