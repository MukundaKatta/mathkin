"use client";

import { useState } from "react";
import Link from "next/link";

type Grade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface Option {
  key: string;
  text: string;
  correct: boolean;
}

interface Question {
  id: number;
  topic: string;
  text: string;
  options: Option[];
  rationale: string;
}

const QUESTIONS: Record<Grade, Question[]> = {
  1: [
    {
      id: 1,
      topic: "Addition",
      text: "What is 7 + 5?",
      options: [
        { key: "A", text: "11", correct: false },
        { key: "B", text: "12", correct: true },
        { key: "C", text: "13", correct: false },
        { key: "D", text: "10", correct: false },
      ],
      rationale: "Count on from 7: 8, 9, 10, 11, 12. So 7 + 5 = 12.",
    },
    {
      id: 2,
      topic: "Subtraction",
      text: "What is 15 - 8?",
      options: [
        { key: "A", text: "6", correct: false },
        { key: "B", text: "8", correct: false },
        { key: "C", text: "7", correct: true },
        { key: "D", text: "9", correct: false },
      ],
      rationale: "Start at 15 and count back 8: 14, 13, 12, 11, 10, 9, 8, 7. So 15 - 8 = 7.",
    },
    {
      id: 3,
      topic: "Counting",
      text: "Which number comes right after 19?",
      options: [
        { key: "A", text: "18", correct: false },
        { key: "B", text: "21", correct: false },
        { key: "C", text: "20", correct: true },
        { key: "D", text: "29", correct: false },
      ],
      rationale: "When counting up, the number right after 19 is 20.",
    },
  ],
  2: [
    {
      id: 1,
      topic: "Addition",
      text: "What is 48 + 27?",
      options: [
        { key: "A", text: "65", correct: false },
        { key: "B", text: "75", correct: true },
        { key: "C", text: "74", correct: false },
        { key: "D", text: "85", correct: false },
      ],
      rationale: "Add the ones: 8 + 7 = 15, write 5 carry 1. Add the tens: 4 + 2 + 1 = 7. Answer: 75.",
    },
    {
      id: 2,
      topic: "Subtraction",
      text: "What is 63 - 29?",
      options: [
        { key: "A", text: "34", correct: true },
        { key: "B", text: "44", correct: false },
        { key: "C", text: "36", correct: false },
        { key: "D", text: "32", correct: false },
      ],
      rationale: "Borrow from the tens: 13 - 9 = 4, then 5 - 2 = 3. Answer: 34.",
    },
    {
      id: 3,
      topic: "Even & Odd",
      text: "Which of these numbers is odd?",
      options: [
        { key: "A", text: "14", correct: false },
        { key: "B", text: "22", correct: false },
        { key: "C", text: "37", correct: true },
        { key: "D", text: "50", correct: false },
      ],
      rationale: "Odd numbers end in 1, 3, 5, 7, or 9. 37 ends in 7, so it is odd.",
    },
  ],
  3: [
    {
      id: 1,
      topic: "Multiplication",
      text: "What is 6 × 7?",
      options: [
        { key: "A", text: "36", correct: false },
        { key: "B", text: "42", correct: true },
        { key: "C", text: "48", correct: false },
        { key: "D", text: "49", correct: false },
      ],
      rationale: "6 × 7 = 42. Think of it as 6 groups of 7, or 7 groups of 6.",
    },
    {
      id: 2,
      topic: "Division",
      text: "What is 56 ÷ 8?",
      options: [
        { key: "A", text: "6", correct: false },
        { key: "B", text: "8", correct: false },
        { key: "C", text: "7", correct: true },
        { key: "D", text: "9", correct: false },
      ],
      rationale: "Ask: 8 × ? = 56. Since 8 × 7 = 56, the answer is 7.",
    },
    {
      id: 3,
      topic: "Word Problems",
      text: "Emma has 4 bags with 9 marbles each. How many marbles does she have?",
      options: [
        { key: "A", text: "32", correct: false },
        { key: "B", text: "36", correct: true },
        { key: "C", text: "40", correct: false },
        { key: "D", text: "45", correct: false },
      ],
      rationale: "4 bags × 9 marbles = 36 marbles total.",
    },
  ],
  4: [
    {
      id: 1,
      topic: "Fractions",
      text: "Which fraction is equivalent to 2/4?",
      options: [
        { key: "A", text: "1/2", correct: true },
        { key: "B", text: "3/4", correct: false },
        { key: "C", text: "2/3", correct: false },
        { key: "D", text: "1/4", correct: false },
      ],
      rationale: "Divide both numerator and denominator by 2: 2÷2 / 4÷2 = 1/2.",
    },
    {
      id: 2,
      topic: "Multiplication",
      text: "What is 23 × 4?",
      options: [
        { key: "A", text: "82", correct: false },
        { key: "B", text: "92", correct: true },
        { key: "C", text: "86", correct: false },
        { key: "D", text: "96", correct: false },
      ],
      rationale: "23 × 4 = (20 × 4) + (3 × 4) = 80 + 12 = 92.",
    },
    {
      id: 3,
      topic: "Geometry",
      text: "How many right angles does a rectangle have?",
      options: [
        { key: "A", text: "2", correct: false },
        { key: "B", text: "3", correct: false },
        { key: "C", text: "4", correct: true },
        { key: "D", text: "1", correct: false },
      ],
      rationale: "A rectangle has 4 corners, and each corner is a right angle (90°).",
    },
  ],
  5: [
    {
      id: 1,
      topic: "Decimals",
      text: "What is 0.3 + 0.45?",
      options: [
        { key: "A", text: "0.48", correct: false },
        { key: "B", text: "0.75", correct: true },
        { key: "C", text: "0.35", correct: false },
        { key: "D", text: "0.8", correct: false },
      ],
      rationale: "Line up the decimals: 0.30 + 0.45 = 0.75.",
    },
    {
      id: 2,
      topic: "Volume",
      text: "A box is 3 cm long, 4 cm wide, and 5 cm tall. What is its volume?",
      options: [
        { key: "A", text: "12 cm³", correct: false },
        { key: "B", text: "60 cm³", correct: true },
        { key: "C", text: "50 cm³", correct: false },
        { key: "D", text: "35 cm³", correct: false },
      ],
      rationale: "Volume = length × width × height = 3 × 4 × 5 = 60 cm³.",
    },
    {
      id: 3,
      topic: "Order of Operations",
      text: "What is 3 + 4 × 2?",
      options: [
        { key: "A", text: "14", correct: false },
        { key: "B", text: "11", correct: true },
        { key: "C", text: "10", correct: false },
        { key: "D", text: "9", correct: false },
      ],
      rationale: "Multiplication first: 4 × 2 = 8. Then add: 3 + 8 = 11.",
    },
  ],
  6: [
    {
      id: 1,
      topic: "Fractions",
      text: "A pizza is cut into 8 equal slices. If Maya eats 3 slices and Leo eats 2, what fraction of the pizza is left?",
      options: [
        { key: "A", text: "5/8", correct: false },
        { key: "B", text: "3/8", correct: true },
        { key: "C", text: "1/2", correct: false },
        { key: "D", text: "2/8", correct: false },
      ],
      rationale: "They ate 3 + 2 = 5 slices. Left = 8/8 - 5/8 = 3/8.",
    },
    {
      id: 2,
      topic: "Ratios",
      text: "The ratio of boys to girls in a class is 3:5. If there are 15 girls, how many boys are there?",
      options: [
        { key: "A", text: "9", correct: true },
        { key: "B", text: "12", correct: false },
        { key: "C", text: "8", correct: false },
        { key: "D", text: "10", correct: false },
      ],
      rationale: "3/5 = ?/15. Multiply 3 by 3 to get 9 boys.",
    },
    {
      id: 3,
      topic: "Percentages",
      text: "What is 25% of 80?",
      options: [
        { key: "A", text: "15", correct: false },
        { key: "B", text: "20", correct: true },
        { key: "C", text: "25", correct: false },
        { key: "D", text: "40", correct: false },
      ],
      rationale: "25% means one quarter. 80 ÷ 4 = 20.",
    },
  ],
  7: [
    {
      id: 1,
      topic: "Integers",
      text: "What is (-3) × (-4)?",
      options: [
        { key: "A", text: "-12", correct: false },
        { key: "B", text: "12", correct: true },
        { key: "C", text: "-7", correct: false },
        { key: "D", text: "7", correct: false },
      ],
      rationale: "A negative times a negative is positive. 3 × 4 = 12, so (-3) × (-4) = 12.",
    },
    {
      id: 2,
      topic: "Proportions",
      text: "If 5 notebooks cost $15, how much do 8 notebooks cost?",
      options: [
        { key: "A", text: "$20", correct: false },
        { key: "B", text: "$24", correct: true },
        { key: "C", text: "$28", correct: false },
        { key: "D", text: "$18", correct: false },
      ],
      rationale: "Each notebook costs $15 ÷ 5 = $3. So 8 notebooks = 8 × $3 = $24.",
    },
    {
      id: 3,
      topic: "Geometry",
      text: "What is the area of a triangle with base 10 cm and height 6 cm?",
      options: [
        { key: "A", text: "60 cm²", correct: false },
        { key: "B", text: "30 cm²", correct: true },
        { key: "C", text: "16 cm²", correct: false },
        { key: "D", text: "36 cm²", correct: false },
      ],
      rationale: "Area = ½ × base × height = ½ × 10 × 6 = 30 cm².",
    },
  ],
  8: [
    {
      id: 1,
      topic: "Linear Equations",
      text: "Solve for x: 3x + 7 = 22",
      options: [
        { key: "A", text: "x = 3", correct: false },
        { key: "B", text: "x = 5", correct: true },
        { key: "C", text: "x = 7", correct: false },
        { key: "D", text: "x = 4", correct: false },
      ],
      rationale: "3x + 7 = 22 → 3x = 15 → x = 5.",
    },
    {
      id: 2,
      topic: "Exponents",
      text: "What is 2⁵?",
      options: [
        { key: "A", text: "10", correct: false },
        { key: "B", text: "25", correct: false },
        { key: "C", text: "32", correct: true },
        { key: "D", text: "64", correct: false },
      ],
      rationale: "2⁵ = 2 × 2 × 2 × 2 × 2 = 32.",
    },
    {
      id: 3,
      topic: "Pythagorean Theorem",
      text: "A right triangle has legs of length 3 and 4. What is the hypotenuse?",
      options: [
        { key: "A", text: "6", correct: false },
        { key: "B", text: "5", correct: true },
        { key: "C", text: "7", correct: false },
        { key: "D", text: "12", correct: false },
      ],
      rationale: "a² + b² = c² → 9 + 16 = 25 → c = √25 = 5.",
    },
  ],
  9: [
    {
      id: 1,
      topic: "Quadratics",
      text: "What are the solutions to x² - 5x + 6 = 0?",
      options: [
        { key: "A", text: "x = 1 and x = 6", correct: false },
        { key: "B", text: "x = 2 and x = 3", correct: true },
        { key: "C", text: "x = -2 and x = -3", correct: false },
        { key: "D", text: "x = 5 and x = 1", correct: false },
      ],
      rationale: "Factor: (x - 2)(x - 3) = 0. So x = 2 or x = 3.",
    },
    {
      id: 2,
      topic: "Coordinate Geometry",
      text: "What is the slope of the line passing through (1, 2) and (4, 8)?",
      options: [
        { key: "A", text: "3", correct: false },
        { key: "B", text: "2", correct: true },
        { key: "C", text: "6", correct: false },
        { key: "D", text: "1/2", correct: false },
      ],
      rationale: "Slope = (y₂ - y₁)/(x₂ - x₁) = (8 - 2)/(4 - 1) = 6/3 = 2.",
    },
    {
      id: 3,
      topic: "Statistics",
      text: "What is the median of the data set: 3, 7, 9, 12, 15?",
      options: [
        { key: "A", text: "7", correct: false },
        { key: "B", text: "9", correct: true },
        { key: "C", text: "12", correct: false },
        { key: "D", text: "9.2", correct: false },
      ],
      rationale: "The data is already sorted. The middle value (3rd of 5) is 9.",
    },
  ],
  10: [
    {
      id: 1,
      topic: "Trigonometry",
      text: "In a right triangle, if the opposite side is 5 and the hypotenuse is 13, what is sin(θ)?",
      options: [
        { key: "A", text: "5/12", correct: false },
        { key: "B", text: "5/13", correct: true },
        { key: "C", text: "12/13", correct: false },
        { key: "D", text: "13/5", correct: false },
      ],
      rationale: "sin(θ) = opposite/hypotenuse = 5/13.",
    },
    {
      id: 2,
      topic: "Polynomials",
      text: "What is the remainder when x³ + 2x² - x + 3 is divided by (x - 1)?",
      options: [
        { key: "A", text: "3", correct: false },
        { key: "B", text: "5", correct: true },
        { key: "C", text: "1", correct: false },
        { key: "D", text: "7", correct: false },
      ],
      rationale: "By the Remainder Theorem, substitute x = 1: 1 + 2 - 1 + 3 = 5.",
    },
    {
      id: 3,
      topic: "Probability",
      text: "Two dice are rolled. What is the probability that the sum is 7?",
      options: [
        { key: "A", text: "1/6", correct: true },
        { key: "B", text: "1/12", correct: false },
        { key: "C", text: "7/36", correct: false },
        { key: "D", text: "1/36", correct: false },
      ],
      rationale: "There are 6 favorable outcomes (1+6, 2+5, 3+4, 4+3, 5+2, 6+1) out of 36 total. 6/36 = 1/6.",
    },
  ],
};

