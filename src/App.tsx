import { useState, useEffect, useRef } from 'react'
import { BroadcastChannel } from 'broadcast-channel'
import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { ArrowsClockwise, Monitor } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [text, setText] = useKV('notepad-text', '')
  const [isSyncing, setIsSyncing] = useState(false)
  const channelRef = useRef<BroadcastChannel<string> | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isLocalChange = useRef(false)

  useEffect(() => {
    const channel = new BroadcastChannel<string>('notepad-sync')
    channelRef.current = channel

    channel.onmessage = (msg) => {
      if (msg !== text) {
        const currentCursorPos = textareaRef.current?.selectionStart || 0
        setText(msg)
        setIsSyncing(true)
        
        setTimeout(() => {
          if (textareaRef.current && document.activeElement !== textareaRef.current) {
            textareaRef.current.setSelectionRange(currentCursorPos, currentCursorPos)
          }
        }, 0)
        
        setTimeout(() => setIsSyncing(false), 500)
      }
    }

    return () => {
      channel.close()
    }
  }, [text, setText])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    isLocalChange.current = true
    setText(newText)
    
    if (channelRef.current) {
      channelRef.current.postMessage(newText)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] flex flex-col">
        <Card className="flex-1 flex flex-col shadow-lg border-2">
          <div className="p-6 border-b bg-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-foreground flex items-center gap-3">
                <Monitor className="text-primary" size={32} weight="duotone" />
                Sync Notepad
              </h1>
              <p className="text-muted-foreground mt-1">
                Type here and watch it sync across tabs in real-time
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <AnimatePresence>
                {isSyncing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge 
                      variant="outline" 
                      className="bg-accent/20 border-accent text-accent-foreground flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <ArrowsClockwise size={14} weight="bold" />
                      </motion.div>
                      Syncing
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <Badge variant="secondary" className="mono">
                Multi-Tab Demo
              </Badge>
            </div>
          </div>

          <div className="flex-1 p-6 relative">
            <Textarea
              ref={textareaRef}
              id="notepad-textarea"
              value={text}
              onChange={handleTextChange}
              placeholder="Start typing... Open this app in multiple tabs to see the magic! ✨"
              className={`h-full resize-none text-base transition-all duration-300 ${
                isSyncing ? 'ring-2 ring-accent shadow-lg shadow-accent/20' : ''
              }`}
            />
          </div>

          <div className="px-6 py-3 border-t bg-muted/30 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Connected to broadcast channel</span>
            </div>
            <span className="mono">{(text || '').length} characters</span>
          </div>
        </Card>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>💡 Open this page in multiple browser tabs to see synchronization in action</p>
        </div>
      </div>
    </div>
  )
}

export default App