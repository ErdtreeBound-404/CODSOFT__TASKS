import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { Certificate } from './Certificate';
import { 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  ShieldCheck, 
  HelpCircle,
  BarChart3,
  BookmarkCheck
} from 'lucide-react';

interface FinalQuizProps {
  questions: QuizQuestion[];
  onCompleteQuiz: (score: number) => void;
  savedScore: number | null;
}

export const FinalQuiz: React.FC<FinalQuizProps> = ({
  questions,
  onCompleteQuiz,
  savedScore
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(savedScore !== null);
  const [showReview, setShowReview] = useState<boolean>(false);

  // Certificate metadata
  const [recipientName, setRecipientName] = useState<string>('Alex Johnson');
  const [organization, setOrganization] = useState<string>('Information Security Directorate');

  const currentQ = questions[currentIdx];
  const totalQuestions = questions.length;
  const passingScore = 12; // 80% of 15 questions

  const handleSelectOption = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: optionIdx
    });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleSubmitQuiz = () => {
    const finalScore = calculateScore();
    setIsSubmitted(true);
    onCompleteQuiz(finalScore);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setShowReview(false);
  };

  const score = isSubmitted ? (savedScore !== null ? savedScore : calculateScore()) : 0;
  const percentage = Math.round((score / totalQuestions) * 100);
  const hasPassed = score >= passingScore;

  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === totalQuestions;

  // View Certificate directly if submitted and passed
  if (isSubmitted && hasPassed && !showReview) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between no-print">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Official Certification Award</h2>
            <p className="text-sm text-slate-600">Congratulations! You passed with {score}/{totalQuestions} ({percentage}%).</p>
          </div>
          <button
            onClick={() => setShowReview(true)}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
          >
            Review Question Explanations
          </button>
        </div>

        <Certificate
          recipientName={recipientName}
          setRecipientName={setRecipientName}
          organization={organization}
          setOrganization={setOrganization}
          score={score}
          totalQuestions={totalQuestions}
          completionDate={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          onRetakeQuiz={handleRetake}
        />
      </div>
    );
  }

  // Score Summary / Review Screen if not passed or viewing review
  if (isSubmitted && (!hasPassed || showReview)) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Score Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center font-black text-2xl border-4 ${
            hasPassed ? 'bg-emerald-100 text-emerald-700 border-emerald-500' : 'bg-rose-100 text-rose-700 border-rose-500'
          }">
            {hasPassed ? '✓' : '✗'}
          </div>

          <h2 className="text-2xl font-black text-slate-900">
            {hasPassed ? 'Assessment Passed!' : 'Assessment Incomplete - Retake Needed'}
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-lg mx-auto">
            You scored <strong className="text-slate-900">{score} out of {totalQuestions}</strong> ({percentage}%).
            {hasPassed 
              ? ' You demonstrated mastery across phishing identification, authentication defense, and incident response.'
              : ` A score of ${passingScore}/${totalQuestions} (80%) is required to earn the Certificate of Phishing Defense.`
            }
          </p>

          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={handleRetake}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retake Assessment
            </button>
            {hasPassed && (
              <button
                onClick={() => setShowReview(false)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                View & Print Certificate
              </button>
            )}
          </div>
        </div>

        {/* Question-by-Question Review with Explanations */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-blue-600" />
            Detailed Question Explanations & Audit
          </h3>

          {questions.map((q, idx) => {
            const userAns = selectedAnswers[q.id];
            const isCorrect = userAns === q.correctIndex;

            return (
              <div 
                key={q.id}
                className={`p-6 rounded-2xl border transition-all ${
                  isCorrect ? 'bg-white border-emerald-200' : 'bg-white border-rose-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Question {idx + 1} of {totalQuestions} • {q.category}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 mb-4">
                  {q.question}
                </h4>

                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isRightOption = optIdx === q.correctIndex;
                    const isUserChoice = optIdx === userAns;

                    let badgeClass = 'border-slate-200 text-slate-700 bg-slate-50';
                    if (isRightOption) {
                      badgeClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                    } else if (isUserChoice && !isRightOption) {
                      badgeClass = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                    }

                    return (
                      <div key={optIdx} className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between ${badgeClass}`}>
                        <span>{opt}</span>
                        {isRightOption && <span className="text-emerald-700 font-bold text-xs">Correct Answer</span>}
                        {isUserChoice && !isRightOption && <span className="text-rose-700 font-bold text-xs">Your Choice</span>}
                      </div>
                    );
                  })}
                </div>

                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-slate-700">
                  <strong className="text-blue-900 font-semibold">Forensic Explanation: </strong>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Active Quiz View
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Quiz Header & Progress Tracker */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 mb-8 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-blue-600 rounded-lg text-white">
                <Award className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-300">
                Comprehensive Certification Exam
              </span>
            </div>
            <h2 className="text-2xl font-black">Phishing Awareness Final Exam</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              15 comprehensive scenario & concept questions. Score 80% (12/15) to receive your verified completion certificate.
            </p>
          </div>

          <div className="text-right sm:text-right bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <div className="text-xs text-slate-400">Answered</div>
            <div className="text-xl font-black text-blue-400">
              {answeredCount} / {totalQuestions}
            </div>
          </div>
        </div>

        {/* Question Pager Dots */}
        <div className="grid grid-cols-5 sm:grid-cols-15 gap-1.5 mt-6">
          {questions.map((q, idx) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isCurrent = idx === currentIdx;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  isCurrent
                    ? 'bg-blue-600 border-blue-400 text-white ring-2 ring-blue-400/60'
                    : isAnswered
                    ? 'bg-blue-950/80 border-blue-600 text-blue-300'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-2 border-b border-slate-100">
          <span className="font-bold uppercase tracking-wider text-blue-600">
            Question {currentIdx + 1} of {totalQuestions}
          </span>
          <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
            {currentQ.category}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-6 leading-snug">
          {currentQ.question}
        </h3>

        <div className="space-y-3 mb-8">
          {currentQ.options.map((option, optIdx) => {
            const isSelected = selectedAnswers[currentQ.id] === optIdx;

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-blue-50 border-blue-600 text-blue-950 font-semibold shadow-sm ring-1 ring-blue-600'
                    : 'bg-slate-50/60 hover:bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="leading-relaxed">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation / Action Toolbar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          {currentIdx < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentIdx(currentIdx + 1)}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              disabled={!isAllAnswered}
              onClick={handleSubmitQuiz}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-black transition flex items-center gap-2 shadow-md"
            >
              <Award className="w-4 h-4" />
              <span>Submit & View Results</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
