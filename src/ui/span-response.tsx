export default function ButtonResponse({code} : {code: number | undefined}) {
    return(
        <div className="bg-green-700 py-0.5 px-2 rounded-sm text-green-200 text-[10px]">
            <div className="flex items-center justify-center">
                <div>
                    <span className="text-white">{code}</span>
                </div>
            </div>
        </div>
    )
}