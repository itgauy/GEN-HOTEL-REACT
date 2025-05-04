"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Hotel } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

// Confetti component
const Confetti = ({ count = 100 }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 4,
      color: ["#FF69B4", "#87CEFA", "#90EE90", "#FFD700", "#9370DB"][Math.floor(Math.random() * 5)],
      delay: Math.random() * 0.5,
    }))
    setParticles(newParticles)
  }, [count])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: "-20px",
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 20,
            opacity: [1, 1, 0],
            rotate: Math.random() > 0.5 ? 360 : -360,
            x: Math.random() > 0.5 ? 100 : -100,
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

export default function BookingSuccess() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [guestName, setGuestName] = useState("Unidentified") // Default fallback

  useEffect(() => {
    // Retrieve guest_name from localStorage
    try {
      const authStorage = localStorage.getItem("auth-storage")
      if (authStorage) {
        const parsedData = JSON.parse(authStorage)
        const { firstName, lastName } = parsedData.state.user.guest_name || {}
        if (firstName && lastName) {
          setGuestName(`${lastName} ${firstName}`)
        }
      }
    } catch (error) {
      console.error("Error parsing auth-storage:", error)
    }

    // Trigger confetti animation
    setShowConfetti(true)
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      {showConfetti && <Confetti />}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto p-4 max-w-xl"
      >
        <Card className="shadow-lg border border-gray-200">
          <CardContent className="flex flex-col items-center p-8 text-center">
            <motion.div
              className="rounded-full bg-primary p-4 mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Hotel className="h-8 w-8 text-primary-foreground" />
            </motion.div>

            <motion.h2
              className="text-2xl font-bold tracking-tight mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Congratulations, {guestName}
            </motion.h2>

            <motion.p
              className="text-lg font-medium mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              You've secured your hotel reservation slot
            </motion.p>

            <motion.p
              className="text-muted-foreground mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Enjoy your wonderful stay thank you for choosing our hotels.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button className="w-full">Explore</Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}