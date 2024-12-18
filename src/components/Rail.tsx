import { useState, useMemo, useEffect } from "react"
import { Modal } from "antd"
import GCode from "./GCode"
import { useGCodeContext } from "../context/context"

type RailProps = {
    position: 'top' | 'bottom' |number
    reset :number
}

type RailDims = {
    front0 :string
    frontLen :string
    backLeft :string
    backRight :string
    outline :string
}

type RailKeys = {
    front0 :string
    frontLen :string
    backLeft :string
    backRight :string
}

// SVG Polygon and Modal for stiles
// return SVG polygon and associated modal with gcode to copy
// svg image will change color after copying 
export default function Rail({position, reset}:RailProps){
    
    const [show, setShow] = useState<boolean>(false)
    const [fillF0, setFillF0] = useState<string>("lightgray")
    const [fillFLen, setFillFLen] = useState<string>("lightgray")
    const [fillBLeft, setFillBLeft] = useState<string>("lightgray")
    const [fillBRight, setFillBRight] = useState<string>("lightgray")

    const{dimensions, gCode} = useGCodeContext()

    const p = dimensions
    const g = gCode

    // convert point paramters into text for svg rendering below
    // left and right use differnt algorigthms
    const points :RailDims = useMemo(()=>{

        let f0 = ''
        let fLen = ''
        let bLeft = ''
        let bRight = ''
        let outLine = ''

        // convert string top and bottom to number
        let  b = 1.5
        if (p.bottom === '2in'){
            b = 2.0
        }
        let t = 1.5
        if( p.top === '2in'){
            t = 2.0
        }

        // set polygon positions for top rail
        if(position === 'top'){
            f0 = `${p.wdBev},0 
                  ${p.wdBev},${t/2} 
                  ${p.wd*.5},${t/2} 
                  ${p.wd*.5},0 
                  ${p.wdBev},0`

            fLen = `${p.wdWBev},0 
                    ${p.wdWBev},${t/2} 
                    ${p.wd*.5},${t/2} 
                    ${p.wd*.5},0 
                    ${p.wdWBev},0`

            bLeft = `${p.wdBev},${t/2} 
                     ${p.wdBev},${p.hTopBev} 
                     ${p.wd1},${p.hTop1}
                     ${p.wd*.5},${p.hTop1} 
                     ${p.wd*.5},${t/2} 
                     ${p.wdWBev},${t/2}`

            bRight = `${p.wdWBev},${t/2} 
                      ${p.wdWBev},${p.hTopBev} 
                      ${p.wdW1},${p.hTop1}
                      ${p.wd*.5},${p.hTop1} 
                      ${p.wd*.5},${t/2} 
                      ${p.wdWBev},${t/2}`

            outLine = `${p.wdBev},0 
                       ${p.wdBev},${p.hTopBev} 
                       ${p.wd1},${p.hTop1}
                       ${p.wdW1},${p.hTop1} 
                       ${p.wdWBev},${p.hTopBev} 
                       ${p.wdWBev},0 
                       ${p.wdBev},0`
        
        // set polygon positions for bottom rail
        } else if (position === 'bottom'){
            f0 = `${p.wdBev},${p.hBot}
                  ${p.wdBev},${Number(p.hBot)-b/2}
                  ${p.wd*.5},${Number(p.hBot)-b/2} 
                  ${p.wd*.5},${p.hBot} 
                  ${p.wdBev},${p.hBot}` 

            fLen = `${p.wdWBev},${p.hBot} 
                    ${p.wdWBev},${Number(p.hBot)-b/2}
                    ${p.wd*.5},${Number(p.hBot)-b/2} 
                    ${p.wd*.5},${p.hBot} 
                    ${p.wdWBev},${p.hBot}` 

            bLeft = `${p.wdBev},${Number(p.hBot)-b/2} 
                     ${p.wdBev},${p.hBotBev}
                     ${p.wd1},${p.hBot1}
                     ${p.wd*.5},${p.hBot1} 
                     ${p.wd*.5},${Number(p.hBot)-b/2} 
                     ${p.wdBev},${Number(p.hBot)-b/2}`
                     
            bRight = `${p.wdWBev},${Number(p.hBot)-b/2} 
                      ${p.wdWBev},${p.hBotBev}
                      ${p.wdW1},${p.hBot1}
                      ${p.wd*.5},${p.hBot1} 
                      ${p.wd*.5},${Number(p.hBot)-b/2} 
                      ${p.wdWBev},${Number(p.hBot)-b/2}`

            outLine = `${p.wdBev},${p.hBot} 
                       ${p.wdBev},${p.hBotBev} 
                       ${p.wd1},${p.hBot1}
                       ${p.wdW1},${p.hBot1} 
                       ${p.wdWBev},${p.hBotBev} 
                       ${p.wdWBev},${p.hBot}
                       ${p.wdBev},${p.hBot}`
        } else{

            const hR = position 

            f0 = `${p.wdBev},${hR}
                  ${p.wdBev},${hR-0.25}
                  ${p.wd1},${hR-0.75}
                  ${p.wd*.5},${hR-0.75}
                  ${p.wd*.5},${hR} 
                  ${p.wdBev},${hR}`  

            fLen = `${p.wdWBev},${hR}
                    ${p.wdWBev},${hR-0.25}
                    ${p.wdW1},${hR-0.75}
                    ${p.wd*.5},${hR-0.75}
                    ${p.wd*.5},${hR} 
                    ${p.wdWBev},${hR}` 

            bLeft = `${p.wdBev},${hR}
                     ${p.wdBev},${hR+0.25}
                     ${p.wd1},${hR+0.75}
                     ${p.wd*.5},${hR+0.75}
                     ${p.wd*.5},${hR} 
                     ${p.wdBev},${hR}`  
  
            bRight = `${p.wdWBev},${hR}
                      ${p.wdWBev},${hR+0.25}
                      ${p.wdW1},${hR+0.75}
                      ${p.wd*.5},${hR+0.75}
                      ${p.wd*.5},${hR} 
                      ${p.wdWBev},${hR}` 

            outLine = `${p.wdBev},${hR-0.25}
                       ${p.wd1},${hR-.75} 
                       ${p.wdW1},${hR-.75} 
                       ${p.wdWBev},${hR-0.25} 
                       ${p.wdWBev},${hR+0.25} 
                       ${p.wdW1},${hR+.75} 
                       ${p.wd1},${hR+.75} 
                       ${p.wdBev},${hR+0.25} 
                       ${p.wdBev},${hR-0.25}`
        }

       return{front0 : f0 ,frontLen: fLen, backLeft:bLeft, backRight:bRight, outline:outLine}

    },[p,position])


    // keys to return correct gcode from the gcode object
    const keys :RailKeys = useMemo(()=>{

        if(position === 'top'){
            return{front0: 'topZero', frontLen: 'topLen', backLeft: 'topBackLeft', backRight: 'topBackRight'}
        } else if (position === 'bottom'){
            return{front0: 'bottomZero', frontLen: 'bottomLen', backLeft: 'bottomBackLeft', backRight: 'bottomBackRight'}
        } else{
            return{front0: 'middleZero', frontLen: 'middleLen', backLeft: 'middleBack', backRight: 'middleBack'}
        }


        return{front0: '', frontLen: '', backLeft: '', backRight: ''}
    },[position])


    // labels for the gcode text areas in the modal
    const labels :RailKeys = useMemo(()=>{
        // set polygon positions for top rail
         if(position === 'top'){
            return{
                front0:  'Top Front Zero',
                frontLen: 'Top Front Len',
                backLeft: 'Top Back Left \\__',
                backRight: 'Top Back Right __/',
            }
         } else if (position === 'bottom'){
            return{
                front0:  'Bottom Front Zero',
                frontLen: 'Bottom Front Len',
                backLeft: 'Bottom Back Left \\__',
                backRight: 'Bottom Back Right __/',
            }
         } else {
            return{
                front0:  `${position}in Front Zero`,
                frontLen: `${position}in Front Len`,
                backLeft: `${position}in Back Left \\__/`,
                backRight: `${position}in Back Right \\__/`,
            }
         }
 
         return{front0: '', frontLen: '', backLeft: '', backRight: ''}
     },[position])


     // reset fillcolors if reset is triggered on main page
     useEffect(()=>{
        setFillF0("lightgray")
        setFillFLen("lightgray")
        setFillBLeft("lightgray")
        setFillBRight("lightgray")
     },[reset])


    return(
        <>
            <polygon points={points.front0}    fill={fillF0}     onClick={()=>{setShow(true)}} />
            <polygon points={points.frontLen}  fill={fillFLen}   onClick={()=>{setShow(true)}} />
            <polygon points={points.backLeft}  fill={fillBLeft}  onClick={()=>{setShow(true)}} />
            <polygon points={points.backRight} fill={fillBRight} onClick={()=>{setShow(true)}} />
            <polygon points={points.outline}   stroke="black" strokeWidth=".1" fill={"none"} />

            <Modal 
                open={show}
                onCancel={()=>{setShow(false)}}
                onOk={()=>{setShow(false)}}
                style={{minWidth:'1200px'}}
             >  
                {g != undefined &&
                    <div style={{padding:'20px',overflowY:'auto'}}>
                        <table style={{margin:'auto'}}>
                            <tr>
                                <td>
                                    <GCode
                                        title = {labels.backLeft}
                                        gCode ={g[keys.backLeft]}
                                        color = {fillBLeft}
                                        setColor = {setFillBLeft}
                                    />
                                </td>
                                <td>
                                    <GCode
                                        title = {labels.front0}
                                        gCode ={g[keys.front0]}
                                        color = {fillF0}
                                        setColor = {setFillF0}
                                    />
                                </td>
                                <td>
                                    <GCode
                                        title = {labels.frontLen}
                                        gCode ={g[keys.frontLen]}
                                        color = {fillFLen}
                                        setColor = {setFillFLen}
                                    />
                                </td>
                                <td>
                                    <GCode
                                        title = {labels.backRight}
                                        gCode ={g[keys.backRight]}
                                        color = {fillBRight}
                                        setColor = {setFillBRight}
                                    />
                                </td>
                            </tr>
                        </table>
                    </div>
                }
            </Modal> 
        </>
    )
}