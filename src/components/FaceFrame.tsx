import { useState } from "react";
import {Input, Radio, Button} from "antd"
import axios from "axios"
import {CopyToClipboard} from 'react-copy-to-clipboard'
import "./FaceFrame.css"

const {TextArea} = Input

const endOpts=[
    {label:"1.5in", value:"1.5in"},
    {label:"2in", value:"2in"}
]


function FaceFrame(){
    const[height,setHeight]=useState<string>("31")
    const[top,setTop]=useState<string>("1.5in")
    const[bottom,setBottom]=useState<string>("2in")
    const[s1,setS1]=useState<string>("")
    const[s2,setS2]=useState<string>("")
    const[s3,setS3]=useState<string>("")
    const[s4,setS4]=useState<string>("")
    const[width,setWidth]=useState<string>("24")
    const[gcLeft, setGcLeft]=useState<string>("")
    const[gcRight, setGcRight]=useState<string>("")
    const[gcTopZero, setGcTopZero]=useState<string>("")
    const[gcMiddleZero, setGcMiddleZero]=useState<string>("")
    const[gcBottomZero, setGcBottomZero]=useState<string>("")
    const[gcTopLen, setGcTopLen]=useState<string>("")
    const[gcMiddleLen, setGcMiddleLen]=useState<string>("")
    const[gcBottomLen, setGcBottomLen]=useState<string>("")
    const[gcTopBackRight, setGcTopBackRight]=useState<string>("")
    const[gcTopBackLeft, setGcTopBackLeft]=useState<string>("")
    const[gcMiddleBack, setGcMiddleBack]=useState<string>("")
    const[gcBottomBackRight, setGcBottomBackRight]=useState<string>("")
    const[gcBottomBackLeft, setGcBottomBackLeft]=useState<string>("")
    const[stileLen, setStileLen] = useState<string>("")
    const[railLen, setRailLen] = useState<string>("")
    const[leftColor,setLeftColor]=useState<string>("black")
    const[rightColor,setRightColor]=useState<string>("black")
    const[topZeroColor,setTopZeroColor]=useState<string>("black")
    const[middleZeroColor,setMiddleZeroColor]=useState<string>("black")
    const[bottomZeroColor,setBottomZeroColor]=useState<string>("black")
    const[topLenColor,setTopLenColor]=useState<string>("black")
    const[middleLenColor,setMiddleLenColor]=useState<string>("black")
    const[bottomLenColor,setBottomLenColor]=useState<string>("black")
    const[topBackRightColor,setTopBackRightColor]=useState<string>("black")
    const[topBackLeftColor,setTopBackLeftColor]=useState<string>("black")
    const[middleBackColor,setMiddleBackColor]=useState<string>("black")
    const[bottomBackRightColor,setBottomBackRightColor]=useState<string>("black")
    const[bottomBackLeftColor,setBottomBackLeftColor]=useState<string>("black")
    

    function getGCODE(){

        const params :string[] = []

        setLeftColor('black')
        setRightColor('black')
        setTopZeroColor('black')
        setMiddleZeroColor('black')
        setBottomZeroColor('black')
        setTopLenColor('black')
        setMiddleLenColor('black')
        setBottomLenColor('black')
        setTopBackLeftColor('black')
        setTopBackRightColor('black')
        setBottomBackLeftColor('black')
        setBottomBackRightColor('black')

        if(top!==""){
            params.push(`t=${top}`)
        }
        if(bottom!==""){
            params.push(`b=${bottom}`)
        }
        if(s1!==""){
            params.push(`s1=${s1}`)
        }
        if(s2!==""){
            params.push(`s2=${s2}`)
        }
        if(s3!==""){
            params.push(`s3=${s3}`)
        }
        if(s4!==""){
            params.push(`s4=${s4}`)
        }
        if(height!==""){
            params.push(`height=${height}`)
        }
        if(width!==""){
            params.push(`width=${width}`)
        }

        const apiParam = `?${params.join("&")}`

        axios
            .get(`http://localhost:8080/v1/faceframe${apiParam}`)
            .then((res)=>{
                setGcLeft(res.data.left)
                setGcRight(res.data.right)
                setGcTopZero(res.data.topZero)
                setGcMiddleZero(res.data.middleZero)
                setGcBottomZero(res.data.bottomZero)
                setGcTopLen(res.data.topLen)
                setGcMiddleLen(res.data.middleLen)
                setGcBottomLen(res.data.bottomLen)
                setGcTopBackRight(res.data.topBackRight)
                setGcTopBackLeft(res.data.topBackLeft)
                setGcMiddleBack(res.data.middleBack)
                setGcBottomBackRight(res.data.bottomBackRight)
                setGcBottomBackLeft(res.data.bottomBackLeft)
                setRailLen(res.data.railLen)
                setStileLen(res.data.stileLen)
            })
    }

    return(
        <div className="ff">
            <h3>Face Frame GCode Generator</h3>
            <table style={{margin:'auto'}}>
                <tr>
                    <td></td>
                    <td></td>
                    <td colSpan={2} style={{paddingTop:'10px', textAlign:'right'}}>
                        Enter distance(in) from top or left
                    </td>
                    <td style={{textAlign:'center',paddingLeft:'100px'}} rowSpan={3}>
                        <Button style={{backgroundColor:'#1677ff', color:'white'}} onClick={getGCODE}>Generate GCodes</Button>
                    </td>
                </tr>
                <tr>
                    <td>Height(in)</td>
                    <td><Input value={height} onChange={(e)=>setHeight(e.target.value)}/></td>
                    <td style={{textAlign:'right',minWidth:'10vw'}}> Slot1</td>
                    <td><Input value={s1} onChange={(e)=>setS1(e.target.value)}/></td>
                </tr>
                <tr>
                    <td>Width(in)</td>
                    <td><Input value={width} onChange={(e)=>setWidth(e.target.value)}/></td>
                    <td style={{textAlign:'right',minWidth:'10vw'}}>Slot2</td>
                    <td><Input value={s2}  onChange={(e)=>setS2(e.target.value)}/></td>
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
                    <td><Input value={s3}  onChange={(e)=>setS3(e.target.value)}/></td>
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
                    <td><Input value={s4} onChange={(e)=>setS4(e.target.value)}/></td>
                    <td style={{textAlign:'center',paddingLeft:'100px'}}>Min Rail: {railLen}in</td>
                </tr>
            </table>
            <br/>
            <br/>
            <table style={{margin:'auto'}}>
                <tr>
                    <td></td>
                    <td></td>
                    <td>
                        Top Back Left \__
                        <CopyToClipboard
                            text = {gcTopBackLeft}
                            onCopy ={()=>setTopBackLeftColor("red")}
                        >
                            <span style={{color:topBackLeftColor}} className="copyButton">
                                {topBackLeftColor==="red"?"copied":"copy"}
                            </span>
                        </CopyToClipboard>
                    </td>
                    <td >Top Rail Front Zero
                        <CopyToClipboard
                            text = {gcTopZero}
                            onCopy ={()=>setTopZeroColor("red")}
                        >
                            <span style={{color:topZeroColor}} className="copyButton">
                                {topZeroColor==="red"?"copied":"copy"}
                            </span>
                        </CopyToClipboard>
                    </td>
                    <td >Top Rail Front Length
                        <CopyToClipboard
                            text = {gcTopLen}
                            onCopy ={()=>setTopLenColor("red")}
                        >
                            <span style={{color:topLenColor}} className="copyButton">
                                {topLenColor==="red"?"copied":"copy"}
                            </span>
                        </CopyToClipboard>
                    </td>
                    <td >Top Back Right __/
                        <CopyToClipboard
                            text = {gcTopBackRight}
                            onCopy ={()=>setTopBackRightColor("red")}
                        >
                            <span style={{color:topBackRightColor}} className="copyButton">
                                {topBackRightColor==="red"?"copied":"copy"}
                            </span>
                        </CopyToClipboard>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td >
                        <TextArea
                            rows={14}
                            value={gcTopBackLeft}
                            style={{width:'250px',color:topBackLeftColor}}
                            onChange={(e)=>setGcTopBackLeft(e.target.value)}
                        />
                    </td>
                    <td >
                        <TextArea
                            rows={14}
                            value={gcTopZero}
                            style={{width:'250px',color:topZeroColor}}
                            onChange={(e)=>setGcTopZero(e.target.value)}
                        />
                    </td>
                    <td >
                        <TextArea
                            rows={14}
                            value={gcTopLen}
                            style={{width:'250px',color:topLenColor}}
                            onChange={(e)=>setGcTopLen(e.target.value)}
                        />
                    </td>
                    <td >
                        <TextArea
                            rows={14}
                            value={gcTopBackRight}
                            style={{width:'250px',color:topBackRightColor}}
                            onChange={(e)=>setGcTopBackRight(e.target.value)}
                        />
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td >Left Stile
                        <CopyToClipboard
                            text = {gcLeft}
                            onCopy ={()=>setLeftColor("red")}
                        >
                            <span style={{color:leftColor}} className="copyButton">
                                {leftColor==="red"?"copied":"copy"}
                            </span>
                        </CopyToClipboard>
                    </td>
                    <td></td>
                    <td colSpan={3}rowSpan={2} >
                        <table style={{margin:'auto',width:'100%'}}>
                            <tr>
                                <td></td>
                                
                                <td >Middle Rail(s) Zero
                                    <CopyToClipboard
                                        text = {gcMiddleZero}
                                        onCopy ={()=>setMiddleZeroColor("red")}
                                    >
                                        <span style={{color:middleZeroColor}} className="copyButton">
                                            {middleZeroColor==="red"?"copied":"copy"}
                                        </span>
                                    </CopyToClipboard>
                                </td>
                                <td >Middle Rail(s) Length
                                    <CopyToClipboard
                                        text = {gcMiddleLen}
                                        onCopy ={()=>setMiddleLenColor("red")}
                                    >
                                        <span style={{color:middleLenColor}} className="copyButton">
                                            {middleLenColor==="red"?"copied":"copy"}
                                        </span>
                                    </CopyToClipboard>
                                </td>
                                <td >Middle Back \__/
                                    <CopyToClipboard
                                        text = {gcMiddleBack}
                                        onCopy ={()=>setMiddleBackColor("red")}
                                    >
                                        <span style={{color:middleBackColor}} className="copyButton">
                                            {middleBackColor==="red"?"copied":"copy"}
                                        </span>
                                    </CopyToClipboard>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td >
                                    <TextArea
                                        rows={14}
                                        value={gcMiddleZero}
                                        style={{width:'250px',color:middleZeroColor}}
                                        onChange={(e)=>setGcMiddleZero(e.target.value)}
                                    />
                                </td>
                                <td >
                                    <TextArea
                                        rows={14}
                                        value={gcMiddleLen}
                                        style={{width:'250px',color:middleLenColor}}
                                        onChange={(e)=>setGcMiddleLen(e.target.value)}
                                    />
                                </td>
                                <td >
                                    <TextArea
                                        rows={14}
                                        value={gcMiddleBack}
                                        style={{width:'250px',color:middleBackColor}}
                                        onChange={(e)=>setGcMiddleBack(e.target.value)}
                                    />
                                </td>
                                <td></td>
                            </tr>
                        </table>
                    </td>
                    <td></td>
                    <td >Right Stile
                        <CopyToClipboard
                            text = {gcRight}
                            onCopy ={()=>setRightColor("red")}
                        >
                            <span style={{color:rightColor}} className="copyButton">
                                {rightColor==="red"?"copied":"copy"}
                            </span>
                        </CopyToClipboard>
                    </td>
                </tr>
                <tr>
                    <td >
                        <TextArea
                            rows={14}
                            value={gcLeft}
                            style={{width:'250px',color:leftColor}}
                            onChange={(e)=>setGcLeft(e.target.value)}
                        />
                    </td>
                    <td></td>
                    <td></td>
                    <td >
                        <TextArea
                            rows={14}
                            value={gcRight}
                            style={{width:'250px',color:rightColor}}
                            onChange={(e)=>setGcRight(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td >Bottom Back Left \__
                        <CopyToClipboard
                            text = {gcBottomBackLeft}
                            onCopy ={()=>setBottomBackLeftColor("red")}
                        >
                            <span style={{color:bottomBackLeftColor}} className="copyButton">
                                {bottomBackLeftColor==="red"?"copied":"copy"}
                            </span>
                        </CopyToClipboard>
                    </td>
                    <td >Bottom Rail Front Zero
                        <CopyToClipboard
                            text = {gcBottomZero}
                            onCopy ={()=>setBottomZeroColor("red")}
                        >
                            <span style={{color:bottomZeroColor}} className="copyButton">
                                {bottomZeroColor==="red"?"copied":"copy"}
                            </span>
                        </CopyToClipboard>
                    </td>
                    <td >Bottom Rail Front Length
                        <CopyToClipboard
                            text = {gcBottomLen}
                            onCopy ={()=>setBottomLenColor("red")}
                        >
                            <span style={{color:bottomLenColor}} className="copyButton">
                                {bottomLenColor==="red"?"copied":"copy"}
                            </span>
                        </CopyToClipboard>
                    </td>
                    <td >Bottom Back Right __/
                        <CopyToClipboard
                            text = {gcBottomBackRight}
                            onCopy ={()=>setBottomBackRightColor("red")}
                        >
                            <span style={{color:bottomBackRightColor}} className="copyButton">
                                {bottomBackRightColor==="red"?"copied":"copy"}
                            </span>
                        </CopyToClipboard>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td >
                    <TextArea
                            rows={14}
                            value={gcBottomBackLeft}
                            style={{width:'250px',color:bottomBackLeftColor}}
                            onChange={(e)=>setGcBottomBackLeft(e.target.value)}
                        />
                    </td>
                    <td >
                        <TextArea
                            rows={14}
                            value={gcBottomZero}
                            style={{width:'250px',color:bottomZeroColor}}
                            onChange={(e)=>setGcBottomZero(e.target.value)}
                        />
                    </td>
                    <td >
                        <TextArea
                            rows={14}
                            value={gcBottomLen}
                            style={{width:'250px',color:bottomLenColor}}
                            onChange={(e)=>setGcBottomLen(e.target.value)}
                        />
                    </td>
                    <td >
                        <TextArea
                            rows={14}
                            value={gcBottomBackRight}
                            style={{width:'250px',color:bottomBackRightColor}}
                            onChange={(e)=>setGcBottomBackRight(e.target.value)}
                        />
                    </td>
                    <td></td>
                </tr>
            </table>
        </div>
    )
}

export default FaceFrame
