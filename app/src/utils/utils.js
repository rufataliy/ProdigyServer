import { useContext } from "react"
import { FORM_CONFIG } from "../store/useGlobalState"
import Context from "../store/context"
export const toggleModal = () => {

};

export const setAction = ({ config, initialValues, actionNames }) => {
    const { actions, modalState } = useContext(Context)
    const ops = {
        setFormConfig: () => actions({
            type: "setFormConfig",
            payload: {
                config
            }
        }),
        setInitialState: () => actions({
            type: "setInitialValues",
            payload: {
                initialValues
            }
        }),
        toggleModal: () => actions({
            type: "setModalState",
            payload: {...modalState, modalVisibility: !modalState.modalVisibility }
        })
    }
    return actionNames.map(name => ops[name]())

}