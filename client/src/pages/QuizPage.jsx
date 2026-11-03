import React, { useState, useEffect } from 'react';
import { quizAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import QuizTimerComponent from '../components/class/QuizTimerComponent';
import RetroButton from '../components/common/RetroButton';
import RetroCard from '../components/common/RetroCard';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Send
} from 'lucide-react';

export const QuizPage = ({ setCurrentView }) => {
  const { user, refreshUser } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const res = await quizAPI.getAll();
        setQuizzes(res.data.data);
        if (res.data.data.length > 0) {
          // Load full quiz details for the first assessment
          const fullQuizRes = await quizAPI.getById(res.data.data[0]._id);
          setActiveQuiz(fullQuizRes.data.data);
          setStartTime(Date.now());
        }
      } catch (err) {
        console.error('Error fetching quiz:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleSelectOption = (questionIndex, optionIndex) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleSubmitQuiz = async () => {
    if (quizSubmitted || submitting || !activeQuiz) return;

    setSubmitting(true);
    const timeTaken = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;

    try {
      const res = await quizAPI.submit(activeQuiz._id, {
        answers: selectedAnswers,
        timeTakenSeconds: timeTaken
      });

      setResult(res.data.result);
      setQuizSubmitted(true);

      // Trigger celebratory confetti if score is >= 70%
      if (res.data.result.percentage >= 70) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      // Refresh user context so profile updates with new score immediately
      if (refreshUser) refreshUser();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit assessment.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setResult(null);
    setCurrentQuestionIndex(0);
    setStartTime(Date.now());
  };

  if (loading) {
    return (
      <div className="text-center py-20 font-mono">
        <div className="animate-spin w-8 h-8 border-4 border-cyber-yellow border-t-transparent mx-auto mb-3"></div>
        <p className="text-xs uppercase text-slate-500">Initializing Assessment Chamber...</p>
      </div>
    );
  }

  if (!activeQuiz) {
    return (
      <div className="text-center py-16 font-mono border-2 border-dashed border-black dark:border-slate-800">
        <p>No assessment modules available at the moment.</p>
      </div>
    );
  }

  const questions = activeQuiz.questions || [];
  const currentQ = questions[currentQuestionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      
      {/* Top Banner & Timer Header */}
      <div className="border-4 border-black dark:border-cyber-yellow bg-white dark:bg-cyber-darkSurface p-6 shadow-retro-lg dark:shadow-retro-yellow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-2 py-0.5 bg-black text-cyber-yellow font-mono text-[10px] font-black uppercase tracking-widest border border-black inline-block mb-1">
              TECHNICAL ASSESSMENT // LIVE JAVASCRIPT TIMER
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl uppercase text-slate-900 dark:text-white">
              {activeQuiz.title}
            </h1>
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400 mt-1">
              Topic: {activeQuiz.topic} • Total Questions: {questions.length} • Passing Score: 70%
            </p>
          </div>

          {/* Embedded React Class Component: QuizTimerComponent */}
          {!quizSubmitted && (
            <div className="w-full md:w-64">
              <QuizTimerComponent
                initialSeconds={activeQuiz.timeLimitSeconds || 120}
                totalSeconds={activeQuiz.timeLimitSeconds || 120}
                onTimeUp={() => {
                  alert('⏳ TIME EXPIRED! Automatically grading and submitting your answers.');
                  handleSubmitQuiz();
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Quiz View or Results View */}
      {!quizSubmitted ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Question Navigator Drawer */}
          <div className="md:col-span-1 order-2 md:order-1">
            <RetroCard title="Question Map" badge={`${answeredCount}/${questions.length}`}>
              <div className="grid grid-cols-5 md:grid-cols-3 gap-2">
                {questions.map((_, index) => {
                  const isAnswered = selectedAnswers[index] !== undefined;
                  const isCurrent = currentQuestionIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`h-10 border-2 border-black font-mono font-bold text-xs transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-cyber-cyan text-black shadow-retro-sm scale-105'
                          : isAnswered
                          ? 'bg-cyber-green text-black'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Q{index + 1}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <RetroButton
                  variant="yellow"
                  size="md"
                  onClick={handleSubmitQuiz}
                  disabled={submitting}
                  icon={Send}
                  className="w-full"
                >
                  {submitting ? 'Submitting...' : 'Finish & Submit'}
                </RetroButton>
              </div>
            </RetroCard>
          </div>

          {/* Current Question Chamber */}
          <div className="md:col-span-3 order-1 md:order-2">
            <RetroCard
              title={`Question ${currentQuestionIndex + 1} of ${questions.length}`}
              badge={`Score weight: 1.0`}
              badgeColor="cyan"
            >
              {currentQ && (
                <div className="space-y-6">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white leading-snug">
                    {currentQ.questionText}
                  </h3>

                  {/* Multiple Choice Options */}
                  <div className="space-y-3 font-mono text-sm">
                    {currentQ.options.map((option, optIdx) => {
                      const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                          className={`p-3.5 border-2 border-black cursor-pointer transition-all duration-150 flex items-center justify-between ${
                            isSelected
                              ? 'bg-cyber-yellow text-black shadow-retro translate-x-1'
                              : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="w-6 h-6 rounded-full border border-black bg-white dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-black dark:text-white shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="font-medium text-slate-900 dark:text-slate-100">
                              {option}
                            </span>
                          </div>
                          {isSelected && (
                            <span className="text-[10px] font-black uppercase tracking-wider bg-black text-white px-2 py-0.5">
                              SELECTED
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                    <RetroButton
                      size="sm"
                      variant="outline"
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                    >
                      ← Previous
                    </RetroButton>

                    {currentQuestionIndex < questions.length - 1 ? (
                      <RetroButton
                        size="sm"
                        variant="cyan"
                        onClick={() =>
                          setCurrentQuestionIndex((prev) =>
                            Math.min(questions.length - 1, prev + 1)
                          )
                        }
                      >
                        Next →
                      </RetroButton>
                    ) : (
                      <RetroButton
                        size="sm"
                        variant="green"
                        onClick={handleSubmitQuiz}
                        disabled={submitting}
                      >
                        Complete Assessment
                      </RetroButton>
                    )}
                  </div>
                </div>
              )}
            </RetroCard>
          </div>

        </div>
      ) : (
        /* Quiz Results Breakdown View */
        result && (
          <div className="space-y-6">
            
            {/* Scorecard Hero */}
            <div className="border-4 border-black dark:border-cyber-green bg-white dark:bg-cyber-darkSurface p-8 shadow-retro-lg dark:shadow-retro-green text-center">
              <Sparkles className="w-12 h-12 text-cyber-yellow mx-auto mb-3" />
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-slate-900 dark:text-white">
                ASSESSMENT TELEMETRY RECORDED
              </h2>
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400 mt-1">
                Your score has been permanently stamped to your B.Tech profile in MongoDB.
              </p>

              <div className="flex justify-center items-center gap-6 my-6 font-mono">
                <div className="p-4 border-2 border-black bg-cyber-green text-black shadow-retro">
                  <span className="block text-[11px] font-bold uppercase">Final Score</span>
                  <span className="font-display font-black text-4xl">
                    {result.score} / {result.totalQuestions}
                  </span>
                </div>

                <div className="p-4 border-2 border-black bg-cyber-yellow text-black shadow-retro">
                  <span className="block text-[11px] font-bold uppercase">Percentage</span>
                  <span className="font-display font-black text-4xl">{result.percentage}%</span>
                </div>

                <div className="p-4 border-2 border-black bg-cyber-cyan text-black shadow-retro">
                  <span className="block text-[11px] font-bold uppercase">Elapsed Time</span>
                  <span className="font-display font-black text-4xl">{result.timeTakenSeconds}s</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <RetroButton size="md" variant="outline" icon={RotateCcw} onClick={handleRestartQuiz}>
                  Retake Assessment
                </RetroButton>
                <RetroButton
                  size="md"
                  variant="cyan"
                  icon={ArrowRight}
                  onClick={() => setCurrentView('dashboard')}
                >
                  Return to Dashboard
                </RetroButton>
              </div>
            </div>

            {/* Detailed Question Review */}
            <div className="border-2 border-black dark:border-slate-800 bg-white dark:bg-cyber-darkSurface p-6 shadow-retro">
              <h3 className="font-display font-black text-xl uppercase mb-4 text-slate-900 dark:text-white">
                Detailed Evaluation & Explanations:
              </h3>

              <div className="space-y-4 font-mono text-xs">
                {result.feedback &&
                  result.feedback.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 border-2 border-black ${
                        item.isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 border-l-8 border-l-emerald-500'
                          : 'bg-red-50 dark:bg-red-950/30 border-l-8 border-l-red-500'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          Q{idx + 1}: {item.questionText}
                        </h4>
                        {item.isCorrect ? (
                          <span className="flex items-center text-emerald-600 font-bold uppercase text-xs">
                            <CheckCircle className="w-4 h-4 mr-1" /> Correct
                          </span>
                        ) : (
                          <span className="flex items-center text-red-600 font-bold uppercase text-xs">
                            <XCircle className="w-4 h-4 mr-1" /> Incorrect
                          </span>
                        )}
                      </div>

                      <div className="mt-2 space-y-1">
                        <p>
                          <span className="text-slate-400">Your Selection: </span>
                          <strong className={item.isCorrect ? 'text-emerald-500' : 'text-red-500'}>
                            {item.selectedOption}
                          </strong>
                        </p>
                        {!item.isCorrect && (
                          <p>
                            <span className="text-slate-400">Correct Answer: </span>
                            <strong className="text-emerald-500">{item.correctOption}</strong>
                          </p>
                        )}
                        {item.explanation && (
                          <p className="pt-2 text-slate-600 dark:text-slate-400 italic border-t border-black/10 dark:border-white/10">
                            💡 {item.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        )
      )}

    </div>
  );
};

export default QuizPage;
