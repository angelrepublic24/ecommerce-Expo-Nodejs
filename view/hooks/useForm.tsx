import React, { useState } from "react"

export const useForm = (objInit: Object) => {
    const [form, setForm] = useState(objInit);

    const changed = (text, input) => {
        setForm({...form, [input]: text})
    }
    return {
        form,
        changed,
    }
}
