import { useState } from "react";
import {styles} from "../styles/forumTheme.js";

const AnswerForm = ({ onSubmit, initialData = null, onCancel = null}) => {
    const [text, setText] = useState(initialData?.text || "");
    const [picture, setPicture] = useState(initialData?.picture || "");

    const handleSubmit= (e) => {
        e.preventDefault();

        if(!text.trim()){
            alert("text is required.");
            return;
        }

        onSubmit({text, picture});

        if(!initialData){
            setText("");
            setPicture("");
        }
    };

    return (<form onSubmit={handleSubmit}
                  style={{
                        ...styles.innerCard,
                        marginTop: "1rem",
                        marginBottom: "1rem"
                  }}
            >
                <textarea placeholder="Write your answer..."
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          rows="4"
                          style={{
                              ...styles.textarea,
                              marginBottom: "1rem"
                          }}
                />
                <input
                    type="text"
                    placeholder="Image URL (optional)"
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                    style={{
                        ...styles.input,
                        marginBottom: "1rem"
                    }}
                />
                <div style={{ display: "flex", gap: "10px"}}>
                    <button type="submit"
                            style={styles.primaryButton}
                    >
                        {initialData ? "Update Answer" : "Post Answer"}
                    </button>

                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            style={styles.secondaryButton}
                        >Cancel</button>
                    )}
                </div>
            </form>
    );
};

export default AnswerForm;