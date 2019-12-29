import React, { useContext, useEffect } from "react"
import { Collapse, Button, Icon, List, Tabs } from "antd"
import { newClassForm } from "./_newClassTmp.jsx"
import Context from "../store/context"
import { MODAL, VOCAB, WORDS, TOPICS, FORM_CONFIG, INITIAL_VALUES, COMP_UPDATE } from "../store/useGlobalState"
import ModalComp from "./Modal.jsx"
import { FormikForm } from "./form.jsx"

const { TabPane } = Tabs;
const { Panel } = Collapse


const Vocabulary = () => {
    const { modalState,
        initialValues,
        formConfig,
        vocabState,
        compUpdate,
        actions } = useContext(Context)

    useEffect(() => {
        getVocabs()
    }, [compUpdate]
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
    const getTopicWords = async (key, operator, searchedValue) => {
        const props = {
            collectionName: "words",
            method: "getWhere",
            key: key,
            operator: operator,
            searchedValue: searchedValue
        }
        console.log(props);

        const allWords = await newClassForm.dbPath(props)();
        actions({
            type: VOCAB,
            payload: { ...vocabState, allWords: allWords }
        })
    }
    const onChange = (id) => {
        const vocab = vocabState.vocabs.filter(vocab => {
            return vocab.id == id
        })
        console.log(vocab);

        getTopicWords("topic", "==", vocab[0].topic)
    }
    const handleClick = () => {
        actions({
            type: FORM_CONFIG,
            payload: {
                ...formConfig,
                collectionName: "vocabularies",
                formType: "newVocabulary",
                method: "add"
            }
        })
        toggleModal()

    }
    const handleEditVocab = (vocab) => {
        console.log("edit");
        const { name, topic, level, id } = vocab
        actions({
            type: FORM_CONFIG,
            payload: {
                ...formConfig,
                collectionName: "vocabularies",
                formType: "newVocabulary",
                method: "update",
                docId: id
            }
        })
        actions({
            type: INITIAL_VALUES,
            payload: {
                ...initialValues,
                newVocabulary: {
                    name: name,
                    topic: topic,
                    level: level
                }
            }
        })
        toggleModal()
    }
    const handleDelete = (vocabId) => {
        const props = {
            collectionName: "vocabularies",
            method: "delete",
            docId: vocabId
        }
        newClassForm.dbPath(props)().then(() => {
            actions({
                type: COMP_UPDATE,
                payload: {
                    compUpdate: !compUpdate
                }
            })
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
    const addWordBtn = (vocab) => (

        <div>
            <Icon style={{ fontSize: 1.5 + 'em' }} type="delete" onClick={(event) => {
                console.log(formConfig);
                event.stopPropagation()
                handleDelete(vocab.id)
            }} />
            <Icon style={{ fontSize: 1.5 + 'em' }, { margin: 5 + "px" }} type="edit" onClick={(event) => {
                event.stopPropagation()
                console.log(vocabState.vocabs);

                handleEditVocab(vocab)
            }} />
            <Icon style={{ fontSize: 1.5 + 'em' }} type="plus-circle" onClick={(event) => {
                event.stopPropagation()
                actions({
                    type: FORM_CONFIG,
                    payload: {
                        ...formConfig,
                        collectionName: "words",
                        formType: "newWord",
                        method: "add"
                    }
                })
                actions({
                    type: INITIAL_VALUES,
                    payload: {
                        ...initialValues, newWord: {
                            ...initialValues.newWord,
                            topic: vocab.topic
                        }
                    }
                })
                toggleModal()
            }} />
        </div>
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
            {console.log("vocab rendered")}
            <Button onClick={handleClick} >New</Button>
            {modalState.modalVisibility && renderModal()}
            <Tabs onChange={handleTabChange} defaultActiveKey="1" tabPosition="left" style={{ height: 220 }}>
                <TabPane tab="Topics" key={TOPICS}>
                    <Collapse onChange={onChange} accordion>
                        {console.log(vocabState.vocabs)}
                        {vocabState.vocabs.map(vocab => {
                            return (
                                <Panel header={vocab.name} key={vocab.id} extra={addWordBtn(vocab)}>
                                    {vocabState.allWords.map(word => {
                                        return (
                                            <p>{word.word}</p>
                                        )
                                    })}
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