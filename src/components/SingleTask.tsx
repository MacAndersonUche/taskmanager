import { useState } from "react"

interface Props {
    text: string
    changeCountHandler: (stat: boolean) => void
}

const SingleTask = ({ text, changeCountHandler }: Props) => {

    const [isActive, setIsActive] = useState(false)

    const handleClick = () => {
        setIsActive(prev => !prev)
        changeCountHandler(isActive)
    }

    return <li>{!isActive ? <p onClick={handleClick}>{text}</p> : <s onClick={handleClick}>{text}</s>}</li>

}

export default SingleTask