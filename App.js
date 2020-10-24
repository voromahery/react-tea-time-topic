import React, { useEffect, useState } from 'react';
import { upVote, downVote, trashbin } from './Icon.js';
import NewTopics from './NewTopics.js';
import PastTopics from './PastTopics.js';

export default function App() {
    const [topics, setTopics] = useState([]);
    const [vote, setVote] = useState(0);
    const [unvote, setUnvote] = useState(0);
    const fetching = async () => {
        const response = await fetch("https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json");
        const data = await response.json();
        setTopics(data);
    }


    const increment = (e) => {
        const id = e.target.value;
        console.log("ID", id);
        const findTopics = topics.find(topic => topic.id === id);
        if (findTopics) {
            setVote(findTopics.upvotes++);
        }
    }

    const decrement = (e) => {
        const id = e.target.value;
        console.log("ID", id);
        const findTopics = topics.find(topic => topic.id === id);
        if (findTopics) {
            setUnvote(findTopics.downvotes++);
        }
    }

    useEffect(() => {
        fetching();
    }, [])

    const archiveTopic = (id) => {
        console.log(id);
        const topicToArchive = topics.find(topic => topic.id === id);
        // topicToArchive.discussedOn = new Date();
        // setDate(topicToArchive);
        console.log(topicToArchive);
    }

    ////////////////////////////// ADD A NEW TOPIC /////////////////////////////////////
    const AddNew = (e) => {
        e.preventDefault();
        const form = e.target;
        console.log(form);
        const createNewTopic = form.topic.value;

        let topic = {
            upvotes: 0,
            downvotes: 0,
            disussedOn: "",
            title: createNewTopic,
            id: Date.now(),
        }

        topics.push(topic);
        // console.log(newData, createNewTopic);
        setTopics([...topics, topic]);
    }

    return (
        <>
            <h1>Tea Time Topic</h1>
            <main>
                <section>
                    <header><h4>Add a topic</h4></header>
                    <article>
                        <form className="add-topic" onSubmit={AddNew}>
                            <input
                                required
                                type="text"
                                name="topic"
                                placeholder="Type your topic idea here"
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </article>
                </section>
                <div>
                    <h3>New topics</h3>
                    {topics.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)).filter(topic => topic.discussedOn == "").map(topic => (
                        <NewTopics
                            topic={topic}
                            key={topic.id}
                            vote={vote}
                            trashbin={trashbin}
                            upVote={upVote}
                            downVote={downVote}
                            increment={increment}
                            decrement={decrement}
                            archiveTopic={archiveTopic}
                        />
                    ))}
                </div>
                <div>
                    <h3>Past Topics</h3>
                    {topics.filter(topic => topic.discussedOn !== "").map(topic => (
                        <PastTopics topic={topic} key={topic.id} trashbin={trashbin} />
                    ))}
                </div>
            </main>
        </>
    )
}