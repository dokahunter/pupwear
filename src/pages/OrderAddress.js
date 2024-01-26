import { useState } from "react"
import AddressInput from "../components/AddressInput/AddressInput"

export default function OrderAddress() {
    const [] = useState()

    return (
        <>
            <h2>Kérjük add meg a címedet:</h2>
            <div>
                <p>Szállítási cím:</p>
                <AddressInput />
            </div>
        </>
    )
}