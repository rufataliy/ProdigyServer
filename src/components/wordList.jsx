import React, { useEffect, useContext } from "react"
import { Icon, List } from "antd"
import Context from "../store/context"



const WordList = (props) => {
    const { vocabState } = useContext(Context)
    useEffect(() => {

    }, [vocabState.allWords])
    return (

        <div>
            {console.log("wordlist")}
            < List
                itemLayout="vertical"
                size="middle"
                grid={{ gutter: 10, column: 3 }
                }
                locale={props.emptyText}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 6,
                }}
                dataSource={props.data}

                renderItem={(word) => (
                    <List.Item
                        key={word.phrase}
                        actions={[
                            <Icon style={{ fontSize: 1.5 + 'em' }, { margin: 5 + "px" }} type="edit" onClick={() => props.edit(word)} />,
                            <Icon style={{ fontSize: 1.5 + 'em' }, { margin: 5 + "px" }} type="delete" onClick={() => props.delete(word)} />
                        ]}
                    >
                        <List.Item.Meta
                            title={word.phrase}
                            description={word.definition}
                        />
                        {word.example}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default WordList