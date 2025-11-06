# Planning Guide

A real-time synchronized notepad that demonstrates cross-tab state management where text typed in one browser tab instantly appears in all other tabs.

**Experience Qualities**: 
1. **Instantaneous** - Changes should appear in other tabs with virtually no perceptible delay
2. **Reliable** - Text synchronization should be robust and never lose user input
3. **Minimal** - Interface should be simple and uncluttered, keeping focus on the sync demonstration

**Complexity Level**: Micro Tool (single-purpose)
  - This is a focused technical demonstration of broadcast-channel synchronization with a single text input as the shared state.

## Essential Features

### Cross-Tab Text Synchronization
- **Functionality**: Text typed in a textarea syncs instantly across all open tabs of the application
- **Purpose**: Demonstrates the broadcast-channel package's ability to share state across browser tabs in real-time
- **Trigger**: User types or pastes text into the textarea
- **Progression**: User types in Tab A → Text broadcasts via channel → Tab B receives update → Tab B textarea updates → All tabs stay in sync
- **Success criteria**: Text appears identically in all tabs within 100ms, cursor position is preserved in the active tab

### Visual Feedback
- **Functionality**: Display a subtle indicator when updates are received from other tabs
- **Purpose**: Help users understand when synchronization is occurring
- **Trigger**: Broadcast message received from another tab
- **Progression**: Tab B receives message → Brief visual pulse/indicator appears → Fades after 500ms
- **Success criteria**: Users can visually confirm synchronization is working across tabs

## Edge Case Handling

- **Rapid Typing**: Throttle/debounce broadcasts to prevent overwhelming the channel while maintaining perceived real-time sync
- **Cursor Position**: Preserve cursor position in the active tab when receiving updates from other tabs
- **Initial Load**: Load persisted text from storage when first opening a tab
- **Single Tab**: Application works normally even if only one tab is open

## Design Direction

The design should feel clean, modern, and technical - like a developer tool or technical demonstration. The interface should be minimal to keep focus on the synchronization functionality, with subtle animations that draw attention to the cross-tab communication without being distracting.

## Color Selection

Analogous color scheme using cool blues and purples to convey a technical, digital feeling with high-tech synchronization vibes.

- **Primary Color**: Deep Blue (oklch(0.45 0.15 250)) - Represents the technical, stable nature of the sync system
- **Secondary Colors**: Soft Purple (oklch(0.55 0.12 280)) for accents and highlights, conveying the "magic" of real-time sync
- **Accent Color**: Bright Cyan (oklch(0.75 0.15 200)) - Used for sync indicators and active states to draw attention to synchronization events
- **Foreground/Background Pairings**:
  - Background (Light Gray oklch(0.98 0 0)): Dark text oklch(0.2 0 0) - Ratio 14.2:1 ✓
  - Card (White oklch(1 0 0)): Dark text oklch(0.2 0 0) - Ratio 15.8:1 ✓
  - Primary (Deep Blue oklch(0.45 0.15 250)): White text oklch(1 0 0) - Ratio 7.1:1 ✓
  - Accent (Bright Cyan oklch(0.75 0.15 200)): Dark text oklch(0.2 0 0) - Ratio 10.5:1 ✓

## Font Selection

Use a clean, modern sans-serif that feels technical but approachable - Inter provides excellent readability and a contemporary feel appropriate for a development tool.

- **Typographic Hierarchy**: 
  - H1 (Main Title): Inter SemiBold/32px/tight letter spacing
  - Body (Instructions): Inter Regular/16px/1.5 line height
  - Monospace (Tab indicator): JetBrains Mono Regular/14px for technical details

## Animations

Animations should be subtle and functional, primarily serving to draw attention to synchronization events. The balance should lean heavily toward functionality with just a touch of delight when sync occurs.

- **Purposeful Meaning**: Use a brief pulse or glow effect when receiving updates from other tabs to communicate the "broadcast" concept
- **Hierarchy of Movement**: The sync indicator should be the primary animated element, with the textarea remaining stable to avoid disrupting the user's typing

## Component Selection

- **Components**: 
  - Textarea (shadcn) for the main text input area
  - Card (shadcn) to contain the app with subtle elevation
  - Badge (shadcn) to show sync status and tab count
- **Customizations**: 
  - Custom sync indicator component with pulse animation
  - Larger textarea with full-height design to maximize writing space
- **States**: 
  - Textarea: Default, focused (subtle ring), receiving-update (brief cyan glow)
  - Badge: Idle state and active/pulsing state when sync occurs
- **Icon Selection**: 
  - ArrowsClockwise (phosphor-icons) for sync indicator
  - Monitor (phosphor-icons) for tab/window representation
- **Spacing**: 
  - Generous padding (p-6 to p-8) around the card
  - Comfortable gap-4 between header elements
  - Full-height textarea with comfortable padding (p-4)
- **Mobile**: 
  - Stack header elements vertically on small screens
  - Maintain full-screen textarea experience
  - Ensure text remains readable with appropriate font sizing
