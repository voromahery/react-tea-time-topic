import React from 'react';

export default function NewTopics(props) {
    return (
        <article>
            <button className="archive" id={props.topic.id} value={props.topic.id} onClick={props.archiveTopic}>
                Archive
            </button>
            <h5 className="topic-text">{props.topic.title}</h5>
            <div className="votes">
                <button className="upvote" id={props.topic.id} value={props.topic.id} onClick={props.increment}>
                    Vote
                </button>
                <span className="upvote-number">{props.topic.upvotes}</span>
                <button className="downvote" id={props.topic.id} value={props.topic.id} onClick={props.decrement}>
                    Unvote
                </button>
                <span className="downvote-number">{props.topic.downvotes}</span>
            </div>
        </article>
    )
}