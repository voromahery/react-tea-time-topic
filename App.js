import React, { useEffect, useState } from 'react';
import {upVote, downVote, trashbin} from './Icon.js';



export default function App() {
    const [topics, setTopics] = useState([]);
    const [vote, setVote] = useState(topics.upvotes);

    const fetching = async () => {
        const response = await fetch("https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json");
        const data = await response.json();
        setTopics(data);
    }


    const increment = (id) => {
        console.log("ID", id);
        // const data = e.target;
        let findTopics = topics.find(topic => topic.id === id);
        if (findTopics) {
            setVote(++findTopics.upvotes);
        }
        console.log("dd", findTopics, topics);
    }

    useEffect(() => {
        fetching();
    }, [])

    return (
        <>
            <div>
                <h3>New topics</h3>
                {topics.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)).filter(topic => topic.discussedOn === "").map(topic => (
                    <article key={topic.id}>
                        <button className="archive" id={topic.id}>
                            {trashbin}
                        </button>
                        <h5 className="topic-text">{topic.title}</h5>
                        <div className="votes">
                            <button className="upvote" id="${topic.id}">
                                {upVote}
                            </button>
                            <span className="upvote-number">{topic.upvotes}</span>
                            <button className="downvote" id="{topic.id}">
                                {downVote}
                            </button>
                            <span className="downvote-number">{topic.downvotes}</span>
                        </div>
                    </article>
                ))}
            </div>
            <div>
                <h3>Past Topics</h3>
                {topics.filter(topic => topic.discussedOn !== "").map(topic => (
                    <article key={topic.id}>
                        <button className="delete" id={topic.id}>
                            {trashbin}
                        </button>
                        <h5 className="topic-text">{topic.title}</h5>
                        <p>Discussed on {topic.discussedOn}</p>
                    </article>
                ))}
            </div>
        </>
    )
}