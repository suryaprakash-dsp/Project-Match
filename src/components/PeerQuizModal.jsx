import React, { useState } from 'react';
import { HelpCircle, CheckCircle, X, Award, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    category: 'Cloud & Containers',
    question: 'What is the primary difference between a Docker container and a virtual machine (VM)?',
    options: [
      'Containers share the host OS kernel and are lightweight; VMs run a full guest OS on a hypervisor.',
      'Containers require dedicated hardware pass-through, while VMs emulate only CPU instructions.',
      'VMs cannot communicate over virtual networks, while containers use TCP sockets exclusively.',
      'Docker containers only run Python and Node.js runtimes, while VMs run any OS.'
    ],
    answerIndex: 0,
    explanation: 'Containers share the host operating system kernel, making them significantly faster and lighter than full virtual machines.'
  },
  {
    id: 2,
    category: 'CI/CD Pipelines',
    question: 'In GitHub Actions, which keyword triggers a workflow whenever code is merged into the default branch?',
    options: [
      'on: push: branches: [main]',
      'trigger: webhook: branch(master)',
      'listen: event.merge()',
      'action: deploy: on: merge_commit'
    ],
    answerIndex: 0,
    explanation: 'GitHub Actions uses the "on: push: branches: [main]" syntax to trigger workflows when commits land on the specified branch.'
  },
  {
    id: 3,
    category: 'Microservices & API',
    question: 'Which HTTP response status code is most appropriate when a client sends a payload that fails validation schema?',
    options: [
      '422 Unprocessable Entity (or 400 Bad Request)',
      '502 Bad Gateway',
      '401 Unauthorized',
      '404 Not Found'
    ],
    answerIndex: 0,
    explanation: '422 Unprocessable Entity (or 400 Bad Request) is the RFC standard for payload validation errors.'
  }
];

export default function PeerQuizModal({ isOpen, onClose, onQuizComplete }) {
  if (!isOpen) return null;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const currentQ = quizQuestions[currentIdx];

  const handleSelectOption = (optIndex) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optIndex
    }));
  };

  const handleNext = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setSubmitted(true);
      if (onQuizComplete) {
        onQuizComplete();
      }
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setSubmitted(false);
  };

  const score = Object.keys(selectedAnswers).reduce((acc, qIdx) => {
    return acc + (selectedAnswers[qIdx] === quizQuestions[qIdx].answerIndex ? 1 : 0);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1e1c19] rounded-2xl border border-surface-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-surface-subtle/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#b46b2b]/15 flex items-center justify-center text-[#b46b2b]">
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-navy">Peer Verification Quiz</h3>
              <p className="text-xs text-brand-muted">10-Min diagnostic test for Capstone synergy endorsement</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-surface transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-5 text-sm">
          {!submitted ? (
            <>
              {/* Progress Bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs text-brand-muted font-medium">
                  <span>Question {currentIdx + 1} of {quizQuestions.length}</span>
                  <span className="px-2 py-0.5 rounded bg-surface border border-surface-border text-[#b46b2b] font-bold">
                    {currentQ.category}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-subtle overflow-hidden border border-surface-border">
                  <div
                    className="h-full bg-[#b46b2b] transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Title */}
              <div className="font-semibold text-brand-navy text-sm leading-relaxed">
                {currentQ.question}
              </div>

              {/* Options */}
              <div className="flex flex-col gap-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentIdx] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#b46b2b] bg-[#fdf5eb] dark:bg-[#35291f] text-brand-navy font-semibold shadow-xs'
                          : 'border-surface-border bg-surface hover:bg-surface-subtle text-brand-slate dark:text-slate-300'
                      }`}
                    >
                      <span>{opt}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-[#b46b2b] bg-[#b46b2b] text-white' : 'border-surface-border'
                      }`}>
                        {isSelected && <CheckCircle size={12} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            /* Quiz Completed View */
            <div className="py-6 flex flex-col items-center justify-center text-center gap-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-accent-emeraldBg border border-accent-emeraldBorder flex items-center justify-center text-accent-emerald shadow-md">
                <Award size={32} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-brand-navy">Diagnostic Passed!</h4>
                <p className="text-xs text-brand-muted mt-1 max-w-sm">
                  You scored {score} / {quizQuestions.length}. Your DevOps Readiness has been upgraded to 85% on your profile badge.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-brand-navy font-semibold flex items-center gap-2">
                <Sparkles size={16} className="text-[#b46b2b]" />
                <span>+15% Capstone Match Boost applied!</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-surface-border bg-surface-subtle/50">
          {!submitted ? (
            <>
              <span className="text-xs text-brand-muted">
                {selectedAnswers[currentIdx] !== undefined ? 'Answer selected' : 'Please select an option'}
              </span>
              <button
                disabled={selectedAnswers[currentIdx] === undefined}
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-[#b46b2b] hover:bg-[#9c5921] active:bg-[#7f4616] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <span>{currentIdx === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                <ArrowRight size={14} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-muted hover:text-brand-navy flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={14} />
                Retake Quiz
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#b46b2b] hover:bg-[#9c5921] text-white text-xs font-bold cursor-pointer shadow-xs"
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
