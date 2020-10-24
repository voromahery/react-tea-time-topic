import React from 'react';

export default function PastTopics(props) {
    const discussedOnDate = new Date(Number(props.topic.discussedOn))
    console.log(discussedOnDate);
    return (
        <article key={props.topic.id}>
            <button className="delete" id={props.topic.id} value={props.topic.id} onClick={props.deleteHandleClick}>
                Delete
            </button>
            <h5 className="topic-text">{props.topic.title}</h5>
            <p>Discussed on {discussedOnDate.toLocaleDateString()}</p>
        </article>
    )
}