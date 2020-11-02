import React, { useEffect, useState } from 'react';
import { upVote, downVote, trashbin } from './Icon.js';
import NewTopics from './NewTopics.js';
import PastTopics from './PastTopics.js';


export default function App() {
    const [topics, setTopics] = useState([]);
    const [vote, setVote] = useState(0);
    const [unvote, setUnvote] = useState(0);

    /////////////////////////// FETCHING //////////////////////////////////////////////////////    
    const fetching = async () => {
        const response = await fetch("https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json");
        const data = await response.json();
        setTopics(data);
    }

    //////////////////////// VOTING ///////////////////////////////////////////////////////
    const increment = (e) => {
        const id = e.target.id;
        const findTopics = topics.find(topic => topic.id == id);
        if (findTopics) {
            setVote(findTopics.upvotes++);
        }
    }

    const decrement = (e) => {
        const id = e.target.id;
        const findTopics = topics.find(topic => topic.id == id);
        if (findTopics) {
            setUnvote(findTopics.downvotes++);
        }
    }

    useEffect(() => {
        fetching();
    }, [])

    /////////////////////// ARCHIVE //////////////////////////////////////////////////

    const archiveTopic = (e) => {
        const id = e.target.id;
        const topicToArchive = topics.find(topic => topic.id == id);
        topicToArchive.discussedOn = Date.now();
        console.log(id, topicToArchive.discussedOn);
        setTopics([...topics])
    }
    ////////////////////////// DELETE //////////////////////////////

    const deleteHandleClick = (e) => {
        const id = e.target.id;
        console.log("ID", id);
        const filterTopics = topics.filter(topic => topic.id != id);
        setTopics(filterTopics);
    }

    ////////////////////////////// ADD A NEW TOPIC /////////////////////////////////////
    const AddNew = (e) => {
        e.preventDefault();
        const form = e.target;
        console.log(form);
        const createNewTopic = form.topic.value;

        let topic = {
            id: Date.now(),
            upvotes: 0,
            title: createNewTopic,
            downvotes: 0,
            discussedOn: "",
        }

        form.reset();

        console.log(topic, createNewTopic);
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
                    {topics.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)).filter(topic => topic.discussedOn === "").map(topic => (
                        <NewTopics
                            topic={topic}
                            key={topic.id}
                            vote={vote}
                            unvote={unvote}
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
                        <PastTopics
                            topic={topic}
                            key={topic.id}
                            trashbin={trashbin}
                            deleteHandleClick={deleteHandleClick}
                        />
                    ))}
                </div>
            </main>
        </>
    )
}