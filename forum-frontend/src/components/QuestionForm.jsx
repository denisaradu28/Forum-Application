import {useEffect, useState} from "react";
import { getAllTags } from "../services/tagService.js";
import {styles} from "../styles/forumTheme.js";

const QuestionForm =({onSubmit, initialData ={} }) =>
{
    const [title,setTitle] =useState(initialData.title || "");
    const [text,setText]= useState(initialData.text || "");
    const [picture,setPicture] =useState(initialData.picture || "");
    const [availableTags, setAvailableTags] = useState([]);
    const [tags,setTags] = useState(
        initialData.tags
            ? initialData.tags.map((tag) => tag.name).join(", ")
            : ""
    );

    useEffect(() => {
        loadTags();
    }, []);

    const loadTags =async() => {
        try {
            const data =await getAllTags();
            setAvailableTags(data);
        } catch (error) {
            console.error("Error loading tags", error);
        }
    };

    const handleAddExistingTag = (tagName) => {
        if (!tags.includes(tagName)) {
            if (tags === "") {
                setTags(tagName);
            } else {
                setTags(tags +", "+ tagName);
            }
        }
    };

    const handleSubmit =async(e) => {
        e.preventDefault();

        const tagList = tags
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag !== "")
            .map(tag => ({ name: tag }));

        const questionData = {
            title,
            text,
            picture,
            tags:tagList
        };

        try {
            await onSubmit(questionData);
        } catch (error) {
            console.error("Error saving question", error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label><br/>
                <input
                    style={styles.input}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label>Text</label><br/>
                <textarea
                    style={styles.textarea}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            <div>
                <label>Picture URL</label><br/>
                <input
                    style={styles.input}
                    type="text"
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                />
            </div>

            <div>
                <label>Tags (comma separated)</label><br/>
                <input
                    style={styles.input}
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </div>

            <div style={{marginTop: "0.5rem"}}>
                <p>Available tags:</p>
                {availableTags.map((tag)=> (
                    <button
                        type="button"
                        key={tag.id}
                        onClick={() =>handleAddExistingTag(tag.name)}
                        style={{...styles.secondaryButton,
                            marginRight: "0.5rem",
                            marginBottom: "0.5rem",
                            padding: "0.45rem 0.8rem"
                        }}
                    >
                        {tag.name}
                    </button>
                ))}
            </div>

            <button
                type="submit"
                style={styles.primaryButton}
            >Submit
            </button>
        </form>
    );
};

export default QuestionForm;