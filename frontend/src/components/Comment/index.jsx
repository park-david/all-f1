import { useState } from "react"
import { updateComment, deleteComment } from "../../../utils/backend"
import { Button, Form, TextArea, Comment as SUIComment } from 'semantic-ui-react'

export default function Comment({ data, refreshComments }) {
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        name: data.name,
        content: data.content
    })

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
        <SUIComment>
            <SUIComment.Avatar src={data.avatarUrl} />
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
    )
}
