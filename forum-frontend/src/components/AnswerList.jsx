import AnswerCard from "./AnswerCard.jsx";

const AnswerList = ({ answers, currentUser, question, onUpdate, onDelete, onAccept, onVoteChanged }) => {
    if(!answers || answers.length === 0){
        return <p>No answers yet.</p>;
    }

    const sortedAnswer = [...answers].sort((a,b)=>{
        if(a.accepted && !b.accepted) return -1;
        if(!a.accepted && b.accepted) return 1;
        return 0;
    });

    return(
        <div style={{marginTop: "1rem"}}>
            {sortedAnswer.map((answer) => (
                <AnswerCard
                    key={answer.id}
                    answer={answer}
                    currentUser={currentUser}
                    question={question}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onAccept={onAccept}
                    onVoteChanged={onVoteChanged}
                />
            ))}
        </div>
    );
};

export default AnswerList;