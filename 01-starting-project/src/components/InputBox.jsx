import { Fragment } from "react"

export default function InputBox() {

    let singleBox = (
        <>
            <label>INITIAL WITHDRAWAL</label>
            <input />
        </>
    )

    return (
        <Fragment>
            <div id="user-input">
                { singleBox }
            </div>
        </Fragment>
    )
}