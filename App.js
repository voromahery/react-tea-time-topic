import React, { useEffect, useState } from 'react';

export default function App() {
    const [topics, setTopics] = useState([]);

    const fetching = async () => {
        const response = await fetch("https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json");
        const data = await response.json();
        console.log(data);
        setTopics(data);
    }

    useEffect(() => {
        fetching();
    }, [])

    return (
        <>
            {topics.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)).filter(topic => topic.discussedOn === "").map(topic => (
                <div key={topic.id} className="card">
                    <p>{topic.title}</p>
                    <div>
                        <button>vote</button>
                        <span> {topic.upvotes} </span>
                        <button>Downvote</button>
                        <span> {topic.downvotes} </span>
                    </div>
                </div>
            ))}
        </>
    )
}