import { Modal } from "@/components/ui/modal/Modal";
import { getDashedFormattedDate } from "@/utils/date";
import { useState } from "react";

export default function MeetingRoomRequestModal({ username, date, onClose, onConfirm }: { username : string, date : string, onClose: () => void, onConfirm: (date: string, purpose: string) => void }) {
    const [purpose, setPurpose] = useState("");

    return (
        <Modal className="max-w-3xl h-[535px] rounded-[20px] border-gray border px-11 py-12" isOpen={true} onClose={onClose} >
            <form onSubmit={(e) => {
                e.preventDefault();
                onConfirm?.(date, purpose);
               }}
               className=" flex flex-col gap-[14px]"
               >
               <div className="w-full flex gap-[21px] flex-col">   
                    <div className="bg-lightgray w-fit rounded-[5px] px-[10px] py-[11px]">
                        <p className="text-[#777777] text-2xl font-semibold">{username}</p>
                    </div> 
                    <div className="flex gap-[20px] items-center">
                        <h2 className="font-semibold text-lg text-black">대여 희망 날짜</h2>
                        <p className="text-black text-xs">{getDashedFormattedDate(date)}</p>
                    </div>
                    <div className="flex gap-[60px]">
                        <h2 className="font-semibold text-lg text-black text-nowrap">사용목적</h2>
                        <textarea 
                            className="w-full h-[270px] bg-lightgray px-[15px] py-[10px] resize-none"
                            placeholder="사용목적을 적어주세요."
                            value={purpose}
                            maxLength={2000}
                            required
                            onChange={(e) => setPurpose(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <div className="w-full flex justify-end gap-3 text-base">
                    <button type="button" onClick={() => onClose?.()} className="px-[22px] py-[10px] border-black border bg-[#F9F9F9] text-black rounded-[100px]">취소</button>
                    <button type="submit" className="px-[22px] py-[10px] bg-black text-white rounded-[100px]">신청하기</button>
                </div>
            </form>
        </Modal>
    );
};