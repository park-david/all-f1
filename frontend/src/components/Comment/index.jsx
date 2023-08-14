import { useState } from "react"
import { updateComment, deleteComment } from "../../../utils/backend"
import { Button, Form, Comment as SUIComment, Card } from 'semantic-ui-react'

export default function Comment({ data, refreshComments }) {
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        name: data.name,
        content: data.content
    })

    const [commentTimestamp, setCommentTimestamp] = useState(data.createdAt)

    function handleInputChange(event) {
        setEditFormData({
            ...editFormData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        setShowEditForm(false)
        updateComment(editFormData, data._id)
            .then(() => refreshComments())
    }

    function handleDelete() {
        deleteComment(data._id)
            .then(() => refreshComments())
    }

    return (
        <Card centered>
            <SUIComment>
                <SUIComment.Content>
                    {showEditForm ? (
                        <Form onSubmit={handleSubmit}>
                            <Form.Input
                                name="name"
                                placeholder="Your name"
                                value={editFormData.name}
                                onChange={handleInputChange}
                            />
                            <br />
                            <Form.TextArea
                                name="content"
                                placeholder="Share your thoughts!"
                                value={editFormData.content}
                                onChange={handleInputChange}
                            />
                            <div>
                                <Button onClick={() => setShowEditForm(false)}>
                                    Close
                                </Button>
                                <Button type="submit">
                                    Post
                                </Button>
                            </div>
                        </Form>
                    ) : (
                        <>
                            <SUIComment.Author as='a'>{data.name}</SUIComment.Author>
                            <SUIComment.Text>{data.content}</SUIComment.Text>
                            <SUIComment.Metadata>
                                <div>{new Date(commentTimestamp).toLocaleString()}</div>
                            </SUIComment.Metadata>
                            <SUIComment.Actions>
                                <Button onClick={() => setShowEditForm(true)}>
                                    Edit
                                </Button>
                                <Button onClick={handleDelete}>
                                    Delete
                                </Button>
                            </SUIComment.Actions>
                        </>
                    )}
                </SUIComment.Content>
            </SUIComment>
        </Card>
    )
}
