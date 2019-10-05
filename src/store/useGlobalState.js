import { useState } from "react";

const useGlobalState = () => {
    const globalState = {
        modalVisibility: false,
        calendarWeekends: true,
        calendarArgs: {},
        events: null
    }
    const [state, setState] = useState(globalState)

    const actions = (action) => {
        const { type, payload } = action
        switch (type) {
            case "setState":
                return setState(payload)
            default:
                return state;
        }
    }

    return { state, actions }
}

export default useGlobalState