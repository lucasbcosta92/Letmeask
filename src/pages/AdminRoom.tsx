import { FormEvent, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
// Imgs
import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
// Components
import { Button } from "./../components/Button";
import { RoomCode } from "./../components/RoomCode";
// Styles
import "../styles/room.scss";
// Context/Hooks
import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";
// Firebase
import { database } from "../services/firebase";
import { Question } from "../components/Question";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  const [newQuestion, setNewQuestion] = useState("");

  // Enviando pergunta / Salvando no firebase
  async function handleSendQuestion(e: FormEvent) {
    e.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You most be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    // Salvando a pergunta no firebase
    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
  }

  // Remoção da questão
  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  // Encerrando sala
  async function handleEnRoom(){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    history.push('/')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEnRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => (
            <Question
              content={question.content}
              author={question.author}
              key={question.id}
            >
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
