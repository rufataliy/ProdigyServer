import React, { useContext, useEffect } from "react"
import { Collapse, Button, Icon, List, Tabs } from "antd"
import { newClassForm } from "./_newClassTmp.jsx"
import Context from "../store/context"
import { MODAL, VOCAB, WORDS, TOPICS } from "../store/useGlobalState"
import ModalComp from "./Modal.jsx"
import { FormikForm } from "./form.jsx"

const { TabPane } = Tabs;
const { Panel } = Collapse


const Vocabulary = () => {
    const { modalState,
        initialValues,
        formConfig,
        vocabState,
        actions } = useContext(Context)

    console.log(Context);
    useEffect(() => {
        getVocabs()
    }, [vocabState.vocabUpdate]
    )
    const getVocabs = async () => {
        const props = {
            collectionName: "vocabularies",
            method: "get"
        }
        const vocabs = await newClassForm.dbPath(props)();
        actions({
            type: VOCAB,
            payload: { ...vocabState, vocabs: vocabs }
        })
    }
    const getAllWords = async () => {
        const props = {
            collectionName: "words",
            method: "get"
        }
        const allWords = await newClassForm.dbPath(props)();
        actions({
            type: VOCAB,
            payload: { ...vocabState, allWords: allWords }
        })
    }
    const onChange = (info) => {
        console.log("onchange");
        console.log(info);
    }
    const handleClick = () => {
        actions({
            type: "setFormConfig",
            payload: {
                ...formConfig,
                collectionName: "vocabularies",
                formType: "newVocabulary",
                method: "add"
            }
        })
        toggleModal()

    }
    const handleDelete = () => {
        newClassForm.dbPath({ ...formConfig, method: "delete" })().then(() => {
            actions({
                type: SCHEDULE,
                payload: {
                    ...scheduleState,
                    scheduleUpdate: !scheduleState.scheduleUpdate
                }
            })
            toggleModal()
        })
    }
    const toggleModal = () => {
        actions({
            type: MODAL,
            payload: { ...modalState, modalVisibility: !modalState.modalVisibility }
        })
    }
    const renderModal = () => {
        return (
            <ModalComp
                isVisible={modalState.modalVisibility}
                nonSubmit={toggleModal}
                onSubmit={toggleModal}
                title={formConfig.title}
            >
                <FormikForm
                    formType={formConfig.formType}
                    collectionName={formConfig.collectionName}
                    docId={formConfig.docId}
                    method={formConfig.method}
                    handleDelete={handleDelete}
                />
            </ModalComp>
        )
    }
    // const renderVocabs = vocabState.vocabs.forEach(vocab => {
    //     return (
    //         <Panel header="This is panel header 1" key={vocab.id}>
    //             <p>{console.log(vocab.name)}</p>
    //         </Panel>
    //     )
    // })
    const addWordBtn = () => (
        <Icon style={{ fontSize: 1.5 + 'em' }} type="plus-circle" onClick={(event) => {
            event.stopPropagation()
            actions({
                type: "setFormConfig",
                payload: {
                    ...formConfig,
                    collectionName: "vocabularies",
                    formType: "newWord",
                    method: "add"
                }
            })
            toggleModal()
            console.log("clicked")
        }} />
    )
    const handleTabChange = (activeKey) => {
        switch (activeKey) {
            case WORDS:
                console.log("words");
                break;
            case TOPICS:
                console.log("topics");
                break;
        }
    }
    return (
        <div>

            <Button onClick={handleClick} >New</Button>

            {console.log("vocab rendered")}
            {modalState.modalVisibility && renderModal()}
            <Tabs onChange={handleTabChange} defaultActiveKey="1" tabPosition="left" style={{ height: 220 }}>
                <TabPane tab="Topics" key={TOPICS}>
                    <Collapse onChange={onChange} accordion>
                        {vocabState.vocabs.map(vocab => {
                            return (
                                <Panel header={vocab.name} key={vocab.id} extra={addWordBtn()}>
                                    <p>{vocab.name}</p>
                                </Panel>
                            )
                        })}
                    </Collapse>
                </TabPane>
                <TabPane tab="All words" key={WORDS}>
                    Content of tab 2
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Vocabulary