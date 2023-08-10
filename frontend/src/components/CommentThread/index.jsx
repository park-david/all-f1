import { useState, useEffect } from "react"
import { postComment, getComments } from "../../../utils/backend"
import Comment from "../Comment"

export default function CommentThread({ circuitId }) {
    const [comments, setComments] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        name: '',
        content: ''
    })
    useEffect(() => {
        getComments(circuitId)
            .then(comments => setComments(comments))
    }, [])

    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        })
    }

    function toggleCreateForm() {
        setShowCreateForm(!showCreateForm)
    }

    function refreshComments() {
        getComments(circuitId)
            .then(newCommentData => setComments(newCommentData))
    }

    function handleSubmit(event) {
        event.preventDefault()
        setCreateFormData({
            name: '',
            content: ''
        })
        setShowCreateForm(false)
        postComment({ ...createFormData, circuitId: circuitId })
            .then(() => refreshComments())
    }

    let commentElements = [<p key='0'></p>]
    if (comments.length > 0) {
        commentElements = comments.map(comment => {
            return <Comment
                key={comment._id}
                data={comment}
                refreshComments={refreshComments}
            />
        })
    }

    let btnText = 'Create'
    if (showCreateForm) {
        btnText = 'Close'
    }
    // console.log(comments)
    return (
        <div className="comments">
            <h1>Comments</h1>
            <button onClick={toggleCreateForm}>{btnText}</button>
            {
                showCreateForm && <form
                    onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Name"
                        value={createFormData.name}
                        onChange={handleInputChange}
                    />
                    <br />
                    <textarea
                        name="content"
                        placeholder="Comment"
                        value={createFormData.content}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Post</button>
                </form>
            }
            {commentElements}
        </div>
    )
}
