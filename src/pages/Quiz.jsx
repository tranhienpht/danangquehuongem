import React from 'react';
import QuizComponent from '../components/QuizComponent';
import { quizQuestions } from '../data/quizData';
import './Quiz.css';

const Quiz = () => {
    return (
        <div className="quiz-page">
            <header className="page-header quiz-header">
                <h1>Góc Học Tập & Vui Chơi</h1>
                <p>Thử tài kiến thức của em về Đà Nẵng nào!</p>
            </header>

            <section className="section-container">
                <QuizComponent questions={quizQuestions} />
            </section>
        </div>
    );
};

export default Quiz;
