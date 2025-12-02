import React, {useRef, useEffect, useState} from "react"
import "./Storage.css"
import token from "./assets/token.png"
import Ads from "./assets/Ads.png"
import failed from "./assets/failed.png"
import passed from "./assets/passed.png"
import rate from "./assets/rate.png"

const StorageGrid = (props) => {
    const day1 = useRef(null)
    const day2 = useRef(null)
    const day3 = useRef(null)
    const day4 = useRef(null)
    const day5 = useRef(null)
    const day6 = useRef(null)
    const day7 = useRef(null)
    const day8 = useRef(null)
    const day9 = useRef(null)
    const day10 = useRef(null)
    const day11 = useRef(null)
    const day12 = useRef(null)
    const day13 = useRef(null)
    const day14 = useRef(null)
    const day15 = useRef(null)
    const day16 = useRef(null)
    const day17 = useRef(null)
    const day18 = useRef(null)
    const day19 = useRef(null)
    const day20 = useRef(null)
    const day21 = useRef(null)
    const day22 = useRef(null)
    const day23 = useRef(null)
    const day24 = useRef(null)
    const day25 = useRef(null)
    const day26 = useRef(null)
    const day27 = useRef(null)
    const day28 = useRef(null)
    const back = useRef(null)
    const [Clicked, setClick] = useState(false)
    const [month, setMonth] = useState("01")

    const [weeks, setWeeks] = useState({
        week1: true,
        week2: true,
        week3: true,
        week4: true
    })

    const [days, setDays] = useState({
        Day1: true,
        Day2: true,
        Day3: true,
        Day4: true,
        Day5: true,
        Day6: true,
        Day7: true
    })

    const handleClickEffect = (day, week, weekDay) => {
        setClick(true)
        const days = [day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25, day26, day27, day28]
        for (let i = 0; i < 28; i++) {
            days[i].current.classList.remove("clicked");
            if ((days[i].current) !== (day.current)) {
                requestAnimationFrame(() => {
                    days[i].current.classList.remove("open")
                    days[i].current.classList.add("close")
                })
            }
        }
        day.current.classList.add("clicked")
        setTimeout(() => {
            day.current.classList.add("target")
        }, 1000)
        setTimeout(() => {
            setWeeks((prev) => (Object.fromEntries(Object.keys(prev).map((key) => [key, false]))))
            setDays((prev) => (Object.fromEntries(Object.keys(prev).map((key) => [key, false]))))

            setWeeks((prev) => ({...prev, [week]: true}))
            setDays((prev) => ({...prev, [weekDay]: true}))
            back.current.classList.remove("close")
            back.current.classList.add("open")
            document.querySelectorAll(".TDisplay").forEach((element) => {
                element.classList.remove("close")
                element.classList.add("open")
            })
        }, 3000)

    }
    
    const handleBack = () => {
        setWeeks((prev) => (Object.fromEntries(Object.keys(prev).map(key => [key, true]))))
        setDays((prev) => (Object.fromEntries(Object.keys(prev).map(key => [key, true]))))
        setClick(false)
        setTimeout(() => {
            const days = [day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25, day26, day27, day28]
        for (let i = 0; i < 28; i++) {
            days[i].current.classList.remove("close")
            requestAnimationFrame(() => {
                days[i].current.classList.add("open")
            })
        }
        },0)
        
        document.querySelector(".target").classList.remove("target")
    }

    useEffect(() => {
        const days = [day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25, day26, day27, day28]
        for (let i = 0; i < 28; i++) {
            days[i].current.classList.remove("close")
            requestAnimationFrame(() => {
                days[i].current.classList.add("open")
            })
        }
    }, [])

    return (
        <>
            <div className="m">
                {weeks.week1 && <div className="w1 w">
    {days.Day1 && <div className="w1d1 cell close" ref={day1} onClick={() => handleClickEffect(day1, "week1", "Day1")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 1</p>
        <div className="TDisplay">
        <img src={token} className="TIcon T"></img>
        <p className="TValue">{props.db[`${month}0101`]?.tokens}</p>
        </div>
        {Clicked && (
            <>
                <div className="TDisplay close">
                <img src={rate} className="TIcon R"></img>
                <p className="TValue">{props.db[`${month}0101`]?.rate}</p>
                </div>
                <div className="TDisplay close">
                <img src={Ads} className="TIcon A"></img>
                <p className="TValue">{props.db[`${month}0101`]?.ads}</p>
                </div>
                <div className="TDisplay close">
                <img src={passed} className="TIcon P"></img>
                <p className="TValue">{props.db[`${month}0101`]?.success}</p>
                </div>
                <div className="TDisplay close">
                <img src={failed} className="TIcon F"></img>
                <p className="TValue">{props.db[`${month}0101`]?.fail}</p>
                </div>
            </>
        )}
        </div>}

    {days.Day2 && <div className="w1d2 cell close" ref={day2} onClick={() => handleClickEffect(day2, "week1", "Day2")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 2</p>
        <div className="TDisplay">
        <img src={token} className="TIcon T"></img>
        <p className="TValue">{props.db[`${month}0102`]?.tokens}</p>
        </div>
        {Clicked && (
            <>
                <div className="TDisplay close">
                <img src={rate} className="TIcon R"></img>
                <p className="TValue">{props.db[`${month}0102`]?.rate}</p>
                </div>
                <div className="TDisplay close">
                <img src={Ads} className="TIcon A"></img>
                <p className="TValue">{props.db[`${month}0102`]?.ads}</p>
                </div>
                <div className="TDisplay close">
                <img src={passed} className="TIcon P"></img>
                <p className="TValue">{props.db[`${month}0102`]?.success}</p>
                </div>
                <div className="TDisplay close">
                <img src={failed} className="TIcon F"></img>
                <p className="TValue">{props.db[`${month}0102`]?.fail}</p>
                </div>
            </>
        )}
        </div>}

    {days.Day3 && <div className="w1d3 cell close" ref={day3} onClick={() => handleClickEffect(day3, "week1", "Day3")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 3</p>
        <div className="TDisplay">
        <img src={token} className="TIcon T"></img>
        <p className="TValue">{props.db[`${month}0103`]?.tokens}</p>
        </div>
        {Clicked && (
            <>
                <div className="TDisplay close">
                <img src={rate} className="TIcon R"></img>
                <p className="TValue">{props.db[`${month}0103`]?.rate}</p>
                </div>
                <div className="TDisplay close">
                <img src={Ads} className="TIcon A"></img>
                <p className="TValue">{props.db[`${month}0103`]?.ads}</p>
                </div>
                <div className="TDisplay close">
                <img src={passed} className="TIcon P"></img>
                <p className="TValue">{props.db[`${month}0103`]?.success}</p>
                </div>
                <div className="TDisplay close">
                <img src={failed} className="TIcon F"></img>
                <p className="TValue">{props.db[`${month}0103`]?.fail}</p>
                </div>
            </>
        )}
        </div>}

    {days.Day4 && <div className="w1d4 cell close" ref={day4} onClick={() => handleClickEffect(day4, "week1", "Day4")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 4</p>
        <div className="TDisplay">
        <img src={token} className="TIcon T"></img>
        <p className="TValue">{props.db[`${month}0104`]?.tokens}</p>
        </div>
        {Clicked && (
            <>
                <div className="TDisplay close">
                <img src={rate} className="TIcon R"></img>
                <p className="TValue">{props.db[`${month}0104`]?.rate}</p>
                </div>
                <div className="TDisplay close">
                <img src={Ads} className="TIcon A"></img>
                <p className="TValue">{props.db[`${month}0104`]?.ads}</p>
                </div>
                <div className="TDisplay close">
                <img src={passed} className="TIcon P"></img>
                <p className="TValue">{props.db[`${month}0104`]?.success}</p>
                </div>
                <div className="TDisplay close">
                <img src={failed} className="TIcon F"></img>
                <p className="TValue">{props.db[`${month}0104`]?.fail}</p>
                </div>
            </>
        )}
        </div>}

    {days.Day5 && <div className="w1d5 cell close" ref={day5} onClick={() => handleClickEffect(day5, "week1", "Day5")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 5</p>
        <div className="TDisplay">
        <img src={token} className="TIcon T"></img>
        <p className="TValue">{props.db[`${month}0105`]?.tokens}</p>
        </div>
        {Clicked && (
            <>
                <div className="TDisplay close">
                <img src={rate} className="TIcon R"></img>
                <p className="TValue">{props.db[`${month}0105`]?.rate}</p>
                </div>
                <div className="TDisplay close">
                <img src={Ads} className="TIcon A"></img>
                <p className="TValue">{props.db[`${month}0105`]?.ads}</p>
                </div>
                <div className="TDisplay close">
                <img src={passed} className="TIcon P"></img>
                <p className="TValue">{props.db[`${month}0105`]?.success}</p>
                </div>
                <div className="TDisplay close">
                <img src={failed} className="TIcon F"></img>
                <p className="TValue">{props.db[`${month}0105`]?.fail}</p>
                </div>
            </>
        )}
        </div>}

    {days.Day6 && <div className="w1d6 cell close" ref={day6} onClick={() => handleClickEffect(day6, "week1", "Day6")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 6</p>
        <div className="TDisplay">
        <img src={token} className="TIcon T"></img>
        <p className="TValue">{props.db[`${month}0106`]?.tokens}</p>
        </div>
        {Clicked && (
            <>
                <div className="TDisplay close">
                <img src={rate} className="TIcon R"></img>
                <p className="TValue">{props.db[`${month}0106`]?.rate}</p>
                </div>
                <div className="TDisplay close">
                <img src={Ads} className="TIcon A"></img>
                <p className="TValue">{props.db[`${month}0106`]?.ads}</p>
                </div>
                <div className="TDisplay close">
                <img src={passed} className="TIcon P"></img>
                <p className="TValue">{props.db[`${month}0106`]?.success}</p>
                </div>
                <div className="TDisplay close">
                <img src={failed} className="TIcon F"></img>
                <p className="TValue">{props.db[`${month}0106`]?.fail}</p>
                </div>
            </>
        )}
        </div>}

    {days.Day7 && <div className="w1d7 cell close" ref={day7} onClick={() => handleClickEffect(day7, "week1", "Day7")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 7</p>
        <div className="TDisplay">
        <img src={token} className="TIcon T"></img>
        <p className="TValue">{props.db[`${month}0107`]?.tokens}</p>
        </div>
        {Clicked && (
            <>
                <div className="TDisplay close">
                <img src={rate} className="TIcon R"></img>
                <p className="TValue">{props.db[`${month}0107`]?.rate}</p>
                </div>
                <div className="TDisplay close">
                <img src={Ads} className="TIcon A"></img>
                <p className="TValue">{props.db[`${month}0107`]?.ads}</p>
                </div>
                <div className="TDisplay close">
                <img src={passed} className="TIcon P"></img>
                <p className="TValue">{props.db[`${month}0107`]?.success}</p>
                </div>
                <div className="TDisplay close">
                <img src={failed} className="TIcon F"></img>
                <p className="TValue">{props.db[`${month}0107`]?.fail}</p>
                </div>
            </>
        )}
        </div>}
</div>}
                {weeks.week2 && <div className="w2 w">
                    
    {days.Day1 && <div className="w2d1 cell close" ref={day8} onClick={() => handleClickEffect(day8, "week2", "Day1")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 8</p>
        <div className="TDisplay">
            <img src={token} className="TIcon T" />
            <p className="TValue">{props.db[`${month}0201`]?.tokens}</p>
        </div>
        {Clicked && <>
            <div className="TDisplay close"><img src={rate} className="TIcon R" /><p className="TValue">{props.db[`${month}0201`]?.rate}</p></div>
            <div className="TDisplay close"><img src={Ads} className="TIcon A" /><p className="TValue">{props.db[`${month}0201`]?.ads}</p></div>
            <div className="TDisplay close"><img src={passed} className="TIcon P" /><p className="TValue">{props.db[`${month}0201`]?.success}</p></div>
            <div className="TDisplay close"><img src={failed} className="TIcon F" /><p className="TValue">{props.db[`${month}0201`]?.fail}</p></div>
        </>}
    </div>}

    {days.Day2 && <div className="w2d2 cell close" ref={day9} onClick={() => handleClickEffect(day9, "week2", "Day2")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 9</p>
        <div className="TDisplay">
            <img src={token} className="TIcon T" />
            <p className="TValue">{props.db[`${month}0202`]?.tokens}</p>
        </div>
        {Clicked && <>
            <div className="TDisplay close"><img src={rate} className="TIcon R" /><p className="TValue">{props.db[`${month}0202`]?.rate}</p></div>
            <div className="TDisplay close"><img src={Ads} className="TIcon A" /><p className="TValue">{props.db[`${month}0202`]?.ads}</p></div>
            <div className="TDisplay close"><img src={passed} className="TIcon P" /><p className="TValue">{props.db[`${month}0202`]?.success}</p></div>
            <div className="TDisplay close"><img src={failed} className="TIcon F" /><p className="TValue">{props.db[`${month}0202`]?.fail}</p></div>
        </>}
    </div>}

    {days.Day3 && <div className="w2d3 cell close" ref={day10} onClick={() => handleClickEffect(day10, "week2", "Day3")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 10</p>
        <div className="TDisplay">
            <img src={token} className="TIcon T" />
            <p className="TValue">{props.db[`${month}0203`]?.tokens}</p>
        </div>
        {Clicked && <>
            <div className="TDisplay close"><img src={rate} className="TIcon R" /><p className="TValue">{props.db[`${month}0203`]?.rate}</p></div>
            <div className="TDisplay close"><img src={Ads} className="TIcon A" /><p className="TValue">{props.db[`${month}0203`]?.ads}</p></div>
            <div className="TDisplay close"><img src={passed} className="TIcon P" /><p className="TValue">{props.db[`${month}0203`]?.success}</p></div>
            <div className="TDisplay close"><img src={failed} className="TIcon F" /><p className="TValue">{props.db[`${month}0203`]?.fail}</p></div>
        </>}
    </div>}

    {days.Day4 && <div className="w2d4 cell close" ref={day11} onClick={() => handleClickEffect(day11, "week2", "Day4")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 11</p>
        <div className="TDisplay">
            <img src={token} className="TIcon T" />
            <p className="TValue">{props.db[`${month}0204`]?.tokens}</p>
        </div>
        {Clicked && <>
            <div className="TDisplay close"><img src={rate} className="TIcon R" /><p className="TValue">{props.db[`${month}0204`]?.rate}</p></div>
            <div className="TDisplay close"><img src={Ads} className="TIcon A" /><p className="TValue">{props.db[`${month}0204`]?.ads}</p></div>
            <div className="TDisplay close"><img src={passed} className="TIcon P" /><p className="TValue">{props.db[`${month}0204`]?.success}</p></div>
            <div className="TDisplay close"><img src={failed} className="TIcon F" /><p className="TValue">{props.db[`${month}0204`]?.fail}</p></div>
        </>}
    </div>}

    {days.Day5 && <div className="w2d5 cell close" ref={day12} onClick={() => handleClickEffect(day12, "week2", "Day5")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 12</p>
        <div className="TDisplay">
            <img src={token} className="TIcon T" />
            <p className="TValue">{props.db[`${month}0205`]?.tokens}</p>
        </div>
        {Clicked && <>
            <div className="TDisplay close"><img src={rate} className="TIcon R" /><p className="TValue">{props.db[`${month}0205`]?.rate}</p></div>
            <div className="TDisplay close"><img src={Ads} className="TIcon A" /><p className="TValue">{props.db[`${month}0205`]?.ads}</p></div>
            <div className="TDisplay close"><img src={passed} className="TIcon P" /><p className="TValue">{props.db[`${month}0205`]?.success}</p></div>
            <div className="TDisplay close"><img src={failed} className="TIcon F" /><p className="TValue">{props.db[`${month}0205`]?.fail}</p></div>
        </>}
    </div>}

    {days.Day6 && <div className="w2d6 cell close" ref={day13} onClick={() => handleClickEffect(day13, "week2", "Day6")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 13</p>
        <div className="TDisplay">
            <img src={token} className="TIcon T" />
            <p className="TValue">{props.db[`${month}0206`]?.tokens}</p>
        </div>
        {Clicked && <>
            <div className="TDisplay close"><img src={rate} className="TIcon R" /><p className="TValue">{props.db[`${month}0206`]?.rate}</p></div>
            <div className="TDisplay close"><img src={Ads} className="TIcon A" /><p className="TValue">{props.db[`${month}0206`]?.ads}</p></div>
            <div className="TDisplay close"><img src={passed} className="TIcon P" /><p className="TValue">{props.db[`${month}0206`]?.success}</p></div>
            <div className="TDisplay close"><img src={failed} className="TIcon F" /><p className="TValue">{props.db[`${month}0206`]?.fail}</p></div>
        </>}
    </div>}

    {days.Day7 && <div className="w2d7 cell close" ref={day14} onClick={() => handleClickEffect(day14, "week2", "Day7")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 14</p>
        <div className="TDisplay">
            <img src={token} className="TIcon T" />
            <p className="TValue">{props.db[`${month}0207`]?.tokens}</p>
        </div>
        {Clicked && <>
            <div className="TDisplay close"><img src={rate} className="TIcon R" /><p className="TValue">{props.db[`${month}0207`]?.rate}</p></div>
            <div className="TDisplay close"><img src={Ads} className="TIcon A" /><p className="TValue">{props.db[`${month}0207`]?.ads}</p></div>
            <div className="TDisplay close"><img src={passed} className="TIcon P" /><p className="TValue">{props.db[`${month}0207`]?.success}</p></div>
            <div className="TDisplay close"><img src={failed} className="TIcon F" /><p className="TValue">{props.db[`${month}0207`]?.fail}</p></div>
        </>}
    </div>}

</div>}
                {weeks.week3 && <div className="w3 w">

{days.Day1 && <div className="w3d1 cell close" ref={day15} onClick={() => handleClickEffect(day15, "week3", "Day1")}>
    <p className={Clicked ? "DayC" : "DayN"}>Day 15</p>

    <div className="TDisplay">
        <img src={token} className="TIcon T" />
        <p className="TValue">{props.db[`${month}0301`]?.tokens}</p>
    </div>

    {Clicked && <>
        <div className="TDisplay close">
            <img src={rate} className="TIcon R" />
            <p className="TValue">{props.db[`${month}0301`]?.rate}</p>
        </div>
        <div className="TDisplay close">
            <img src={Ads} className="TIcon A" />
            <p className="TValue">{props.db[`${month}0301`]?.ads}</p>
        </div>
        <div className="TDisplay close">
            <img src={passed} className="TIcon P" />
            <p className="TValue">{props.db[`${month}0301`]?.success}</p>
        </div>
        <div className="TDisplay close">
            <img src={failed} className="TIcon F" />
            <p className="TValue">{props.db[`${month}0301`]?.fail}</p>
        </div>
    </>}
</div>}

{days.Day2 && <div className="w3d2 cell close" ref={day16} onClick={() => handleClickEffect(day16, "week3", "Day2")}>
    <p className={Clicked ? "DayC" : "DayN"}>Day 16</p>

    <div className="TDisplay">
        <img src={token} className="TIcon T" />
        <p className="TValue">{props.db[`${month}0302`]?.tokens}</p>
    </div>

    {Clicked && <>
        <div className="TDisplay close">
            <img src={rate} className="TIcon R" />
            <p className="TValue">{props.db[`${month}0302`]?.rate}</p>
        </div>
        <div className="TDisplay close">
            <img src={Ads} className="TIcon A" />
            <p className="TValue">{props.db[`${month}0302`]?.ads}</p>
        </div>
        <div className="TDisplay close">
            <img src={passed} className="TIcon P" />
            <p className="TValue">{props.db[`${month}0302`]?.success}</p>
        </div>
        <div className="TDisplay close">
            <img src={failed} className="TIcon F" />
            <p className="TValue">{props.db[`${month}0302`]?.fail}</p>
        </div>
    </>}
</div>}

{days.Day3 && <div className="w3d3 cell close" ref={day17} onClick={() => handleClickEffect(day17, "week3", "Day3")}>
    <p className={Clicked ? "DayC" : "DayN"}>Day 17</p>

    <div className="TDisplay">
        <img src={token} className="TIcon T" />
        <p className="TValue">{props.db[`${month}0303`]?.tokens}</p>
    </div>

    {Clicked && <>
        <div className="TDisplay close">
            <img src={rate} className="TIcon R" />
            <p className="TValue">{props.db[`${month}0303`]?.rate}</p>
        </div>
        <div className="TDisplay close">
            <img src={Ads} className="TIcon A" />
            <p className="TValue">{props.db[`${month}0303`]?.ads}</p>
        </div>
        <div className="TDisplay close">
            <img src={passed} className="TIcon P" />
            <p className="TValue">{props.db[`${month}0303`]?.success}</p>
        </div>
        <div className="TDisplay close">
            <img src={failed} className="TIcon F" />
            <p className="TValue">{props.db[`${month}0303`]?.fail}</p>
        </div>
    </>}
</div>}

{days.Day4 && <div className="w3d4 cell close" ref={day18} onClick={() => handleClickEffect(day18, "week3", "Day4")}>
    <p className={Clicked ? "DayC" : "DayN"}>Day 18</p>

    <div className="TDisplay">
        <img src={token} className="TIcon T" />
        <p className="TValue">{props.db[`${month}0304`]?.tokens}</p>
    </div>

    {Clicked && <>
        <div className="TDisplay close">
            <img src={rate} className="TIcon R" />
            <p className="TValue">{props.db[`${month}0304`]?.rate}</p>
        </div>
        <div className="TDisplay close">
            <img src={Ads} className="TIcon A" />
            <p className="TValue">{props.db[`${month}0304`]?.ads}</p>
        </div>
        <div className="TDisplay close">
            <img src={passed} className="TIcon P" />
            <p className="TValue">{props.db[`${month}0304`]?.success}</p>
        </div>
        <div className="TDisplay close">
            <img src={failed} className="TIcon F" />
            <p className="TValue">{props.db[`${month}0304`]?.fail}</p>
        </div>
    </>}
</div>}

{days.Day5 && <div className="w3d5 cell close" ref={day19} onClick={() => handleClickEffect(day19, "week3", "Day5")}>
    <p className={Clicked ? "DayC" : "DayN"}>Day 19</p>

    <div className="TDisplay">
        <img src={token} className="TIcon T" />
        <p className="TValue">{props.db[`${month}0305`]?.tokens}</p>
    </div>

    {Clicked && <>
        <div className="TDisplay close">
            <img src={rate} className="TIcon R" />
            <p className="TValue">{props.db[`${month}0305`]?.rate}</p>
        </div>
        <div className="TDisplay close">
            <img src={Ads} className="TIcon A" />
            <p className="TValue">{props.db[`${month}0305`]?.ads}</p>
        </div>
        <div className="TDisplay close">
            <img src={passed} className="TIcon P" />
            <p className="TValue">{props.db[`${month}0305`]?.success}</p>
        </div>
        <div className="TDisplay close">
            <img src={failed} className="TIcon F" />
            <p className="TValue">{props.db[`${month}0305`]?.fail}</p>
        </div>
    </>}
</div>}

{days.Day6 && <div className="w3d6 cell close" ref={day20} onClick={() => handleClickEffect(day20, "week3", "Day6")}>
    <p className={Clicked ? "DayC" : "DayN"}>Day 20</p>

    <div className="TDisplay">
        <img src={token} className="TIcon T" />
        <p className="TValue">{props.db[`${month}0306`]?.tokens}</p>
    </div>

    {Clicked && <>
        <div className="TDisplay close">
            <img src={rate} className="TIcon R" />
            <p className="TValue">{props.db[`${month}0306`]?.rate}</p>
        </div>
        <div className="TDisplay close">
            <img src={Ads} className="TIcon A" />
            <p className="TValue">{props.db[`${month}0306`]?.ads}</p>
        </div>
        <div className="TDisplay close">
            <img src={passed} className="TIcon P" />
            <p className="TValue">{props.db[`${month}0306`]?.success}</p>
        </div>
        <div className="TDisplay close">
            <img src={failed} className="TIcon F" />
            <p className="TValue">{props.db[`${month}0306`]?.fail}</p>
        </div>
    </>}
</div>}

{days.Day7 && <div className="w3d7 cell close" ref={day21} onClick={() => handleClickEffect(day21, "week3", "Day7")}>
    <p className={Clicked ? "DayC" : "DayN"}>Day 21</p>

    <div className="TDisplay">
        <img src={token} className="TIcon T" />
        <p className="TValue">{props.db[`${month}0307`]?.tokens}</p>
    </div>

    {Clicked && <>
        <div className="TDisplay close">
            <img src={rate} className="TIcon R" />
            <p className="TValue">{props.db[`${month}0307`]?.rate}</p>
        </div>
        <div className="TDisplay close">
            <img src={Ads} className="TIcon A" />
            <p className="TValue">{props.db[`${month}0307`]?.ads}</p>
        </div>
        <div className="TDisplay close">
            <img src={passed} className="TIcon P" />
            <p className="TValue">{props.db[`${month}0307`]?.success}</p>
        </div>
        <div className="TDisplay close">
            <img src={failed} className="TIcon F" />
            <p className="TValue">{props.db[`${month}0307`]?.fail}</p>
        </div>
    </>}
</div>}

</div>}
                {weeks.week4 && <div className="w4 w">
    {days.Day1 && <div className="w4d1 cell close" ref={day22} onClick={() => handleClickEffect(day22, "week4", "Day1")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 22</p>
        <div className="TDisplay">
            <img src={token} className="TIcon T" />
            <p className="TValue">{props.db[`${month}0401`]?.tokens}</p>
        </div>
        {Clicked && <>
            <div className="TDisplay close"><img src={rate} className="TIcon R" /><p className="TValue">{props.db[`${month}0401`]?.rate}</p></div>
            <div className="TDisplay close"><img src={Ads} className="TIcon A" /><p className="TValue">{props.db[`${month}0401`]?.ads}</p></div>
            <div className="TDisplay close"><img src={passed} className="TIcon P" /><p className="TValue">{props.db[`${month}0401`]?.success}</p></div>
            <div className="TDisplay close"><img src={failed} className="TIcon F" /><p className="TValue">{props.db[`${month}0401`]?.fail}</p></div>
        </>}
    </div>}

    {days.Day2 && <div className="w4d2 cell close" ref={day23} onClick={() => handleClickEffect(day23, "week4", "Day2")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 23</p>
        <div className="TDisplay">
            <img src={token} className="TIcon T" />
            <p className="TValue">{props.db[`${month}0402`]?.tokens}</p>
        </div>
        {Clicked && <>
            <div className="TDisplay close"><img src={rate} className="TIcon R" /><p className="TValue">{props.db[`${month}0402`]?.rate}</p></div>
            <div className="TDisplay close"><img src={Ads} className="TIcon A" /><p className="TValue">{props.db[`${month}0402`]?.ads}</p></div>
            <div className="TDisplay close"><img src={passed} className="TIcon P" /><p className="TValue">{props.db[`${month}0402`]?.success}</p></div>
            <div className="TDisplay close"><img src={failed} className="TIcon F" /><p className="TValue">{props.db[`${month}0402`]?.fail}</p></div>
        </>}
    </div>}

    {days.Day3 && <div className="w4d3 cell close" ref={day24} onClick={() => handleClickEffect(day24, "week4", "Day3")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 24</p>
        <div className="TDisplay">
            <img src={token} className="TIcon T" />
            <p className="TValue">{props.db[`${month}0403`]?.tokens}</p>
        </div>
        {Clicked && <>
            <div className="TDisplay close"><img src={rate} className="TIcon R" /><p className="TValue">{props.db[`${month}0403`]?.rate}</p></div>
            <div className="TDisplay close"><img src={Ads} className="TIcon A" /><p className="TValue">{props.db[`${month}0403`]?.ads}</p></div>
            <div className="TDisplay close"><img src={passed} className="TIcon P" /><p className="TValue">{props.db[`${month}0403`]?.success}</p></div>
            <div className="TDisplay close"><img src={failed} className="TIcon F" /><p className="TValue">{props.db[`${month}0403`]?.fail}</p></div>
        </>}
    </div>}

    {days.Day4 && <div className="w4d4 cell close" ref={day25} onClick={() => handleClickEffect(day25, "week4", "Day4")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 25</p>
        <div className="TDisplay">
            <img src={token} className="TIcon T" />
            <p className="TValue">{props.db[`${month}0404`]?.tokens}</p>
        </div>
        {Clicked && <>
            <div className="TDisplay close"><img src={rate} className="TIcon R" /><p className="TValue">{props.db[`${month}0404`]?.rate}</p></div>
            <div className="TDisplay close"><img src={Ads} className="TIcon A" /><p className="TValue">{props.db[`${month}0404`]?.ads}</p></div>
            <div className="TDisplay close"><img src={passed} className="TIcon P" /><p className="TValue">{props.db[`${month}0404`]?.success}</p></div>
            <div className="TDisplay close"><img src={failed} className="TIcon F" /><p className="TValue">{props.db[`${month}0404`]?.fail}</p></div>
        </>}
    </div>}

    {days.Day5 && <div className="w4d5 cell close" ref={day26} onClick={() => handleClickEffect(day26, "week4", "Day5")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 26</p>
        <div className="TDisplay">
            <img src={token} className="TIcon T" />
            <p className="TValue">{props.db[`${month}0405`]?.tokens}</p>
        </div>
        {Clicked && <>
            <div className="TDisplay close"><img src={rate} className="TIcon R" /><p className="TValue">{props.db[`${month}0405`]?.rate}</p></div>
            <div className="TDisplay close"><img src={Ads} className="TIcon A" /><p className="TValue">{props.db[`${month}0405`]?.ads}</p></div>
            <div className="TDisplay close"><img src={passed} className="TIcon P" /><p className="TValue">{props.db[`${month}0405`]?.success}</p></div>
            <div className="TDisplay close"><img src={failed} className="TIcon F" /><p className="TValue">{props.db[`${month}0405`]?.fail}</p></div>
        </>}
    </div>}

    {days.Day6 && <div className="w4d6 cell close" ref={day27} onClick={() => handleClickEffect(day27, "week4", "Day6")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 27</p>
        <div className="TDisplay">
            <img src={token} className="TIcon T" />
            <p className="TValue">{props.db[`${month}0406`]?.tokens}</p>
        </div>
        {Clicked && <>
            <div className="TDisplay close"><img src={rate} className="TIcon R" /><p className="TValue">{props.db[`${month}0406`]?.rate}</p></div>
            <div className="TDisplay close"><img src={Ads} className="TIcon A" /><p className="TValue">{props.db[`${month}0406`]?.ads}</p></div>
            <div className="TDisplay close"><img src={passed} className="TIcon P" /><p className="TValue">{props.db[`${month}0406`]?.success}</p></div>
            <div className="TDisplay close"><img src={failed} className="TIcon F" /><p className="TValue">{props.db[`${month}0406`]?.fail}</p></div>
        </>}
    </div>}

    {days.Day7 && <div className="w4d7 cell close" ref={day28} onClick={() => handleClickEffect(day28, "week4", "Day7")}>
        <p className={ Clicked ? "DayC" : "DayN"}>Day 28</p>
        <div className="TDisplay">
            <img src={token} className="TIcon T" />
            <p className="TValue">{props.db[`${month}0407`]?.tokens}</p>
        </div>
        {Clicked && <>
            <div className="TDisplay close"><img src={rate} className="TIcon R" /><p className="TValue">{props.db[`${month}0407`]?.rate}</p></div>
            <div className="TDisplay close"><img src={Ads} className="TIcon A" /><p className="TValue">{props.db[`${month}0407`]?.ads}</p></div>
            <div className="TDisplay close"><img src={passed} className="TIcon P" /><p className="TValue">{props.db[`${month}0407`]?.success}</p></div>
            <div className="TDisplay close"><img src={failed} className="TIcon F" /><p className="TValue">{props.db[`${month}0407`]?.fail}</p></div>
        </>}
    </div>}
</div>}
                {Clicked && <div ref={back} className="back close" onClick={() => handleBack()}>Back</div>}
            </div>
        </>
    );
}

export default StorageGrid;