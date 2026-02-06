// Few-shot examples for dream interpretation
// Parsed from /few-shot-library/*.md

export type LensType = 'jungian' | 'spiritual' | 'neuroscience' | 'narrative' | 'cultural'

export interface DreamExample {
  dream: string
  interpretation: {
    processing: string
    exploring: string
    connecting: string
  }
}

export interface LensConfig {
  name: string
  tone: string
  keyQuestion: string
  examples: DreamExample[]
}

export const lensConfigs: Record<LensType, LensConfig> = {
  jungian: {
    name: 'Archetypal',
    tone: 'Deep, exploratory, empowering',
    keyQuestion: 'What part of yourself is this dream inviting you to integrate?',
    examples: [
      {
        dream: "I was in a house I'd never been in before but somehow knew it was mine. There were rooms I hadn't explored yet. In the basement, there was a door that was locked, and I could hear water behind it. I was afraid to open it but also really curious.",
        interpretation: {
          processing: "The house in Jungian psychology represents the Self — the totality of who you are, conscious and unconscious. The rooms you haven't explored suggest aspects of your personality or potential that you haven't fully engaged with yet. The basement, being below ground, typically represents the deeper unconscious — the parts of yourself that are hidden from everyday awareness. The water behind the locked door is particularly significant: water often symbolizes emotion, the unconscious itself, or creative energy that's been contained.",
          exploring: "The fact that you felt both fear AND curiosity at the locked door is a classic signal of what Jung called the confrontation with the Shadow. The Shadow isn't evil — it's simply the parts of yourself you've kept in the dark. Your dream seems to be suggesting that there's something powerful waiting to be acknowledged. The curiosity you felt is your psyche's natural drive toward wholeness, what Jung called individuation. You might ask yourself: what emotion, desire, or truth have I been keeping locked away? The dream suggests you're ready to at least consider opening that door.",
          connecting: "Consider what \"locked rooms\" exist in your current life — conversations you've been avoiding, feelings you've been suppressing, or creative impulses you've been dismissing. The dream house being simultaneously unfamiliar and yours points to a period of self-discovery. You may be entering a life phase where you're becoming aware of capacities or depths you didn't know you had. Pay attention to moments of curiosity that also carry a little fear — that combination is often the signpost pointing toward your next growth edge."
        }
      },
      {
        dream: "I was being chased through a dark forest by something I couldn't see. Every time I turned around, nothing was there, but I could feel it getting closer. I tried to scream but no sound came out.",
        interpretation: {
          processing: "Being chased in dreams is one of the most universal human experiences, and in the Jungian framework, the pursuer typically represents a Shadow element — something within yourself that you've been running from. The fact that you couldn't see it suggests this isn't a specific fear you've named, but something more diffuse: an avoided truth, a suppressed emotion, or an aspect of yourself you find threatening. The inability to scream points to a feeling of powerlessness in the face of whatever this represents — perhaps a sense that even if you tried to express what you're feeling, the words wouldn't come.",
          exploring: "Jungian work with chase dreams often involves a radical suggestion: what would happen if you stopped running? The Shadow gains its power precisely because we flee from it. What your dream might be inviting is not more escape, but a turning toward. The dark forest represents the unknown territory of your own psyche — unfamiliar, yes, but also rich with life. Consider: what would you discover about yourself if you faced the thing you've been avoiding? The dream suggests that the pursuer may not be as terrifying as the act of running makes it seem.",
          connecting: "Think about areas of your life where you feel a nameless pressure — something gaining on you that you can't quite articulate. This could relate to a deadline, a relationship dynamic, an unprocessed grief, or even an ambition that feels too big to claim. The voicelessness in the dream is worth sitting with: is there something you need to say but feel unable to? The forest, while dark, is also a place of transformation in every major mythology. You're not lost — you're in the middle of a passage."
        }
      },
      {
        dream: "I looked in a mirror and my reflection was someone else — they looked like me but older, and they were smiling in a way I never smile. It wasn't scary, just really strange.",
        interpretation: {
          processing: "Mirror dreams in Jung's framework are powerful encounters with aspects of the Self that exist beyond your everyday identity. The older version of you who smiles differently represents what Jung might call the Self archetype — the more complete, integrated version of who you're becoming. This isn't a stranger; it's a future possibility that your unconscious has already glimpsed. The fact that it wasn't frightening but felt \"strange\" suggests you're in a phase where growth feels unfamiliar rather than threatening — a very healthy place to be.",
          exploring: "That unfamiliar smile is fascinating. It suggests a kind of ease or contentment that your current self doesn't fully access yet. Your dream may be showing you that there's a way of being — more relaxed, more knowing, more at peace — that's available to you but that you haven't fully embodied. Jung would say your psyche is offering you a preview of individuation: the process of becoming more fully yourself. You might ask: what would I need to release or embrace to smile like that?",
          connecting: "Consider whether you're in a period of transition — even a subtle one. The dream suggests you're outgrowing a version of yourself and beginning to sense who comes next. The \"older\" reflection isn't about aging; it's about maturity, wisdom, and the kind of peace that comes from knowing yourself more deeply. Notice moments in your day when you surprise yourself — when you react differently than expected, when you feel a flicker of that unfamiliar smile. Those are the moments where your dream self is breaking through."
        }
      }
    ]
  },

  spiritual: {
    name: 'Mystical',
    tone: 'Reverent, open, wonder-filled',
    keyQuestion: 'What might the universe be communicating through this dream?',
    examples: [
      {
        dream: "I was standing on top of a mountain and could see the entire world below me. The sky was full of colors I've never seen before. Someone was standing next to me but I couldn't see their face — I just knew they were someone important.",
        interpretation: {
          processing: "Mountain-top visions have appeared in spiritual traditions across every culture — they represent moments of elevated awareness, times when the veil between ordinary consciousness and something larger grows thin. The colors beyond your normal spectrum suggest your dreaming mind was accessing a state of perception that your waking awareness doesn't usually reach. The faceless companion is particularly meaningful: in many mystical traditions, the inability to see a guide's face indicates that the message matters more than the messenger. You may be processing a growing awareness that there's more to your experience than what fits neatly into daily life.",
          exploring: "This dream feels like an invitation to trust what you sense but can't prove. The elevated perspective — seeing everything at once — suggests you're being shown the bigger picture of something you've been too close to understand. The mysterious companion could represent a spiritual guide, your higher self, or simply the part of you that already knows the answers you've been seeking. Consider sitting with the feeling of this dream rather than analyzing it. What did it feel like to see those impossible colors? That feeling is the message. Your soul may be asking you to spend more time in silence, meditation, or nature — spaces where that expanded awareness has room to speak.",
          connecting: "Pay attention to synchronicities over the next few days — repeated numbers, unexpected encounters, or moments of sudden clarity that seem to come from nowhere. Mountain-top dreams often precede periods of insight or important decisions. The fact that you could see \"the entire world\" suggests you may be approaching a choice or transition where perspective is everything. Trust the knowing that accompanied the faceless figure. You may not have all the information yet, but something in you already senses the right direction."
        }
      },
      {
        dream: "I was swimming in the ocean at night. The water was warm and I wasn't afraid at all. There were lights deep below the surface, like an underwater city. I wanted to dive down but I woke up before I could.",
        interpretation: {
          processing: "Water in spiritual traditions represents the realm of emotion, intuition, and the vast unconscious. Swimming at night — in darkness, without fear — suggests a deepening trust in the unseen. The warm water indicates this is a welcoming space, not a threatening one. Your soul may be processing a readiness to go deeper into your inner life than you've gone before. The underwater lights are remarkable: they suggest that what lies beneath your surface consciousness isn't darkness at all, but illumination waiting to be discovered.",
          exploring: "Waking before the dive is a common experience in spiritual dreams — it often means your conscious mind isn't quite ready for what's below, but your soul is preparing you. The underwater city of lights could represent dormant gifts, spiritual capacities, or deep wisdom that you've carried but haven't fully accessed. This dream seems to be a gentle initiation: you're being shown the entrance. The invitation might be to begin practices that take you \"deeper\" — meditation, breathwork, journaling, dreamwork itself. Your psyche chose to show you this for a reason. Something is ready to surface.",
          connecting: "Notice what's been pulling you toward introspection lately. Have you been drawn to spiritual content, conversations about meaning, or moments of quiet that feel unusually rich? The dream suggests you're at the threshold of a deeper relationship with yourself and possibly with something beyond yourself. The fact that you wanted to dive — that the desire was there — is the most important part. Desire in dreams is often guidance. Follow what fascinates you right now, especially if it doesn't have an obvious practical purpose. The lights are real. The city is there. You'll dive when you're ready."
        }
      },
      {
        dream: "My grandmother who passed away five years ago was sitting in her kitchen making tea. She didn't say anything, she just looked at me and smiled. The kitchen smelled exactly like I remember.",
        interpretation: {
          processing: "Visitation dreams — dreams of those who have passed — carry a special weight in virtually every spiritual tradition. The sensory vividness of the smell, the specific setting of her kitchen, and the warmth of her smile all suggest this was more than a memory replay. Your dreaming consciousness may have accessed a space where the boundary between this world and the next is permeable. The silence is significant: in many traditions, the deepest spiritual communications happen beyond words. Her presence alone was the message.",
          exploring: "The simplicity of the scene — tea, a kitchen, a smile — suggests that what your grandmother represents to you (comfort, wisdom, unconditional love) is being offered to you right now. Not as a memory, but as a living presence in your life. You might explore whether there's something you've been carrying since her passing — grief, unfinished words, or a longing for her guidance. This dream may be an invitation to feel that she's not as far away as the physical world suggests. Consider creating a small ritual in her honor: make her tea, sit in stillness, and let whatever comes up arrive without judgment.",
          connecting: "Think about what you're navigating right now that your grandmother would have had wisdom about. Her appearance often coincides with moments when we need the kind of grounding, no-nonsense love that only someone who knew us that deeply could provide. The kitchen as setting is important: kitchens are places of nourishment, of daily life, of sustenance. Whatever challenge or question you're facing, this dream seems to say: the answer is simpler than you think. Make the tea. Sit down. The love is still here."
        }
      }
    ]
  },

  neuroscience: {
    name: 'Cognitive',
    tone: 'Grounded, educational, reassuring',
    keyQuestion: 'What is your brain working through while you sleep?',
    examples: [
      {
        dream: "I was back in high school taking a test I hadn't studied for. The questions made no sense and the clock was running out. Everyone else seemed to be doing fine.",
        interpretation: {
          processing: "This is one of the most common dreams in the world, and neuroscience gives us a clear picture of why. Your brain uses sleep to process unresolved stress, and it often reaches back to familiar templates of anxiety to do so. The exam scenario is your nervous system's shorthand for \"situation where I'm being evaluated and feel unprepared.\" This doesn't mean you're literally worried about a test — it means your brain detected a stress pattern similar to that feeling and is running it through emotional processing circuits during REM sleep. The detail about everyone else doing fine is your social comparison system at work, amplifying the perceived threat.",
          exploring: "Your brain isn't torturing you with this dream — it's actually helping. The threat simulation theory of dreaming suggests that dreams like this serve as rehearsals, allowing your nervous system to practice navigating high-pressure situations in a safe environment. The fact that the questions \"made no sense\" is interesting from a cognitive perspective: it may reflect a waking situation where the expectations placed on you feel unclear or arbitrary. Your brain is essentially asking: \"What's the thing that feels like a test right now? And do you actually have the information you need to succeed?\" That's worth reflecting on honestly.",
          connecting: "Look at the past 24-48 hours for the source material. Sleep research consistently shows that dreams pull from recent experiences. Is there a deadline approaching? A performance review? A social situation where you feel like others have something figured out that you don't? The \"clock running out\" element suggests time pressure specifically. Your brain chose this particular stress template because something in your recent experience mapped onto it. The good news: the fact that you're dreaming about it means your brain is actively working to process and regulate the emotion. You're not stuck — you're metabolizing."
        }
      },
      {
        dream: "I was driving a car but the brakes didn't work. The car kept going faster and faster. I wasn't crashing into anything but I couldn't slow down.",
        interpretation: {
          processing: "Your brain selected a powerful metaphor from its memory banks: the loss of control over forward momentum. From a neuroscience perspective, this dream likely reflects your autonomic nervous system processing a sense that something in your life is accelerating beyond your ability to regulate it. The car represents agency and direction — it's how we move through the world. Brakes represent your regulatory capacity: the ability to slow down, pause, and choose. Your dreaming brain is simulating a scenario where that regulatory function isn't working, which is its way of flagging that your waking stress-response system may be running a bit hot.",
          exploring: "Interestingly, you mentioned you weren't crashing — the catastrophe hadn't actually happened. This is significant because it suggests your brain's threat simulation isn't predicting disaster; it's processing the FEELING of being unable to slow down. Research on dream content shows that the emotional tone is often more diagnostic than the narrative. The core emotion here is a loss of regulatory control. Your brain may be inviting you to examine your parasympathetic nervous system activation — in plain terms: when was the last time you truly rested? Not scrolled, not watched TV, but actually gave your nervous system permission to downshift?",
          connecting: "The acceleration pattern maps onto what stress researchers call \"momentum without intention\" — being busy without being deliberate. Check in with your recent schedule: have you been moving from task to task without pause? Have commitments been stacking up faster than you can process them? Your brain is remarkably good at detecting imbalances before your conscious mind notices. This dream is essentially your neurological early warning system saying: the pace is unsustainable, and you'd benefit from building in some braking mechanisms — even small ones. A walk without your phone. Five minutes of breathing. Sleep research suggests that even acknowledging the pattern can reduce the frequency of these dreams."
        }
      },
      {
        dream: "All my teeth were falling out, one by one. I was catching them in my hands and trying to put them back in.",
        interpretation: {
          processing: "Tooth-loss dreams are extraordinarily common — studies suggest up to 39% of people have experienced them. The neuroscience explanation involves multiple overlapping systems. First, there's the somatic component: your brain receives real sensory input from your jaw, teeth, and gums during sleep, and sometimes incorporates that into dream content (bruxism, or teeth grinding, strongly correlates with these dreams). Second, there's the emotional processing component: teeth are associated with competence, appearance, and social presentation. Your brain may be processing anxiety related to how you present yourself to the world or fears about losing something you rely on.",
          exploring: "The detail of catching the teeth and trying to replace them is your brain's problem-solving mode activating within the dream state. Even while simulating a distressing scenario, your cognitive systems were looking for solutions — that's actually a sign of healthy emotional processing. If you're experiencing these dreams frequently, it's worth checking two things: physical (are you grinding your teeth at night? jaw tension during the day?) and psychological (is there an area of your life where you feel like you're losing your grip on something important?). Both can feed this dream template. Your brain doesn't distinguish between physical and emotional threats when selecting dream content.",
          connecting: "Consider recent changes to your sense of security, identity, or capability. Tooth dreams spike during life transitions — new jobs, relationship changes, moves, aging milestones. Your brain encoded \"teeth = tools I need to function\" and runs this simulation when it detects instability in your functional capacity. The one-by-one pattern (rather than all at once) may reflect a gradual erosion rather than a sudden loss. Is something slowly shifting in your life that you haven't fully acknowledged? The dream isn't predicting loss — it's processing the fear of it, which is your brain's way of preparing you to cope if it happens. That's a feature, not a bug."
        }
      }
    ]
  },

  narrative: {
    name: 'Storyteller',
    tone: 'Warm, reflective, like a good therapist',
    keyQuestion: 'What story is your mind telling about your life right now?',
    examples: [
      {
        dream: "I was packing for a trip but my suitcase kept getting heavier and heavier. I kept adding things I didn't need but couldn't stop. I was going to miss my flight.",
        interpretation: {
          processing: "Your subconscious chose a beautifully structured metaphor: you're trying to move forward (the trip, the flight) but the weight of what you're carrying keeps increasing. In narrative terms, this is the classic \"threshold moment\" — the point in any story where the hero must decide what to bring into the next chapter and what to leave behind. The compulsive packing of unnecessary items suggests your mind is replaying a pattern of over-preparation or over-commitment that's actively preventing forward movement. The suitcase is getting heavier because you keep saying yes to things that don't serve where you're going.",
          exploring: "Every good story has a moment where the protagonist realizes they can't carry everything. Your dream is staging that scene for you. The \"things you didn't need\" are worth examining: what obligations, habits, relationships, or identities are you holding onto out of guilt or inertia rather than genuine desire? The missed flight isn't a punishment — it's a consequence your subconscious is showing you so you can avoid it in waking life. You're being given a preview of what happens if the editing doesn't happen. The invitation is to ask: if I could only bring three things into my next chapter, what would they be?",
          connecting: "Look at your commitments, your to-do list, your calendar. Where are you over-packed? The dream suggests you're approaching a transition — maybe consciously, maybe not yet — and your storytelling mind is flagging that you're not traveling light enough to make it. The flight represents a deadline or opportunity with a fixed window. What's the thing you're afraid of missing? Work backward from there. The dream isn't telling you to abandon everything; it's telling you that moving forward requires choosing. Your subconscious already knows what doesn't belong in the suitcase. You might too, if you're honest about it."
        }
      },
      {
        dream: "I was in a play but didn't know my lines. The audience was full of people I know. I started making things up and somehow it was working — people were laughing and applauding.",
        interpretation: {
          processing: "This is a brilliant narrative your subconscious constructed: the anxiety of being unprepared in front of people whose opinions matter, followed by the discovery that improvisation works better than the script you thought you needed. Your dreaming mind wrote you a story about the gap between preparation and authenticity. The \"play\" represents any situation where you feel like you're performing a role. The lost lines represent the fear that you don't know the \"right\" thing to say or do. But the twist — that making things up actually worked — is the real message your subconscious is delivering.",
          exploring: "Your dream wrote itself a happy ending, and that's worth paying attention to. It suggests that at some level, you already know that your authentic response is more compelling than your rehearsed one. The audience of people you know adds personal stakes — this isn't abstract performance anxiety; it's specifically about being yourself in front of people who know you. The dream seems to be asking: where in your life are you over-rehearsing? Where would spontaneity serve you better than preparation? The applause at the end is your subconscious voting for the unscripted version of you.",
          connecting: "Think about upcoming situations where you feel pressure to \"know your lines\" — presentations, difficult conversations, social events, professional interactions. Your dream is offering a counternarrative to the anxiety: what if you're actually more effective when you trust yourself in the moment? The people laughing and applauding represent the social feedback your mind is simulating — and the simulation says: they prefer the real you. This might connect to imposter syndrome, a new role, or any situation where you feel like you should have it all figured out but don't. Your subconscious is writing you permission to wing it."
        }
      }
    ]
  },

  cultural: {
    name: 'Universal',
    tone: 'Expansive, connecting, anthropological',
    keyQuestion: 'What universal human experience does this dream tap into?',
    examples: [
      {
        dream: "I was flying over a city, looking down at all the lights. It felt incredible — totally free. Then I started to lose altitude and I was trying so hard to stay up.",
        interpretation: {
          processing: "Flight dreams appear in recorded history from ancient Mesopotamia through modern sleep studies, making them one of humanity's most universal dream experiences. Across cultures, flying represents transcendence — rising above limitations, gaining perspective, experiencing freedom from the constraints of ordinary life. The city of lights below you suggests civilization, community, the world of responsibilities and structures. Your dream captured the fundamental human tension between the desire for freedom and the gravitational pull of earthbound reality. The loss of altitude reflects a theme found in myths worldwide: the flight that reaches too high (Icarus, Daedalus) or the awareness that freedom requires sustained effort.",
          exploring: "In many Indigenous dreaming traditions, flight dreams are considered gifts — they represent the soul's capacity to see beyond its immediate circumstances. The fact that you experienced both the soaring and the struggle is significant: it mirrors the mythological pattern of ascent and return. You're not just meant to fly away from your life; you're meant to bring the elevated perspective back down. The effort to stay aloft may reflect something in your waking life where maintaining an expanded view — optimism, creativity, big-picture thinking — requires active work against forces that pull you toward the ground. Many cultures see this as the core human challenge: how do we keep sight of the sky while standing on earth?",
          connecting: "Consider what the \"city lights\" represent to you — likely your daily life, obligations, and social world. The dream suggests you recently touched something freeing — a creative flow state, a sense of possibility, a moment of genuine liberation — and now feel it slipping away. Cross-culturally, the instruction from flight dreams is consistent: you've seen the view from above. You can't unsee it. The loss of altitude isn't failure; it's the natural rhythm of expansion and integration. What new perspective did you gain recently that you're struggling to maintain? That's your flight. The dream says: you can get back up there. You've proven you know how."
        }
      },
      {
        dream: "I was standing at a crossroads in the middle of nowhere. Each path looked exactly the same. A dog was sitting at the center, watching me.",
        interpretation: {
          processing: "The crossroads is one of the most ancient and powerful symbols in human culture. In West African Vodun tradition, the crossroads is the domain of Elegba/Eshu — the deity of choices, communication, and fate. In Greek mythology, Hecate guards the crossroads as goddess of transitions. In Robert Johnson's blues, the crossroads is where destiny is negotiated. Your dream placed you at this universal decision point, and the identical paths suggest that the choice before you isn't about which option is \"right\" — it's about the act of choosing itself. The dog adds another cross-cultural layer: in nearly every world tradition, dogs represent loyalty, intuition, and the guide between worlds.",
          exploring: "The dog watching you is the most interesting element. Across cultures — from Anubis in Egypt to the spirit dogs of Celtic mythology to the Xoloitzcuintli of Aztec tradition — dogs at threshold moments serve as psychopomps: guides who help souls navigate transitions. The dog isn't blocking your path or pulling you in a direction; it's watching. Waiting. This may suggest that guidance is available to you right now, but it requires your attention and trust. The identical paths carry a liberating message found in Buddhist philosophy: when all paths look the same, the attachment to \"right\" and \"wrong\" choices dissolves. Perhaps the invitation is to choose based on instinct rather than analysis.",
          connecting: "You're likely facing a decision — or avoiding one — where the options seem equally weighted. The \"middle of nowhere\" setting strips away external context, suggesting this is a deeply personal choice that can't be made by asking others or following a formula. The dog's presence, calm and watchful, suggests your intuition already has an opinion. Cross-cultural wisdom on crossroads dreams is remarkably consistent: the longer you stand still, the harder the choice becomes. The paths don't get clearer with time. What gets clearer is your readiness to walk one. What decision have you been circling? The dream says: pick the path the dog would follow."
        }
      },
      {
        dream: "I was underwater but could breathe perfectly. There were ancient ruins on the ocean floor — columns, arches, statues. I was exploring them like it was completely normal.",
        interpretation: {
          processing: "Underwater worlds appear in the mythologies of virtually every coastal and river civilization. From Atlantis in Greek tradition to the Aztec Tlalocan to the Celtic Otherworld accessed through sacred wells, cultures worldwide have imagined realms of wisdom and mystery beneath the water's surface. Your ability to breathe underwater is the most culturally significant detail: it suggests you've been granted access to a realm normally off-limits to the conscious mind. The ancient ruins represent accumulated wisdom — knowledge that existed before you and that you're now able to access. Your brain may be processing a deepening connection to knowledge, tradition, or understanding that feels timeless rather than new.",
          exploring: "In many traditions, descending into water is an initiation. Baptism, the mikveh, river purification rituals — water submersion cross-culturally represents transformation and rebirth. The fact that the ruins were ancient and architecturally sophisticated suggests that what you're discovering isn't primitive but refined — a deep civilization of knowledge within yourself. The dream may be inviting you to trust that you carry more wisdom than your conscious mind gives you credit for. What knowledge feels instinctive to you? What do you understand without being able to explain how? Those are your underwater ruins.",
          connecting: "Consider whether you've recently encountered ideas, practices, or communities that feel ancient and familiar — like coming home to something you didn't know you missed. The \"completely normal\" feeling of exploring underwater ruins suggests this isn't a foreign territory for you; it's a rediscovery. Across cultures, this dream pattern tends to emerge during periods of intellectual or spiritual deepening. You may be outgrowing surface-level understanding of something and ready to dive into its depths. The ruins suggest that the knowledge you're seeking isn't new — it's been waiting for someone with the capacity to breathe down there. That someone is you."
        }
      }
    ]
  }
}

// Helper function to get examples for a specific lens
export function getExamplesForLens(lens: LensType): DreamExample[] {
  return lensConfigs[lens]?.examples || []
}

// Helper function to get lens configuration
export function getLensConfig(lens: LensType): LensConfig | undefined {
  return lensConfigs[lens]
}

// Get combined examples for primary and secondary lenses
export function getCombinedExamples(primary: LensType, secondary: LensType): DreamExample[] {
  const primaryExamples = getExamplesForLens(primary).slice(0, 2) // 2 from primary
  const secondaryExamples = getExamplesForLens(secondary).slice(0, 1) // 1 from secondary
  return [...primaryExamples, ...secondaryExamples]
}
