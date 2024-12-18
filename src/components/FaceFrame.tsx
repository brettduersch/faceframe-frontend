import { useState, useEffect } from "react";
import {Input, Radio, Button} from "antd"
import axios from "axios"
import "./FaceFrame.css"
import Stile from "./Stile";
import Rail from "./Rail";
import { useGCodeContext } from "../context/context";
import type {params} from "../context/context"


const endOpts=[
    {label:"1.5in", value:"1.5in"},
    {label:"2in", value:"2in"}
]


function FaceFrame(){
    const[height,setHeight]=useState<string>("31")
    const[top,setTop]=useState<string>("1.5in")
    const[bottom,setBottom]=useState<string>("2in")
    const[r1,setR1]=useState<string>("")
    const[r2,setR2]=useState<string>("")
    const[r3,setR3]=useState<string>("")
    const[r4,setR4]=useState<string>("")
    const[width,setWidth]=useState<string>("24")
    const[reset,setReset]=useState<number>(0)
    const[gcodeWarning, setGCodeWarning]=useState<boolean>(true)
    const[stileLen, setStileLen] = useState<string>("")
    const[railLen, setRailLen] = useState<string>("")
    const[frameLabels, setFrameLabels] = useState<any>()

    const{dimensions, updateDimensions, gCode, updateGCode} = useGCodeContext()

    // get gcode from API for current settings
    function getGcode(){
    
        const params :string[] = []

        setReset((prev)=>prev+1)

        if(top!==""){params.push(`t=${top}`)}
        if(bottom!==""){params.push(`b=${bottom}`)}
        if(r1!==""){params.push(`s1=${r1}`)}
        if(r2!==""){params.push(`s2=${r2}`)}
        if(r3!==""){params.push(`s3=${r3}`)}
        if(r4!==""){params.push(`s4=${r4}`)}
        if(height!==""){params.push(`height=${height}`)}
        if(width!==""){params.push(`width=${width}`)}

        const apiParam = `?${params.join("&")}`

        axios
            .get(`http://localhost:8080/v1/faceframe${apiParam}`)
            .then((res)=>{
                setRailLen(res.data.railLen)
                setStileLen(res.data.stileLen)
                updateGCode(res.data)
                setGCodeWarning(false)
            })
    }


    useEffect(()=>{

        setGCodeWarning(true)

        let  b = 1.5
        if (bottom === '2in'){
            b = 2.0
        }

        let t = 1.5
        if( top === '2in'){
            t = 2.0
        }

        const ht = parseFloat(height)
        const wd = parseFloat(width)

        const hBot = ht
        const hBot1 = ht - b
        const hBotBev = ht - b  +0.5
        const hTop = 0
        const hTop1 = t
        const hTopBev = t - 0.5
        const wd0 = 0
        const wdBev = 1
        const wd1 = 1.5
        const wdWBev = wd-1
        const wdW1 = wd - 1.5

        const hR1 = parseFloat(r1)
        const hR2 = parseFloat(r2)
        const hR3 = parseFloat(r3)
        const hR4 = parseFloat(r4)

        const thisDim :params = {top, bottom, ht, wd, hBot, hBot1, hBotBev, hTop, hTop1, hTopBev,
                                 wd0, wdBev, wd1, wdWBev, wdW1, hR1, hR2, hR3, hR4}
        updateDimensions(thisDim)

        const thisFrame = 
            <>
                {/* top labels */}
                <text x="-1" y="0" fontFamily="Arial" fontSize="1.5" textAnchor="end">(0,0)</text>
                <text x="-1" y={`${ht+0.5}`} fontFamily="Arial" fontSize="1.5" textAnchor="end">{`(0,${ht})`}</text>
                
                 {/* bottom labels */}
                <text x={`${wd+1}`} y="0" fontFamily="Arial" fontSize="1.5" textAnchor="start">{`(${wd},0)`}</text>
                <text x={`${wd+1}`} y={`${ht+0.5}`} fontFamily="Arial" fontSize="1.5" textAnchor="start">{`(${wd},${ht})`}</text>
                
                {/* rail labels */}
                {r1!=="" &&
                    <>
                        <text x="-1" y={`${hR1+0.5}`} fontFamily="Arial" fontSize="1.5" textAnchor="end">{`(0,${hR1})`}</text>
                        <text x={`${wd+1}`} y={`${hR1+0.5}`} fontFamily="Arial" fontSize="1.5" textAnchor="start">{`(${wd},${hR1})`}</text>
                    </>
                }
                {r2!=="" &&
                    <>
                        <text x="-1" y={`${hR2+0.5}`} fontFamily="Arial" fontSize="1.5" textAnchor="end">{`(0,${hR2})`}</text>
                        <text x={`${wd+1}`} y={`${hR2+0.5}`} fontFamily="Arial" fontSize="1.5" textAnchor="start">{`(${wd},${hR2})`}</text>
                    </>
                }
                {r3!=="" &&
                    <>
                        <text x="-1" y={`${hR3+0.5}`} fontFamily="Arial" fontSize="1.5" textAnchor="end">{`(0,${hR3})`}</text>
                        <text x={`${wd+1}`} y={`${hR3+0.5}`} fontFamily="Arial" fontSize="1.5" textAnchor="start">{`(${wd},${hR3})`}</text>
                    </>
                }
                {r4!=="" &&
                    <>
                        <text x="-1" y={`${hR4+0.5}`} fontFamily="Arial" fontSize="1.5" textAnchor="end">{`(0,${hR4})`}</text>
                        <text x={`${wd+1}`} y={`${hR4+0.5}`} fontFamily="Arial" fontSize="1.5" textAnchor="start">{`(${wd},${hR4})`}</text>
                    </>
                }
            </>
    
        setFrameLabels(thisFrame)

    },[height,width,top,bottom,
        r1,r2,r3,r4
    ])


    return(
        <div className="ff">
            <h3>Face Frame GCode Generator</h3>
            <table><tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td colSpan={2} style={{paddingTop:'10px', textAlign:'right'}}>
                        Enter distance(in) from top
                    </td>
                    <td style={{textAlign:'center',paddingLeft:'100px'}} rowSpan={3}>
                        <Button style={{backgroundColor:'#1677ff', color:'white'}} onClick={getGcode}>Generate GCodes</Button>
                    </td>
                </tr>
                <tr>
                    <td>Height(in)</td>
                    <td><Input value={height} onChange={(e)=>setHeight(e.target.value)}/></td>
                    <td style={{textAlign:'right',minWidth:'10vw'}}> Slot1</td>
                    <td><Input value={r1} onChange={(e)=>setR1(e.target.value)}/></td>
                </tr>
                <tr>
                    <td>Width(in)</td>
                    <td><Input value={width} onChange={(e)=>setWidth(e.target.value)}/></td>
                    <td style={{textAlign:'right',minWidth:'10vw'}}>Slot2</td>
                    <td><Input value={r2}  onChange={(e)=>setR2(e.target.value)}/></td>
                </tr>
                <tr>
                    <td>Top Width</td>
                    <td><Radio.Group 
                        options={endOpts}
                        optionType="button"
                        buttonStyle="solid"
                        value={top} 
                        onChange={(e)=>setTop(e.target.value)}/>
                    </td>
                    <td style={{textAlign:'right',minWidth:'10vw'}}>Slot3</td>
                    <td><Input value={r3}  onChange={(e)=>setR3(e.target.value)}/></td>
                    <td style={{textAlign:'center',paddingLeft:'100px'}}>Min Stile: {stileLen}in</td>
                </tr>
                <tr>
                    <td>Bottom Width</td>
                    <td><Radio.Group 
                        options={endOpts}
                        optionType="button"
                        buttonStyle="solid"
                        value={bottom} 
                        onChange={(e)=>setBottom(e.target.value)}/>
                    </td>
                    <td style={{textAlign:'right',minWidth:'10vw'}}>Slot4</td>
                    <td><Input value={r4} onChange={(e)=>setR4(e.target.value)}/></td>
                    <td style={{textAlign:'center',paddingLeft:'100px'}}>Min Rail: {railLen}in</td>
                </tr>
            </tbody></table>
            {gcodeWarning?
                <h3 style={{color:'darkred'}}>New model inputs have not been converted to gcode. "Generate GCodes" required.</h3>
                :<h3 style={{color:'white'}}>.</h3>
            }
        {gCode !== null &&
                <svg width="600" height="500" viewBox={`-8,-2,${(Number(dimensions.wd)+10)*1.1},${(Number(dimensions.hBot)+5)}`}>
                    <Stile side='left' reset={reset}/>
                    <Stile side='right' reset={reset}/>
                    <Rail  position='top' reset={reset}/>
                    <Rail  position='bottom' reset={reset}/>
                    {r1 && <Rail position={parseFloat(r1)} reset={reset}/>}
                    {r2 && <Rail position={parseFloat(r2)} reset={reset}/>}  
                    {r3 && <Rail position={parseFloat(r3)} reset={reset}/>}  
                    {r4 && <Rail position={parseFloat(r4)} reset={reset}/>}         
                    {frameLabels}
                </svg>
            }
        </div>
    )
}

export default FaceFrame
