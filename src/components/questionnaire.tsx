"use client"

import { useState, useEffect } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

export default function Questionnaire() {
  const [timeLeft, setTimeLeft] = useState(60)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showTimeUpDialog, setShowTimeUpDialog] = useState(false)

  // Sample question data
  const question = {
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  }

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    } else {
      setShowTimeUpDialog(true)
    }
  }, [timeLeft])

  const handleOptionClick = (option: string) => {
    if (!isSubmitted) {
      setSelectedOption(option)
    }
  }

  const handleSubmit = () => {
    if (selectedOption) {
      setIsSubmitted(true)
    }
  }

  const getOptionClassName = (option: string) => {
    const baseClass = "p-4 rounded-lg cursor-pointer transition-colors duration-200"

    if (!isSubmitted) {
      return `${baseClass} ${
        selectedOption === option ? "bg-primary/10 border-2 border-primary" : "bg-secondary hover:bg-secondary/80"
      }`
    }

    if (option === question.correctAnswer) {
      return `${baseClass} bg-green-500 text-white`
    }

    if (option === selectedOption && option !== question.correctAnswer) {
      return `${baseClass} bg-red-500 text-white`
    }

    return `${baseClass} bg-secondary`
  }

  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Card className="mx-auto max-w-2xl p-6">
        <div className="mb-6 text-center">
          <div className="text-2xl font-bold">
            Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-6 text-xl font-semibold">{question.text}</h2>
          <div className="space-y-3">
            {question.options.map((option) => (
              <div key={option} onClick={() => handleOptionClick(option)} className={getOptionClassName(option)}>
                {option}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button onClick={handleSubmit} disabled={!selectedOption || isSubmitted} className="min-w-[120px]">
            {isSubmitted ? "Next" : "Submit"}
          </Button>
        </div>

        <AlertDialog open={showTimeUpDialog} onOpenChange={setShowTimeUpDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Time&apos;s Up!</AlertDialogTitle>
              <AlertDialogDescription>Would you like to try the questionnaire again?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleReload}>Reload</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </div>
  )
}

