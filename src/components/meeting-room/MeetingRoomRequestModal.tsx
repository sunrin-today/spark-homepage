

import { Modal } from "@/components/ui/modal/Modal";
import { getDashedFormattedDate } from "@/utils/date";

export default function ConfirmModal({ date, onClose, onConfirm }: { date : string, onClose: () => void, onConfirm: () => void }) {
    return (
        <Modal className="max-w-3xl h-[535px] rounded-[20px] border-gray border flex flex-col gap-[14px] px-11 py-12" isOpen={true} onClose={onClose} >
               <div className="w-full flex gap-[21px] flex-col">    
                    <div className="flex gap-[20px]">
                        <h2 className="font-semibold text-lg text-black">대여 희망 날짜</h2>
                        <p className="text-black text-xs">{getDashedFormattedDate(date)}</p>
                    </div>
                    <div className="flex gap-[60px]">
                        
                        <h2 className="font-semibold text-lg text-black">사용목적</h2>
                    </div>
                </div>
                <div className="w-full flex justify-end gap-3 text-base">
                    <button onClick={() => onClose?.()} className="px-[22px] py-[10px] border-black border bg-[#F9F9F9] text-black rounded-[100px]">취소</button>
                    <button onClick={() => onConfirm?.()} className="px-[22px] py-[10px] bg-black text-white rounded-[100px]">신청하기</button>
                </div>
        </Modal>
    );
};