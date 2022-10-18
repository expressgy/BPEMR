import BPEMR from './index.module.scss'
import {useState, useEffect} from "react";

export default function Button(props){
    // console.log(props)

    const [size, setSize] = useState(props.size)
    const [type, setType] = useState(props.type)

    useEffect(() => {
        setSize(props.size ? props.size : 'default')
        setType(props.type ? props.type : 'default')
    },[props.size, props.type])

    const sizeOp = {
        default:BPEMR.defaultsize,
        undersize:BPEMR.undersize,
        oversize:BPEMR.oversize,
    }
    const typeOp = {
        default: BPEMR.defaultColor,

        error: BPEMR.eColor,
        error2: BPEMR.e2Color,
        error3: BPEMR.e3Color,

        success: BPEMR.sColor,
        success2: BPEMR.s3Color,
        success3: BPEMR.s2Color,

        warning: BPEMR.wColor,
        warning1: BPEMR.w2Color,
        warning3: BPEMR.w3Color,
    }



    const classname = [BPEMR.BPEMR_button, sizeOp[size], typeOp[type]].join(' ')

    return (
        <div className={classname} style={props.style} onClick={ !props.disable ? props.onClick : ()=>{}}>{props.children}</div>
    )
}