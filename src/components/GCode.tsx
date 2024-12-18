import { useState, useMemo } from "react"
import type{params} from "./FaceFrame"
import { Modal } from "antd"
import {CopyToClipboard} from 'react-copy-to-clipboard'
import TextArea from "antd/es/input/TextArea"

type GCodeProps = {
    title :string
    gCode :string
    color :string
    setColor :(c:string)=>void
}

// SVG Polygon and Modal for stiles
// return SVG polygon and associated modal with gcode to copy
// svg image will change color after copying 
export default function GCode({title, gCode, color, setColor}:GCodeProps){
    
    return(
        <>
             {gCode != undefined &&
                <table style={{margin:'auto'}}><tbody>
                    <tr>
                        <td >
                            <span style={{fontSize:'120%', fontWeight:'700'}}>{title}</span>
                            <CopyToClipboard
                                text = {gCode}
                                onCopy ={()=>setColor("red")}
                            >
                                <span style={{color:color==="red"?"red":"black"}}
                                    className="copyButton">
                                    {color==="red"?"copied":"copy"}
                                </span>
                            </CopyToClipboard>
                        </td>
                    </tr>
                    <tr>
                        <td >
                            <TextArea
                                rows={14}
                                value={gCode}
                                style={{width:'250px',color:color==="red"?"red":"black"}}
                            />
                        </td>
                    </tr>
                </tbody></table>
            }
        </>
    )
}