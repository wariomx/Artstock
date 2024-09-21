import createToken from "../../../../utils/createToken.jsx"


export default function MintToken() {

    const handleCreateToken = async () => {
        createToken()
    }

    return (
        <button onClick={handleCreateToken} className="text-white">
            mint
        </button>
    )
}