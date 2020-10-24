import React from 'react';

export default function PastTopics(props) {
    return (
        <article key={props.topic.id}>
            <button className="delete" id={props.topic.id} value={props.topic.id} onClick={props.deleteHandleClick}>
                {props.trashbin}
            </button>
            <h5 className="topic-text">{props.topic.title}</h5>
            <p>Discussed on {props.topic.discussedOn}</p>
        </article>
    )
}