export default function ButtonResponse({ code }: { code: number | undefined }) {

    if (code) {
        if (code >= 200 && code <= 300) {
            return (
                <div className="bg-green-700 py-0.5 px-2 rounded-sm text-green-200 text-[10px]">
                    <div className="flex items-center justify-center">
                        <div>
                            <span className="text-white">{code}</span>
                        </div>
                    </div>
                </div>
            )

        }


        if (code > 300) {
            return (
                <div className="bg-red-500 py-0.5 px-2 rounded-sm text-red-200 text-[10px]">
                    <div className="flex items-center justify-center">
                        <div>
                            <span className="text-white">{code}</span>
                        </div>
                    </div>
                </div>
            )
        }

    }


    return <div>Nada</div>

}