const GRADES: Grade[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function TryPage() {
  const [grade, setGrade] = useState<Grade>(6);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = QUESTIONS[grade];
  const q = questions[questionIndex];

  function handleGradeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setGrade(Number(e.target.value) as Grade);
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  function handleSelect(key: string) {
    if (selected) return;
    setSelected(key);
    const opt = q.options.find((o) => o.key === key);
    if (opt?.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (questionIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setQuestionIndex((i) => i + 1);
      setSelected(null);
    }
  }

  function handleRestart() {
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />
          Mathkin
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Practice session
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">Pick a grade, start practicing.</h1>
          </div>
          <select
            value={grade}
            onChange={handleGradeChange}
            className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
          >
            {GRADES.map((g) => (
              <option key={g} value={g}>
                Grade {g}
              </option>
            ))}
          </select>
        </div>

        {finished ? (
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm text-center">
            <p className="text-5xl font-bold text-neutral-900">
              {score}/{questions.length}
            </p>
            <p className="mt-3 text-neutral-600">
              {score === questions.length
                ? "Perfect score. You nailed it!"
                : score >= 2
                ? "Strong. A few gaps to review — keep going."
                : "Good start. Practice makes perfect."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleRestart}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
              >
                Try again
              </button>
              <Link
                href="/#waitlist"
                className="rounded-full border border-neutral-300 px-7 py-3.5 font-medium text-neutral-900 transition hover:border-neutral-900"
              >
                Get early access
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
              <span className="text-blue-600">
                Grade {grade} · {q.topic}
              </span>
              <span className="text-neutral-400">
                Q {questionIndex + 1} of {questions.length}
              </span>
            </div>

            <p className="mt-5 text-lg leading-relaxed text-neutral-900">{q.text}</p>

            <div className="mt-6 grid gap-2">
              {q.options.map((opt) => {
                const picked = selected !== null;
                let cls =
                  "rounded-xl border border-neutral-300 bg-white px-4 py-3 text-left text-sm transition w-full";
                if (!picked) cls += " hover:border-blue-500 hover:bg-blue-50 cursor-pointer";
                if (picked && opt.correct)
                  cls =
                    "rounded-xl border border-green-500 bg-green-50 px-4 py-3 text-left text-sm text-green-900 w-full";
                if (picked && selected === opt.key && !opt.correct)
                  cls =
                    "rounded-xl border border-red-500 bg-red-50 px-4 py-3 text-left text-sm text-red-900 w-full";
                return (
                  <button
                    key={opt.key}
                    disabled={picked}
                    className={cls}
                    onClick={() => handleSelect(opt.key)}
                  >
                    <span className="mr-2 font-semibold">{opt.key}.</span>
                    {opt.text}
                  </button>
                );
              })}
            </div>

            {selected && (
              <>
                <div
                  className={`mt-5 rounded-xl p-4 text-sm leading-relaxed ${
                    q.options.find((o) => o.key === selected)?.correct
                      ? "bg-green-50 text-green-900"
                      : "bg-red-50 text-red-900"
                  }`}
                >
                  <span className="font-semibold mr-1">
                    {q.options.find((o) => o.key === selected)?.correct ? "Correct." : "Not quite."}
                  </span>
                  {q.rationale}
                </div>
                <button
                  onClick={handleNext}
                  className="mt-4 w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
                >
                  {questionIndex + 1 >= questions.length ? "See results" : "Next question →"}
                </button>
              </>
            )}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-neutral-400">
          This is a v0 preview with 3 questions per grade.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for the full experience.
        </p>
      </div>
    </div>
  );
}
