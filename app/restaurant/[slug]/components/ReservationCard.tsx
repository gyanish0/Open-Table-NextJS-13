"use client"
import DatePicker from "react-datepicker"
import { partySize, times } from "../../../../data"
import { useState } from "react"
function ReservationCard({ openTime, closeTime }: { openTime: string, closeTime: string }) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
    const handleChangeDate = (date: Date | null) => {
        if (date) {
            return setSelectedDate(date)
        }
        return setSelectedDate(null)
    }

    const filterTime = () => {
        const timesInWindow: typeof times = []

        let isWithinWindow = false
        times.forEach((time) => {
            if (time.time === openTime) {
                isWithinWindow = true
            }
            if (isWithinWindow) {
                timesInWindow.push(time)
            }
            if (time.time === closeTime) {
                isWithinWindow = false
            }
        })
        return timesInWindow
    }
    return (
        <div className="w-[100%] bg-white rounded p-3 shadow">
            <div className="text-center border-b pb-2 font-bold">
                <h4 className="mr-7 text-lg">Make a Reservation</h4>
            </div>
            <div className="my-3 flex flex-col">
                <label htmlFor="">Party size</label>
                <select name="" className="py-3 border-b font-light" id="">
                    {
                        partySize.map((size, i) => {
                            return (
                                <option value={size.value} key={i}>{size.label}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="">Date</label>
                    <DatePicker selected={selectedDate} onChange={handleChangeDate} className="py-3 border-b font-light text-reg w-28 " dateFormat="MMMM d" wrapperClassName="w-[48%]" />
                </div>
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="">Time</label>
                    <select name="" id="" className="py-3 border-b font-light">
                        {
                            filterTime().map((time, i) => {
                                return (
                                    <option value={time.time} key={i}>{time.displayTime}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="mt-5">
                <button
                    className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
                >
                    Find a Time
                </button>
            </div>
        </div>
    )
}

export default ReservationCard
