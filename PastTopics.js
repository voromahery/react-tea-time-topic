import React from 'react';

export default function PastTopics(props) {
    const discussedOnDate = new Date(Number(props.topic.discussedOn))
    console.log(discussedOnDate);
    return (
        <article key={props.topic.id}>
            <button className="delete" id={props.topic.id} onClick={props.deleteHandleClick}>
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    id={props.topic.id}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    ></path>
                </svg>
            </button>
            <h5 className="topic-text">{props.topic.title}</h5>
            <p>Discussed on {discussedOnDate.toLocaleDateString()}</p>
        </article>
    )
}